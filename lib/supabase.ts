import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY!;
  return createClient(supabaseUrl, serviceKey);
}
