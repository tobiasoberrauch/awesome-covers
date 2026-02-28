"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Eintragen");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
        <CheckCircle className="h-5 w-5 text-green-400" />
        <p className="text-sm text-green-300">
          Du bist auf der Warteliste! Wir melden uns bald.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="deine@email.de"
        className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-5 py-2.5 text-sm font-medium text-white transition hover:from-brand-500 hover:to-pink-500 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Warteliste"}
        <ArrowRight className="h-4 w-4" />
      </button>
      {status === "error" && (
        <p className="absolute mt-12 text-xs text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
