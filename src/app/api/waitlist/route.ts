import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabase();

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      if (error.code === "23505") {
        // unique_violation — already on waitlist
        return NextResponse.json({ message: "Bereits eingetragen" });
      }
      throw error;
    }

    return NextResponse.json({ message: "Erfolgreich eingetragen" });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Fehler beim Eintragen" },
      { status: 500 }
    );
  }
}
