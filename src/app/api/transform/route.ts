import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
    }

    // Get user profile for plan/credits check
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, credits_used_today, credits_reset_at")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profil nicht gefunden" }, { status: 404 });
    }

    // Reset daily credits if needed
    const resetAt = new Date(profile.credits_reset_at);
    const now = new Date();
    if (now.toDateString() !== resetAt.toDateString()) {
      await supabase
        .from("profiles")
        .update({ credits_used_today: 0, credits_reset_at: now.toISOString() })
        .eq("id", user.id);
      profile.credits_used_today = 0;
    }

    // Check credits
    const maxCredits = profile.plan === "creator" ? Infinity : profile.plan === "pro" ? 50 : 3;
    if (profile.credits_used_today >= maxCredits) {
      return NextResponse.json(
        { error: "Tageslimit erreicht. Upgrade auf Pro für mehr Transformationen." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const genre = formData.get("genre") as string;
    const source = formData.get("source") as string;
    const name = formData.get("name") as string;
    const prompt = formData.get("prompt") as string;
    const audioFile = formData.get("audio") as File | null;

    if (!genre || !name || !prompt) {
      return NextResponse.json({ error: "Fehlende Parameter" }, { status: 400 });
    }

    // Determine max duration based on plan
    const maxDuration = profile.plan === "free" ? 30 : profile.plan === "pro" ? 300 : 600;

    let inputAudioUrl: string | undefined;

    if (source === "upload" && audioFile) {
      // Convert uploaded file to data URL for Replicate
      const bytes = await audioFile.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const mimeType = audioFile.type || "audio/mpeg";
      inputAudioUrl = `data:${mimeType};base64,${base64}`;
    } else if (source === "library") {
      // For library songs, we'd serve from our own storage
      // For now, use the prompt-only approach (no audio conditioning)
      inputAudioUrl = undefined;
    }

    // Build the full prompt
    const fullPrompt = `${name} reimagined as ${genre} style. ${prompt}. High quality, professional production.`;

    // Call Replicate for music generation
    // Using meta/musicgen which supports melody conditioning
    const input: Record<string, unknown> = {
      prompt: fullPrompt,
      duration: Math.min(maxDuration, 30), // Start conservative
      output_format: "mp3",
      normalization_strategy: "loudness",
    };

    // If we have an audio file, use it for melody conditioning
    if (inputAudioUrl) {
      input.input_audio = inputAudioUrl;
      input.model_version = "stereo-melody-large";
      input.continuation = false;
    } else {
      input.model_version = "stereo-large";
    }

    const output = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedbb" as `${string}/${string}`, {
      input,
    });

    // Replicate returns the audio URL
    const outputUrl = typeof output === "string" ? output : String(output);

    // Record the transformation
    await supabase.from("transformations").insert({
      user_id: user.id,
      input_source: source,
      input_name: name,
      target_genre: genre,
      status: "completed",
      output_url: outputUrl,
      has_watermark: profile.plan === "free",
    });

    // Increment credits used
    await supabase
      .from("profiles")
      .update({ credits_used_today: profile.credits_used_today + 1 })
      .eq("id", user.id);

    return NextResponse.json({ outputUrl });
  } catch (err) {
    console.error("Transform error:", err);
    const message = err instanceof Error ? err.message : "Transformation fehlgeschlagen";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
