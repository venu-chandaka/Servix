import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Using fallback strings so the UI doesn't crash if your .env file is empty
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-project.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key";

  return createBrowserClient(supabaseUrl, supabaseKey);
}