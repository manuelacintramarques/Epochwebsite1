"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bangladesh", "Belarus", "Belgium", "Bolivia",
  "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Cameroon",
  "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba",
  "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Finland", "France", "Georgia",
  "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hungary", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Latvia", "Lebanon", "Lithuania",
  "Malaysia", "Mexico", "Morocco", "Myanmar", "Nepal", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia",
  "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
  "Taiwan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Venezuela", "Vietnam", "Zimbabwe",
];

const ROLES = [
  {
    value: "curriculum_director",
    title: "Curriculum Director",
    desc: "Design and maintain the Foundations curriculum. Own the Notion workspace.",
  },
  {
    value: "community_manager",
    title: "Community Manager",
    desc: "Own the Discord. Keep members engaged, run check-ins, manage show-your-work.",
  },
  {
    value: "competitions_lead",
    title: "Competitions Lead",
    desc: "Source hackathons, track deadlines, help members find the right competitions.",
  },
  {
    value: "growth_socials",
    title: "Growth & Socials",
    desc: "Run Epoch's public presence across Instagram, Twitter, and LinkedIn.",
  },
];

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] text-[#888] mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[12px] text-[#e05555] mt-1">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#7b61ff] transition-colors placeholder:text-[#333]";

const inputStyle = {
  background: "linear-gradient(135deg, rgba(123,97,255,0.04) 0%, rgba(10,10,10,1) 60%)",
};

const inputErrorClass =
  "w-full border border-[#e05555] rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#e05555] transition-colors placeholder:text-[#333]";

export default function ApplyLeadPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    age: "",
    role: "",
    motivation: "",
    experience: "",
    hours: "" as "2-3" | "4-6" | "7+" | "",
    portfolio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.country) errs.country = "Required";
    if (!form.age) errs.age = "Required";
    if (!form.role) errs.role = "Select a role";
    if (!form.motivation.trim()) errs.motivation = "Required";
    if (!form.experience.trim()) errs.experience = "Required";
    if (!form.hours) errs.hours = "Required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/apply/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          country: form.country,
          age: parseInt(form.age),
          role: form.role,
          motivation: form.motivation,
          experience: form.experience,
          hours_per_week: form.hours,
          portfolio_link: form.portfolio || null,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrors({ submit: data.error || "Failed to submit application. Try again." });
      }
    } catch {
      setErrors({ submit: "Failed to submit application. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#080808] min-h-screen">
        <Nav />
        <div className="max-w-[600px] mx-auto px-6 pt-40 pb-20">
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6" style={{ fontFamily: "var(--font-label)" }}>
            Application submitted
          </p>
          <h1 className="text-white text-[36px] font-medium leading-tight mb-4" style={{ letterSpacing: "-0.5px", fontFamily: "var(--font-hero)" }}>
            Application received.
          </h1>
          <p className="text-[#888] text-[15px] leading-[1.7]">
            We review every leadership application carefully and reply within 7 days.
            Check your inbox at <span className="text-white">{form.email}</span>.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      <section className="relative pt-32 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(123,97,255,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6"
            style={{ fontFamily: "var(--font-label)" }}
          >
            Apply — Leadership
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white font-medium leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5.5vw, 64px)", letterSpacing: "-1px", fontFamily: "var(--font-hero)" }}
          >
            Help build Epoch.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#555] text-[15px] max-w-[480px]"
          >
            Real roles, real responsibility. You get a formal title, work that goes on your university application, and the chance to shape what Epoch becomes.
          </motion.p>
        </div>
      </section>

      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[760px] mx-auto px-6 py-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Alex Smith"
                  style={inputStyle}
                  className={errors.name ? inputErrorClass : inputClass}
                />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="alex@example.com"
                  style={inputStyle}
                  className={errors.email ? inputErrorClass : inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Country" error={errors.country}>
                <select
                  value={form.country}
                  onChange={set("country")}
                  style={inputStyle}
                  className={`${errors.country ? inputErrorClass : inputClass} appearance-none`}
                >
                  <option value="" disabled>Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-[#111]">{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Age" error={errors.age}>
                <select
                  value={form.age}
                  onChange={set("age")}
                  style={inputStyle}
                  className={`${errors.age ? inputErrorClass : inputClass} appearance-none`}
                >
                  <option value="" disabled>Select age</option>
                  {["14", "15", "16", "17", "18"].map((a) => (
                    <option key={a} value={a} className="bg-[#111]">{a}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Role selection */}
            <Field label="Which role are you applying for?" error={errors.role}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: r.value }))}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      form.role === r.value
                        ? "border-[#7b61ff] bg-[#7b61ff0d]"
                        : "border-[#2a2a2a] hover:border-[#444]"
                    }`}
                    style={form.role !== r.value ? inputStyle : undefined}
                  >
                    <p className="text-white text-[14px] font-medium">{r.title}</p>
                    <p className="text-[#555] text-[12px] mt-0.5 leading-[1.5]">{r.desc}</p>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Why do you want this role? What makes you the right person?" error={errors.motivation}>
              <textarea
                value={form.motivation}
                onChange={set("motivation")}
                rows={5}
                style={inputStyle}
                className={`${errors.motivation ? inputErrorClass : inputClass} resize-none`}
              />
            </Field>

            <Field label="What's your background with AI, coding, or the area this role covers?" error={errors.experience}>
              <textarea
                value={form.experience}
                onChange={set("experience")}
                rows={4}
                style={inputStyle}
                className={`${errors.experience ? inputErrorClass : inputClass} resize-none`}
              />
            </Field>

            {/* Hours per week */}
            <Field label="How many hours per week can you commit?" error={errors.hours}>
              <div className="flex gap-3 mt-1">
                {(["2-3", "4-6", "7+"] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, hours: h }))}
                    className={`px-5 py-2 rounded text-[13px] font-medium border transition-all ${
                      form.hours === h
                        ? "border-[#7b61ff] bg-[#7b61ff0d] text-white"
                        : "border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
                    }`}
                    style={form.hours !== h ? inputStyle : undefined}
                  >
                    {h} hrs
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Portfolio, GitHub, or any relevant link (optional)">
              <input
                type="url"
                value={form.portfolio}
                onChange={set("portfolio")}
                placeholder="https://"
                style={inputStyle}
                className={inputClass}
              />
            </Field>

            {errors.submit && (
              <p className="text-[13px] text-[#e05555]">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#7b61ff] text-white text-[14px] font-medium py-3 rounded-lg transition-opacity ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
