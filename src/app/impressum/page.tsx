import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – GenreFlip",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Impressum</h1>
      <p className="mt-2 text-sm text-gray-500">
        Angaben gemäß § 5 TMG
      </p>

      <div className="mt-8 space-y-8 text-sm text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">Anbieter</h2>
          <p className="mt-2">
            [Dein vollständiger Name / Firmenname]<br />
            [Straße und Hausnummer]<br />
            [PLZ Ort]<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Kontakt</h2>
          <p className="mt-2">
            E-Mail: hello@genreflip.de<br />
            Telefon: [Deine Telefonnummer]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="mt-2">
            [Dein vollständiger Name]<br />
            [Anschrift wie oben]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Umsatzsteuer-ID</h2>
          <p className="mt-2">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
            [DE XXXXXXXXX] (falls vorhanden)
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            Streitbeilegung
          </h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="mt-2">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Haftungsausschluss</h2>
          <h3 className="mt-3 font-medium text-gray-200">Haftung für Inhalte</h3>
          <p className="mt-1">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir
            gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich.
          </p>
          <h3 className="mt-3 font-medium text-gray-200">Haftung für Links</h3>
          <p className="mt-1">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber
            verantwortlich.
          </p>
        </section>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-300 text-xs">
            <strong>Hinweis:</strong> Ersetze alle Platzhalter in eckigen
            Klammern [...] mit deinen echten Daten, bevor du die App live
            schaltest. Ein unvollständiges Impressum kann abgemahnt werden.
          </p>
        </div>
      </div>
    </div>
  );
}
