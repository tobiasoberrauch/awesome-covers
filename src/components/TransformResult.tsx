"use client";

import { Download, Share2, Loader2, RotateCcw } from "lucide-react";
import { GENRES, GenreId } from "@/lib/constants";
import { APP_NAME, APP_URL } from "@/lib/constants";

interface TransformResultProps {
  status: "idle" | "processing" | "completed" | "failed";
  outputUrl: string | null;
  inputName: string;
  targetGenre: GenreId | null;
  errorMessage: string | null;
  onRetry: () => void;
  hasWatermark: boolean;
}

export default function TransformResult({
  status,
  outputUrl,
  inputName,
  targetGenre,
  errorMessage,
  onRetry,
  hasWatermark,
}: TransformResultProps) {
  const genre = GENRES.find((g) => g.id === targetGenre);

  const handleShare = async () => {
    const text = `${inputName} als ${genre?.name} - erstellt mit ${APP_NAME}! 🎵`;
    if (navigator.share) {
      try {
        await navigator.share({ title: APP_NAME, text, url: APP_URL });
      } catch {
        // User cancelled
      }
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(APP_URL)}`;
      window.open(shareUrl, "_blank");
    }
  };

  if (status === "idle") return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      {status === "processing" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-brand-500/20" />
            <Loader2 className="absolute inset-0 h-16 w-16 animate-spin text-brand-500" />
          </div>
          <div className="text-center">
            <p className="font-medium text-white">Transformiere...</p>
            <p className="mt-1 text-sm text-gray-400">
              {inputName} → {genre?.emoji} {genre?.name}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Dauert ca. 10-30 Sekunden
            </p>
          </div>
        </div>
      )}

      {status === "completed" && outputUrl && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              {genre?.emoji} Fertig!
            </p>
            <p className="text-sm text-gray-400">
              {inputName} als {genre?.name}
            </p>
          </div>

          <audio controls src={outputUrl} className="w-full" />

          {hasWatermark && (
            <p className="text-center text-xs text-amber-400/80">
              Enthält Wasserzeichen – upgrade auf Pro für wasserzeichenfreie Downloads
            </p>
          )}

          <div className="flex gap-3">
            <a
              href={outputUrl}
              download={`${inputName}-${targetGenre}-genreflip.mp3`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-500"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
            <button
              onClick={handleShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
              Teilen
            </button>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="text-center">
            <p className="font-medium text-red-400">Transformation fehlgeschlagen</p>
            <p className="mt-1 text-sm text-gray-400">
              {errorMessage || "Ein unerwarteter Fehler ist aufgetreten."}
            </p>
          </div>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
            Erneut versuchen
          </button>
        </div>
      )}
    </div>
  );
}
