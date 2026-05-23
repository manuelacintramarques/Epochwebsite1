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
  "w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#7b61ff] transition-colors placeholder:text-[#333]";

const inputErrorClass =
  "w-full bg-[#0d0d0d] border border-[#e05555] rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#e05555] transition-colors placeholder:text-[#333]";

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    age: "",
    track: "" as "foundations" | "advanced" | "",
    proofOfWork: "",
    experience: "",
    motivation: "",
    hours: "" as "2-3" | "4-6" | "7+" | "",
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
    if (!form.track) errs.track = "Select a track";
    if (form.track === "advanced" && !form.proofOfWork.trim()) errs.proofOfWork = "Required for Advanced track";
    if (!form.experience.trim()) errs.experience = "Required";
    if (!form.motivation.trim()) errs.motivation = "Required";
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
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          country: form.country,
          age: parseInt(form.age),
          track: form.track,
          experience: form.experience,
          motivation: form.motivation,
          hours_per_week: form.hours,
          proof_of_work: form.proofOfWork || null,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrors({ submit: data.error || "Something went wrong. Try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#080808] min-h-screen">
        <Nav />
        <div className="max-w-[600px] mx-auto px-6 pt-40 pb-20">
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6" style={{ fontFamily: "var(--font-geist-mono)" }}>
            Application submitted
          </p>
          <h1 className="text-white text-[36px] font-medium leading-tight mb-4" style={{ letterSpacing: "-0.5px" }}>
            You&apos;re in the queue.
          </h1>
          <p className="text-[#888] text-[15px] leading-[1.7]">
            We&apos;ll review your application and get back to you within 5 days.
            Check your email at <span className="text-white">{form.email}</span>.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      <section className="pt-32 pb-12 max-w-[1200px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          Apply — Cohort 1
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-white font-medium leading-tight mb-4"
          style={{ fontSize: "clamp(36px, 5.5vw, 64px)", letterSpacing: "-1px" }}
        >
          Join Epoch.
          <br />
          It&apos;s free.
          <br />
          Always will be.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[#555] text-[15px]"
        >
          25 Foundations spots · 10 Advanced spots · Applications close June 30, 2025
        </motion.p>
      </section>

      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-[560px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Alex Smith"
                  className={errors.name ? inputErrorClass : inputClass}
                />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="alex@example.com"
                  className={errors.email ? inputErrorClass : inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Country" error={errors.country}>
                <select
                  value={form.country}
                  onChange={set("country")}
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
                  className={`${errors.age ? inputErrorClass : inputClass} appearance-none`}
                >
                  <option value="" disabled>Select age</option>
                  {["13", "14", "15", "16", "17", "18", "19+"].map((a) => (
                    <option key={a} value={a} className="bg-[#111]">{a}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Track selection */}
            <Field label="Track" error={errors.track}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {[
                  {
                    value: "foundations" as const,
                    title: "Foundations",
                    sub: "Open to everyone",
                    accent: "#7b61ff",
                  },
                  {
                    value: "advanced" as const,
                    title: "Advanced",
                    sub: "Requires proof of experience",
                    accent: "#e05555",
                  },
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, track: t.value }))}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      form.track === t.value
                        ? "border-[#7b61ff] bg-[#7b61ff0d]"
                        : "border-[#2a2a2a] bg-[#0d0d0d] hover:border-[#444]"
                    }`}
                  >
                    <p className="text-white text-[14px] font-medium">{t.title}</p>
                    <p className="text-[#555] text-[12px] mt-0.5">{t.sub}</p>
                  </button>
                ))}
              </div>
            </Field>

            {/* Proof of work — only if Advanced */}
            {form.track === "advanced" && (
              <Field label="Link to a project, GitHub repo, or work sample" error={errors.proofOfWork}>
                <input
                  type="url"
                  value={form.proofOfWork}
                  onChange={set("proofOfWork")}
                  placeholder="https://github.com/..."
                  className={errors.proofOfWork ? inputErrorClass : inputClass}
                />
              </Field>
            )}

            <Field label="What's your experience with Python or ML? — Be honest. Beginners are welcome." error={errors.experience}>
              <textarea
                value={form.experience}
                onChange={set("experience")}
                rows={4}
                placeholder="I've done a few tutorials..."
                className={`${errors.experience ? inputErrorClass : inputClass} resize-none`}
              />
            </Field>

            <Field label="Why do you want to join Epoch?" error={errors.motivation}>
              <textarea
                value={form.motivation}
                onChange={set("motivation")}
                rows={4}
                className={`${errors.motivation ? inputErrorClass : inputClass} resize-none`}
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
                  >
                    {h} hrs
                  </button>
                ))}
              </div>
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

          {/* What happens next */}
          <div className="space-y-6">
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444]">
              What happens next
            </p>
            <div className="space-y-6">
              {[
                "We review your application within 5 days.",
                "You get an email either way — acceptance or a note on what to build to qualify next time.",
                "If accepted, you get a Discord invite and portal login. Cohort starts July 7, 2025.",
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-[#333] font-mono text-[13px] shrink-0 pt-0.5" style={{ fontFamily: "var(--font-geist-mono)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#888] text-[14px] leading-[1.7]">{step}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1e1e1e] pt-6">
              <p className="text-[#888] text-[14px] leading-[1.7]">
                We reject very few people. If you&apos;re not ready for
                Advanced, we&apos;ll redirect you to Foundations with specific
                feedback. No one is turned away for lack of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
