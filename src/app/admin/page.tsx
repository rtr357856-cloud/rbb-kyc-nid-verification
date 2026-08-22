import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  throw new Error("Server error, not found");

  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  redirect("/admin/login");
}