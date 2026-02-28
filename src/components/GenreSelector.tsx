"use client";

import { GENRES, GenreId } from "@/lib/constants";

interface GenreSelectorProps {
  selected: GenreId | null;
  onSelect: (genre: GenreId) => void;
}

export default function GenreSelector({ selected, onSelect }: GenreSelectorProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-white">
        2. Genre wählen
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all ${
              selected === genre.id
                ? "border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/20"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 transition-opacity ${
                selected === genre.id ? "opacity-10" : "group-hover:opacity-5"
              }`}
            />
            <div className="relative">
              <span className="text-2xl">{genre.emoji}</span>
              <p className="mt-1 text-sm font-medium text-white">
                {genre.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
