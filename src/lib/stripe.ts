import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null,
    credits: 3, // per day
    maxDuration: 30, // seconds
    features: [
      "3 Transformationen pro Tag",
      "Max. 30 Sekunden",
      "128kbps MP3",
      "Wasserzeichen",
      "Gemeinfreie Songs",
    ],
  },
  pro: {
    name: "Pro",
    price: 14.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    credits: 50, // per month
    maxDuration: 300,
    features: [
      "50 Transformationen/Monat",
      "Volle Songlänge",
      "320kbps MP3 + WAV",
      "Kein Wasserzeichen",
      "Alle Genres",
      "Priority-Queue",
    ],
  },
  creator: {
    name: "Creator",
    price: 24.99,
    priceId: process.env.STRIPE_CREATOR_PRICE_ID,
    credits: -1, // unlimited
    maxDuration: 600,
    features: [
      "Unbegrenzte Transformationen",
      "Volle Songlänge",
      "WAV + FLAC (Lossless)",
      "Kein Wasserzeichen",
      "Kommerzielle Nutzung",
      "Stem-Download",
      "Priority-Queue",
      "API-Zugang (Beta)",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
