import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createServiceClient } from "./supabase";

interface EpochUser extends User {
  track: string;
  cohort_number: number;
  current_week: number;
}

interface EpochJWT extends JWT {
  track?: string;
  cohort_number?: number;
  current_week?: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = createServiceClient();
        const { data: member } = await supabase
          .from("members")
          .select("*")
          .eq("email", credentials.email.toLowerCase())
          .single();

        if (!member) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          member.password_hash
        );
        if (!valid) return null;

        return {
          id: member.id,
          email: member.email,
          name: member.name,
          track: member.track,
          cohort_number: member.cohort_number,
          current_week: member.current_week,
        } as EpochUser;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as EpochUser;
        const t = token as EpochJWT;
        t.track = u.track;
        t.cohort_number = u.cohort_number;
        t.current_week = u.current_week;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const t = token as EpochJWT;
        const u = session.user as EpochUser;
        u.id = t.sub ?? "";
        u.track = t.track ?? "foundations";
        u.cohort_number = t.cohort_number ?? 1;
        u.current_week = t.current_week ?? 1;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
