import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB – GenreFlip",
};

export default function AGBPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">
        Allgemeine Geschäftsbedingungen (AGB)
      </h1>
      <p className="mt-2 text-sm text-gray-500">Stand: Februar 2026</p>

      <div className="mt-8 space-y-8 text-sm text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">§ 1 Geltungsbereich</h2>
          <p className="mt-2">
            Diese AGB gelten für die Nutzung der Plattform GenreFlip
            (&quot;Dienst&quot;), betrieben von [Dein Name / Firma],
            [Anschrift] (&quot;Anbieter&quot;). Mit der Registrierung
            akzeptierst du diese AGB.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 2 Leistungsbeschreibung</h2>
          <p className="mt-2">
            GenreFlip bietet eine AI-basierte Transformation von Musikstücken
            in verschiedene Genres. Der Dienst umfasst:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Zugang zu einer Bibliothek gemeinfreier Musikstücke</li>
            <li>Upload eigener Audiodateien (abhängig vom gewählten Plan)</li>
            <li>AI-gestützte Genre-Transformation</li>
            <li>Download der transformierten Audiodateien</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 3 Registrierung & Konto</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>Die Nutzung erfordert eine Registrierung mit gültiger E-Mail-Adresse.</li>
            <li>Du bist für die Sicherheit deiner Zugangsdaten verantwortlich.</li>
            <li>Jede Person darf nur ein Konto erstellen.</li>
            <li>Wir behalten uns vor, Konten bei Verstoß gegen diese AGB zu sperren.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 4 Pläne & Preise</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>
              <strong>Free:</strong> 3 Transformationen pro Tag, max. 30 Sekunden,
              Wasserzeichen, nur gemeinfreie Songs, nur für private Nutzung.
            </li>
            <li>
              <strong>Pro (14,99 €/Monat):</strong> 50 Transformationen pro Monat,
              volle Länge, kein Wasserzeichen, alle Genres, 320kbps MP3 + WAV.
            </li>
            <li>
              <strong>Creator (24,99 €/Monat):</strong> Unbegrenzte Transformationen,
              volle Länge, Lossless-Formate, kommerzielle Nutzung erlaubt.
            </li>
            <li>Preisänderungen werden 30 Tage im Voraus angekündigt.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 5 Zahlung & Kündigung</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>Die Zahlung erfolgt monatlich im Voraus über Stripe.</li>
            <li>Abonnements verlängern sich automatisch, sofern nicht gekündigt.</li>
            <li>
              Kündigung ist jederzeit möglich. Der Zugang bleibt bis zum Ende
              der bezahlten Periode bestehen.
            </li>
            <li>
              Nach Kündigung wird das Konto auf den Free-Plan herabgestuft.
            </li>
            <li>
              Ein Widerrufsrecht besteht gemäß § 356 Abs. 5 BGB nicht, wenn
              mit der Vertragserfüllung begonnen wurde und du dem ausdrücklich
              zugestimmt hast.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 6 Urheberrecht & Nutzungsrechte</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>
              Songs aus der gemeinfreien Bibliothek dürfen frei genutzt werden.
              Die AI-generierten Transformationen gehören dir.
            </li>
            <li>
              Bei eigenen Uploads bist du allein verantwortlich dafür, dass du
              die erforderlichen Rechte besitzt.
            </li>
            <li>
              Kommerzielle Nutzung der Transformationen ist nur mit dem
              Creator-Plan gestattet.
            </li>
            <li>
              Du stellst den Anbieter von allen Ansprüchen Dritter frei, die
              aus der Verletzung von Urheberrechten durch deine Uploads
              entstehen.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 7 Verbotene Nutzung</h2>
          <p className="mt-2">Es ist untersagt:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Urheberrechtlich geschütztes Material ohne Erlaubnis hochzuladen</li>
            <li>Den Dienst für illegale Zwecke zu nutzen</li>
            <li>Technische Schutzmaßnahmen zu umgehen</li>
            <li>Die API missbräuchlich zu nutzen oder zu überlasten</li>
            <li>Bots oder automatisierte Tools ohne Genehmigung einzusetzen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 8 Haftung</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>
              Der Dienst wird &quot;wie besehen&quot; bereitgestellt. Wir
              garantieren keine bestimmte Qualität der Transformationen.
            </li>
            <li>
              Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.
            </li>
            <li>
              Für mittelbare Schäden, entgangenen Gewinn oder Datenverlust
              haften wir nicht, soweit gesetzlich zulässig.
            </li>
            <li>Verfügbarkeitsgarantie: 99 % Uptime (monatlicher Durchschnitt).</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 9 Änderungen der AGB</h2>
          <p className="mt-2">
            Wir behalten uns vor, diese AGB zu ändern. Änderungen werden per
            E-Mail angekündigt. Widersprichst du nicht innerhalb von 30 Tagen,
            gelten die neuen AGB als akzeptiert.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">§ 10 Schlussbestimmungen</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>Es gilt deutsches Recht.</li>
            <li>
              Gerichtsstand ist [Dein Gerichtsstandort], soweit gesetzlich
              zulässig.
            </li>
            <li>
              Sollten einzelne Bestimmungen unwirksam sein, bleibt die
              Wirksamkeit der übrigen unberührt.
            </li>
          </ol>
        </section>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-300 text-xs">
            <strong>Hinweis:</strong> Ersetze alle Platzhalter [...] mit deinen
            Daten. Lass die AGB von einem Anwalt prüfen, bevor du live gehst.
          </p>
        </div>
      </div>
    </div>
  );
}
