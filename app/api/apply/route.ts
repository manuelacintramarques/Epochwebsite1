import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, country, age, track, experience, motivation, hours_per_week, proof_of_work } = body;

    if (!name || !email || !track || !experience || !motivation || !hours_per_week) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { error } = await supabase.from("applications").insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      country: country || null,
      age: age ? parseInt(age) : null,
      track,
      experience: experience.trim(),
      motivation: motivation.trim(),
      hours_per_week,
      proof_of_work: proof_of_work || null,
      status: "pending",
    });

    if (error) {
      return NextResponse.json({ error: "Failed to submit application. Try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
