"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password.");
    } else {
      router.push("/portal/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="bg-[#111] border border-[#222] rounded-[14px] p-8">
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-medium text-white mb-1">Epoch</h1>
            <p className="text-[13px] text-[#555]">Sign in to your member portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] text-[#888] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#7b61ff] transition-colors placeholder:text-[#333]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#7b61ff] transition-colors"
              />
            </div>

            {error && (
              <p className="text-[12px] text-[#e05555]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#7b61ff] text-white text-[14px] font-medium py-2.5 rounded-[10px] transition-opacity mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#1a1a1a] flex items-center justify-between">
            <Link
              href="/apply"
              className="text-[12px] text-[#555] hover:text-[#888] transition-colors"
            >
              Not a member yet?
            </Link>
            <button className="text-[12px] text-[#555] hover:text-[#888] transition-colors">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
