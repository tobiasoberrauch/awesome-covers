import Link from "next/link";
import { ArrowRight, Zap, Clock, Share2, Shield, Sparkles } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import PricingCards from "@/components/PricingCards";
import { GENRES } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[128px]" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-pink-600/10 blur-[128px]" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            <Sparkles className="h-4 w-4" />
            AI-powered Genre-Transformation
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Verwandle jeden Song in{" "}
            <span className="bg-gradient-to-r from-brand-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              jedes Genre
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
            Beethoven als Hip-Hop. Mozart als EDM. Bach als Metal.
            Upload, Genre wählen, fertig – in Sekunden.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:from-brand-500 hover:to-pink-500 hover:shadow-brand-500/40"
            >
              Kostenlos starten
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
            >
              Preise ansehen
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            3 kostenlose Transformationen pro Tag. Keine Kreditkarte nötig.
          </p>
        </div>
      </section>

      {/* Genre showcase */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {GENRES.map((genre) => (
            <div
              key={genre.id}
              className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-white/20 hover:bg-white/10`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 transition-opacity group-hover:opacity-10`}
              />
              <span className="relative text-3xl">{genre.emoji}</span>
              <p className="relative mt-2 text-sm font-medium text-white">
                {genre.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            So einfach geht's
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-400">
            Drei Schritte zum Genre-Flip deines Lieblingssongs
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Music,
                title: "Song wählen",
                desc: "Wähle aus unserer gemeinfreien Bibliothek oder lade deinen eigenen Song hoch.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Genre wählen",
                desc: "Hip-Hop, EDM, Metal, Jazz, Reggae, Klassik, Lo-Fi oder Pop – du entscheidest.",
              },
              {
                step: "03",
                icon: Share2,
                title: "Teilen & genießen",
                desc: "Dein Genre-Flip ist in Sekunden fertig. Downloade oder teile direkt auf Social Media.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span className="text-5xl font-black text-white/5">
                  {item.step}
                </span>
                <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                  <item.icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Warum GenreFlip?
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Blitzschnell",
                desc: "AI-Transformation in unter 30 Sekunden. Keine Wartezeiten.",
              },
              {
                icon: Shield,
                title: "Rechtssicher",
                desc: "Kuratierte gemeinfreie Bibliothek. Keine Copyright-Sorgen.",
              },
              {
                icon: Share2,
                title: "Social-Ready",
                desc: "Ein-Klick-Sharing auf TikTok, Instagram und YouTube.",
              },
              {
                icon: Clock,
                title: "Kostenloser Start",
                desc: "3 Transformationen pro Tag gratis. Keine Kreditkarte nötig.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                  <feature.icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="mt-3 font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="relative border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Einfache Preise, keine Überraschungen
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-400">
            Starte kostenlos. Upgrade, wenn du mehr willst.
          </p>
          <div className="mt-12">
            <PricingCards />
          </div>
        </div>
      </section>

      {/* Waitlist / CTA */}
      <section className="relative border-t border-white/5">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-b from-brand-500/10 to-transparent p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Bereit für den Genre-Flip?
            </h2>
            <p className="mt-3 text-gray-400">
              Trag dich in die Warteliste ein oder starte direkt kostenlos.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-brand-500 hover:to-pink-500"
              >
                Jetzt kostenlos starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs text-gray-500">
                Oder trag dich in die Warteliste ein:
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
