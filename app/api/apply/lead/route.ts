import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, country, age, role, motivation, experience, hours_per_week, portfolio_link } = body;

    if (!name || !email || !role || !motivation || !experience || !hours_per_week) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { error } = await supabase.from("leadership_applications").insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      country: country || null,
      age: age ? parseInt(age) : null,
      role,
      motivation: motivation.trim(),
      experience: experience.trim(),
      hours_per_week,
      portfolio_link: portfolio_link || null,
      status: "pending",
      submitted_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: "Failed to submit application. Try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit application. Try again." }, { status: 500 });
  }
}
