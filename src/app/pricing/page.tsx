"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import PricingCards from "@/components/PricingCards";
import { PlanKey } from "@/lib/stripe";
import { Loader2 } from "lucide-react";

export default function PricingPage() {
  const supabase = createClient();
  const [currentPlan, setCurrentPlan] = useState<PlanKey>("free");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", user.id)
          .single();
        if (data) setCurrentPlan(data.plan as PlanKey);
      }
    };
    init();
  }, []);

  const handleSelectPlan = async (plan: PlanKey) => {
    if (plan === "free") return;

    if (!userId) {
      window.location.href = "/auth/signup";
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Checkout fehlgeschlagen");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Fehler beim Checkout");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Wähle deinen Plan
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-gray-400">
          Starte kostenlos mit 3 Transformationen pro Tag. Upgrade jederzeit
          für mehr Power.
        </p>
      </div>

      <div className="mt-12 relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gray-950/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Weiterleitung zu Stripe...</span>
            </div>
          </div>
        )}
        <PricingCards
          currentPlan={currentPlan}
          onSelectPlan={handleSelectPlan}
          loading={loading}
        />
      </div>

      <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Häufige Fragen</h3>
        <dl className="mt-4 space-y-4">
          {[
            {
              q: "Kann ich jederzeit kündigen?",
              a: "Ja, du kannst dein Abo jederzeit kündigen. Du behältst den Zugang bis zum Ende der aktuellen Abrechnungsperiode.",
            },
            {
              q: "Was passiert mit meinen Transformationen nach der Kündigung?",
              a: "Deine bisherigen Transformationen bleiben verfügbar. Du kannst sie weiterhin herunterladen.",
            },
            {
              q: "Welche Zahlungsmethoden werden akzeptiert?",
              a: "Wir akzeptieren alle gängigen Kreditkarten, SEPA-Lastschrift und weitere Methoden über Stripe.",
            },
            {
              q: "Sind die transformierten Songs urheberrechtlich geschützt?",
              a: "Songs aus unserer gemeinfreien Bibliothek können frei verwendet werden. Bei eigenen Uploads bist du für die Rechte verantwortlich.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <dt className="text-sm font-medium text-gray-300">{q}</dt>
              <dd className="mt-1 text-sm text-gray-500">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
