"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu, X, Zap } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-pink-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-brand-400 to-pink-400 bg-clip-text text-transparent">
            GenreFlip
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/pricing"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Preise
          </Link>
          {user ? (
            <>
              <Link
                href="/app"
                className="rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition hover:from-brand-500 hover:to-pink-500"
              >
                App starten
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Abmelden
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Anmelden
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition hover:from-brand-500 hover:to-pink-500"
              >
                Kostenlos starten
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-gray-950/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              className="text-sm text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Preise
            </Link>
            {user ? (
              <>
                <Link
                  href="/app"
                  className="rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-4 py-2 text-center text-sm font-medium text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  App starten
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-400 text-left"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Anmelden
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 px-4 py-2 text-center text-sm font-medium text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Kostenlos starten
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
