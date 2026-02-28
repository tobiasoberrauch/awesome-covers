import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – GenreFlip",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Datenschutzerklärung</h1>
      <p className="mt-2 text-sm text-gray-500">Stand: Februar 2026</p>

      <div className="mt-8 space-y-8 text-sm text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">
            1. Verantwortlicher
          </h2>
          <p className="mt-2">
            [Dein Name / Firmenname]<br />
            [Anschrift]<br />
            E-Mail: hello@genreflip.de
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            2. Erhobene Daten
          </h2>
          <p className="mt-2">Wir erheben und verarbeiten folgende Daten:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <strong>Kontodaten:</strong> E-Mail-Adresse, verschlüsseltes
              Passwort bei der Registrierung
            </li>
            <li>
              <strong>Zahlungsdaten:</strong> Werden direkt von Stripe
              (stripe.com) verarbeitet. Wir speichern nur die Stripe-Kunden-ID,
              keine Kreditkartendaten.
            </li>
            <li>
              <strong>Nutzungsdaten:</strong> Hochgeladene Audiodateien
              (temporär), gewählte Genres, Transformations-History
            </li>
            <li>
              <strong>Technische Daten:</strong> IP-Adresse, Browser-Typ,
              Zugriffszeiten (Server-Logs)
            </li>
            <li>
              <strong>Warteliste:</strong> E-Mail-Adresse bei freiwilliger
              Eintragung
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            3. Rechtsgrundlagen
          </h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong>{" "}
              Kontodaten, Nutzungsdaten, Zahlungsabwicklung
            </li>
            <li>
              <strong>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong>{" "}
              Technische Daten für Sicherheit und Betrieb
            </li>
            <li>
              <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong>{" "}
              Wartelisten-Eintragung, Marketing-Kommunikation
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            4. Drittanbieter & Auftragsverarbeiter
          </h2>
          <div className="mt-2 space-y-3">
            <div>
              <p className="font-medium text-gray-200">Supabase (Auth & Datenbank)</p>
              <p>Supabase Inc., San Francisco, USA. Datenspeicherung in der EU (Frankfurt). AV-Vertrag vorhanden.</p>
            </div>
            <div>
              <p className="font-medium text-gray-200">Stripe (Zahlungsabwicklung)</p>
              <p>Stripe Inc., San Francisco, USA. Zertifiziert nach PCI DSS Level 1. EU-Standardvertragsklauseln.</p>
            </div>
            <div>
              <p className="font-medium text-gray-200">Replicate (AI-Verarbeitung)</p>
              <p>Replicate Inc., San Francisco, USA. Audiodateien werden temporär zur Verarbeitung übermittelt und nach Abschluss gelöscht.</p>
            </div>
            <div>
              <p className="font-medium text-gray-200">Vercel (Hosting)</p>
              <p>Vercel Inc., San Francisco, USA. Edge-Netzwerk mit Standorten in der EU.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            5. Cookies
          </h2>
          <p className="mt-2">
            Wir verwenden ausschließlich technisch notwendige Cookies für die
            Authentifizierung (Session-Cookies). Diese Cookies sind für den
            Betrieb der App erforderlich und werden beim Schließen des Browsers
            gelöscht. Es werden keine Tracking- oder Marketing-Cookies
            eingesetzt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            6. Deine Rechte
          </h2>
          <p className="mt-2">Du hast folgende Rechte nach DSGVO:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong>Auskunft</strong> (Art. 15) – Welche Daten speichern wir über dich?</li>
            <li><strong>Berichtigung</strong> (Art. 16) – Falsche Daten korrigieren</li>
            <li><strong>Löschung</strong> (Art. 17) – Daten löschen lassen</li>
            <li><strong>Einschränkung</strong> (Art. 18) – Verarbeitung einschränken</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20) – Daten in maschinenlesbarem Format erhalten</li>
            <li><strong>Widerspruch</strong> (Art. 21) – Verarbeitung widersprechen</li>
          </ul>
          <p className="mt-2">
            Kontakt: hello@genreflip.de. Du hast außerdem das Recht, dich bei
            einer Aufsichtsbehörde zu beschweren.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            7. Speicherdauer
          </h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Kontodaten: Bis zur Löschung des Kontos</li>
            <li>Transformationen: 90 Tage nach Erstellung (Audio-Dateien), Metadaten bis Kontolöschung</li>
            <li>Zahlungsdaten: 10 Jahre (gesetzliche Aufbewahrungspflicht)</li>
            <li>Warteliste: Bis zum Widerruf oder 12 Monate nach Eintragung</li>
            <li>Server-Logs: 30 Tage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            8. Datensicherheit
          </h2>
          <p className="mt-2">
            Wir verwenden SSL/TLS-Verschlüsselung für alle
            Datenübertragungen. Passwörter werden gehashed gespeichert
            (bcrypt). Audiodateien werden verschlüsselt übertragen und nach
            der Verarbeitung temporäre Kopien gelöscht.
          </p>
        </section>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-300 text-xs">
            <strong>Hinweis:</strong> Ersetze alle Platzhalter in eckigen
            Klammern [...] mit deinen echten Daten. Lass die
            Datenschutzerklärung von einem Anwalt prüfen, bevor du live gehst.
          </p>
        </div>
      </div>
    </div>
  );
}
