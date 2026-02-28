"use client";

import { Check } from "lucide-react";
import { PLANS, PlanKey } from "@/lib/stripe";

interface PricingCardsProps {
  currentPlan?: PlanKey;
  onSelectPlan?: (plan: PlanKey) => void;
  loading?: boolean;
}

export default function PricingCards({
  currentPlan = "free",
  onSelectPlan,
  loading,
}: PricingCardsProps) {
  const plans: { key: PlanKey; highlighted: boolean }[] = [
    { key: "free", highlighted: false },
    { key: "pro", highlighted: true },
    { key: "creator", highlighted: false },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map(({ key, highlighted }) => {
        const plan = PLANS[key];
        const isCurrent = currentPlan === key;

        return (
          <div
            key={key}
            className={`relative rounded-2xl border p-6 transition ${
              highlighted
                ? "border-brand-500 bg-brand-500/5 shadow-xl shadow-brand-500/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            {highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-pink-500 px-3 py-1 text-xs font-bold text-white">
                BELIEBT
              </div>
            )}

            <h3 className="text-lg font-bold text-white">{plan.name}</h3>

            <div className="mt-4">
              {plan.price === 0 ? (
                <span className="text-3xl font-bold text-white">Kostenlos</span>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {plan.price.toFixed(2).replace(".", ",")}€
                  </span>
                  <span className="text-sm text-gray-400">/Monat</span>
                </div>
              )}
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelectPlan?.(key)}
              disabled={isCurrent || loading}
              className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isCurrent
                  ? "border border-white/20 bg-white/5 text-gray-400 cursor-default"
                  : highlighted
                  ? "bg-gradient-to-r from-brand-600 to-pink-600 text-white hover:from-brand-500 hover:to-pink-500"
                  : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
              } disabled:opacity-50`}
            >
              {isCurrent
                ? "Aktueller Plan"
                : key === "free"
                ? "Kostenlos starten"
                : `${plan.name} wählen`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
