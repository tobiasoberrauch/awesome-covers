import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenreFlip – Verwandle jeden Song in jedes Genre",
  description:
    "AI-powered Genre-Transformation: Mach aus Beethoven Hip-Hop, aus Pop Metal, aus Klassik EDM. In Sekunden. Kostenlos starten.",
  keywords: ["AI Musik", "Genre Transformation", "Song Remix", "KI Musik", "Genre Flip"],
  openGraph: {
    title: "GenreFlip – Verwandle jeden Song in jedes Genre",
    description: "AI-powered Genre-Transformation in Sekunden. Kostenlos starten.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
