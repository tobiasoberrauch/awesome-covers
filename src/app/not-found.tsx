import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-black text-white/10">404</p>
        <h1 className="mt-2 text-2xl font-bold text-white">
          Seite nicht gefunden
        </h1>
        <p className="mt-2 text-gray-400">
          Die Seite, die du suchst, existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
          >
            <Home className="h-4 w-4" />
            Startseite
          </Link>
          <Link
            href="/app"
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur App
          </Link>
        </div>
      </div>
    </div>
  );
}
