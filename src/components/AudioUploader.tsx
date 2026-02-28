"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Music, X } from "lucide-react";
import { PUBLIC_DOMAIN_SONGS, PublicDomainSong } from "@/lib/public-domain-songs";

interface AudioUploaderProps {
  onFileSelect: (file: File | null, source: "upload" | "library", name: string) => void;
  selectedSong: { file: File | null; source: "upload" | "library"; name: string } | null;
  plan: string;
}

export default function AudioUploader({ onFileSelect, selectedSong, plan }: AudioUploaderProps) {
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("audio/")) {
        onFileSelect(file, "upload", file.name);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file, "upload", file.name);
  };

  const selectLibrarySong = async (song: PublicDomainSong) => {
    onFileSelect(null, "library", song.title);
  };

  const clearSelection = () => {
    onFileSelect(null, "library", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-white">
        1. Song wählen
      </h3>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-white/5 p-1">
        <button
          onClick={() => setTab("library")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
            tab === "library"
              ? "bg-brand-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Bibliothek (gemeinfrei)
        </button>
        <button
          onClick={() => setTab("upload")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
            tab === "upload"
              ? "bg-brand-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Eigener Upload
        </button>
      </div>

      {/* Selected indicator */}
      {selectedSong && selectedSong.name && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-2">
          <Music className="h-4 w-4 text-brand-400" />
          <span className="flex-1 text-sm text-brand-200 truncate">
            {selectedSong.name}
          </span>
          <button onClick={clearSelection} className="text-brand-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Library tab */}
      {tab === "library" && (
        <div className="grid gap-2 max-h-64 overflow-y-auto pr-1">
          {PUBLIC_DOMAIN_SONGS.map((song) => (
            <button
              key={song.id}
              onClick={() => selectLibrarySong(song)}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                selectedSong?.name === song.title
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Music className="h-5 w-5 text-brand-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {song.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {song.composer} ({song.year})
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Upload tab */}
      {tab === "upload" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
            dragOver
              ? "border-brand-500 bg-brand-500/10"
              : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
          }`}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-300">
            Audiodatei hierher ziehen oder klicken
          </p>
          <p className="mt-1 text-xs text-gray-500">
            MP3, WAV, FLAC, OGG (max. 20 MB)
          </p>
          {plan === "free" && (
            <p className="mt-2 text-xs text-amber-400/80">
              Free-Plan: Nur gemeinfreie Songs erlaubt
            </p>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
