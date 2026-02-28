"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Crown,
  Clock,
  Download,
  Music,
  ArrowRight,
  Loader2,
  LogOut,
  Trash2,
} from "lucide-react";
import { GENRES } from "@/lib/constants";

interface Profile {
  email: string;
  plan: string;
  credits_used_today: number;
  stripe_subscription_id: string | null;
  created_at: string;
}

interface Transformation {
  id: string;
  input_name: string;
  target_genre: string;
  status: string;
  output_url: string | null;
  has_watermark: boolean;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"profile" | "history">("profile");

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const [profileRes, transformRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("email, plan, credits_used_today, stripe_subscription_id, created_at")
          .eq("id", user.id)
          .single(),
        supabase
          .from("transformations")
          .select("id, input_name, target_genre, status, output_url, has_watermark, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (transformRes.data) setTransformations(transformRes.data);
      setLoading(false);
    };
    init();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Bist du sicher, dass du dein Konto unwiderruflich löschen möchtest? Alle Daten werden gelöscht."
      )
    )
      return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Delete profile (cascades to transformations)
    await supabase.from("profiles").delete().eq("id", user.id);
    await supabase.auth.signOut();
    router.push("/");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGenreInfo = (genreId: string) =>
    GENRES.find((g) => g.id === genreId);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-white">Mein Konto</h1>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-lg bg-white/5 p-1">
        <button
          onClick={() => setTab("profile")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
            tab === "profile"
              ? "bg-brand-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Profil & Abo
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
            tab === "history"
              ? "bg-brand-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Verlauf ({transformations.length})
        </button>
      </div>

      {/* Profile tab */}
      {tab === "profile" && profile && (
        <div className="mt-6 space-y-6">
          {/* Profile info */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20">
                <User className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <p className="font-medium text-white">{profile.email}</p>
                <p className="text-sm text-gray-500">
                  Mitglied seit {formatDate(profile.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Plan */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                  <Crown className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {profile.plan === "free"
                      ? "Free"
                      : profile.plan === "pro"
                      ? "Pro"
                      : "Creator"}{" "}
                    Plan
                  </p>
                  <p className="text-sm text-gray-500">
                    {profile.plan === "free"
                      ? `${3 - profile.credits_used_today}/3 Credits heute`
                      : profile.plan === "pro"
                      ? `${50 - profile.credits_used_today}/50 Credits`
                      : "Unbegrenzte Credits"}
                  </p>
                </div>
              </div>
              {profile.plan === "free" ? (
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition hover:from-brand-500 hover:to-pink-500"
                >
                  Upgrade
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <a
                  href={`https://billing.stripe.com/p/login/test_placeholder`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  Abo verwalten
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {transformations.length}
              </p>
              <p className="text-sm text-gray-500">Transformationen gesamt</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {transformations.filter((t) => t.status === "completed").length}
              </p>
              <p className="text-sm text-gray-500">Erfolgreich</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {new Set(transformations.map((t) => t.target_genre)).size}
              </p>
              <p className="text-sm text-gray-500">Genres genutzt</p>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="font-medium text-red-400">Gefahrenzone</h3>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                Abmelden
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
                Konto löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History tab */}
      {tab === "history" && (
        <div className="mt-6">
          {transformations.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
              <Music className="mx-auto h-10 w-10 text-gray-600" />
              <p className="mt-3 font-medium text-gray-400">
                Noch keine Transformationen
              </p>
              <Link
                href="/app"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
              >
                Erste Transformation starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {transformations.map((t) => {
                const genre = getGenreInfo(t.target_genre);
                return (
                  <div
                    key={t.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl">{genre?.emoji || "🎵"}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {t.input_name} → {genre?.name || t.target_genre}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Clock className="h-3 w-3 text-gray-600" />
                            <span className="text-xs text-gray-500">
                              {formatDate(t.created_at)}
                            </span>
                            {t.has_watermark && (
                              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">
                                Wasserzeichen
                              </span>
                            )}
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] ${
                                t.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : t.status === "failed"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {t.status === "completed"
                                ? "Fertig"
                                : t.status === "failed"
                                ? "Fehler"
                                : "Läuft"}
                            </span>
                          </div>
                        </div>
                      </div>
                      {t.output_url && (
                        <a
                          href={t.output_url}
                          download
                          className="shrink-0 flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </a>
                      )}
                    </div>
                    {t.output_url && (
                      <audio
                        controls
                        src={t.output_url}
                        className="mt-3 w-full h-8"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
