"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AudioUploader from "@/components/AudioUploader";
import GenreSelector from "@/components/GenreSelector";
import TransformResult from "@/components/TransformResult";
import { GenreId, GENRES } from "@/lib/constants";
import { Zap, Crown } from "lucide-react";
import Link from "next/link";

interface Profile {
  plan: string;
  credits_used_today: number;
  credits_reset_at: string;
}

export default function AppPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<{
    file: File | null;
    source: "upload" | "library";
    name: string;
  } | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<GenreId | null>(null);
  const [transformStatus, setTransformStatus] = useState<
    "idle" | "processing" | "completed" | "failed"
  >("idle");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("plan, credits_used_today, credits_reset_at")
        .eq("id", user.id)
        .single();

      if (data) {
        // Reset daily credits if needed
        const resetAt = new Date(data.credits_reset_at);
        const now = new Date();
        if (now.toDateString() !== resetAt.toDateString()) {
          await supabase
            .from("profiles")
            .update({ credits_used_today: 0, credits_reset_at: now.toISOString() })
            .eq("id", user.id);
          data.credits_used_today = 0;
        }
        setProfile(data);
      }
      setLoading(false);
    };
    init();
  }, []);

  const getCreditsRemaining = () => {
    if (!profile) return 0;
    if (profile.plan === "creator") return Infinity;
    if (profile.plan === "pro") return 50 - profile.credits_used_today;
    return 3 - profile.credits_used_today;
  };

  const getCreditsLabel = () => {
    const remaining = getCreditsRemaining();
    if (remaining === Infinity) return "Unbegrenzt";
    if (profile?.plan === "pro") return `${remaining}/50 heute`;
    return `${remaining}/3 heute`;
  };

  const canTransform = () => {
    return (
      selectedSong?.name &&
      selectedGenre &&
      getCreditsRemaining() > 0 &&
      transformStatus !== "processing"
    );
  };

  const handleTransform = async () => {
    if (!canTransform() || !selectedGenre || !selectedSong) return;

    setTransformStatus("processing");
    setOutputUrl(null);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("genre", selectedGenre);
      formData.append("source", selectedSong.source);
      formData.append("name", selectedSong.name);

      if (selectedSong.file) {
        formData.append("audio", selectedSong.file);
      }

      const genre = GENRES.find((g) => g.id === selectedGenre);
      formData.append("prompt", genre?.prompt || "");

      const res = await fetch("/api/transform", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Transformation fehlgeschlagen");
      }

      const data = await res.json();
      setOutputUrl(data.outputUrl);
      setTransformStatus("completed");

      // Update local credits count
      if (profile) {
        setProfile({
          ...profile,
          credits_used_today: profile.credits_used_today + 1,
        });
      }
    } catch (err) {
      setTransformStatus("failed");
      setErrorMessage(
        err instanceof Error ? err.message : "Unbekannter Fehler"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Credits bar */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20">
            <Zap className="h-4 w-4 text-brand-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              Credits: {getCreditsLabel()}
            </p>
            <p className="text-xs text-gray-500">
              Plan: {profile?.plan === "free" ? "Free" : profile?.plan === "pro" ? "Pro" : "Creator"}
            </p>
          </div>
        </div>
        {profile?.plan === "free" && (
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-3 py-1.5 text-xs font-medium text-white transition hover:from-brand-500 hover:to-pink-500"
          >
            <Crown className="h-3.5 w-3.5" />
            Upgrade
          </Link>
        )}
      </div>

      <div className="space-y-8">
        {/* Step 1: Song selection */}
        <AudioUploader
          onFileSelect={(file, source, name) =>
            setSelectedSong({ file, source, name })
          }
          selectedSong={selectedSong}
          plan={profile?.plan || "free"}
        />

        {/* Step 2: Genre selection */}
        <GenreSelector
          selected={selectedGenre}
          onSelect={setSelectedGenre}
        />

        {/* Transform button */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">
            3. Transformieren
          </h3>
          <button
            onClick={handleTransform}
            disabled={!canTransform()}
            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-pink-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-brand-500/25 transition hover:from-brand-500 hover:to-pink-500 hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {transformStatus === "processing" ? (
              "Transformiere..."
            ) : getCreditsRemaining() <= 0 ? (
              "Keine Credits mehr – Upgrade auf Pro"
            ) : !selectedSong?.name ? (
              "Wähle zuerst einen Song"
            ) : !selectedGenre ? (
              "Wähle ein Genre"
            ) : (
              <>
                Genre-Flip starten{" "}
                <Zap className="ml-1 inline h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Result */}
        <TransformResult
          status={transformStatus}
          outputUrl={outputUrl}
          inputName={selectedSong?.name || ""}
          targetGenre={selectedGenre}
          errorMessage={errorMessage}
          onRetry={handleTransform}
          hasWatermark={profile?.plan === "free"}
        />
      </div>
    </div>
  );
}
