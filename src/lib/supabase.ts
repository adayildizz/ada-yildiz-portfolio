import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
