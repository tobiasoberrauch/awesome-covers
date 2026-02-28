import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-white">GenreFlip</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              AI-powered Genre-Transformation. Verwandle jeden Song in jedes
              Genre – in Sekunden.
            </p>
          </div>

          {/* Produkt */}
          <div>
            <h4 className="text-sm font-semibold text-white">Produkt</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/app" className="text-sm text-gray-500 hover:text-gray-300">
                  App starten
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-300">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-gray-500 hover:text-gray-300">
                  Mein Konto
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-sm font-semibold text-white">Rechtliches</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/impressum" className="text-sm text-gray-500 hover:text-gray-300">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-gray-500 hover:text-gray-300">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-sm text-gray-500 hover:text-gray-300">
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold text-white">Kontakt</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="mailto:hello@genreflip.de"
                  className="text-sm text-gray-500 hover:text-gray-300"
                >
                  hello@genreflip.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} GenreFlip. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link href="/impressum" className="hover:text-gray-400">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-400">Datenschutz</Link>
            <Link href="/agb" className="hover:text-gray-400">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
