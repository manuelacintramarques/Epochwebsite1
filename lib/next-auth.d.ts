import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    track: string;
    cohort_number: number;
    current_week: number;
  }

  interface Session {
    user: User & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    track?: string;
    cohort_number?: number;
    current_week?: number;
  }
}
