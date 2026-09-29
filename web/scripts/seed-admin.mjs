// Create (or reset) a Super Admin. Run after the initial schema migration:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' npm run seed:admin
import { createClient } from "@supabase/supabase-js";

const { NEXT_PUBLIC_SUPABASE_URL: url, SUPABASE_SECRET_KEY: key, ADMIN_EMAIL: email, ADMIN_PASSWORD: password } =
  process.env;

if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env");
if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD");
if (password.length < 8) throw new Error("ADMIN_PASSWORD must be at least 8 characters");

const supabase = createClient(url, key, { auth: { persistSession: false } });

let { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { first_name: "Admin", last_name: "" },
});

// Already exists → reset its password instead.
if (error?.code === "email_exists") {
  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (listError) throw listError;
  const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!existing) throw error;
  ({ data, error } = await supabase.auth.admin.updateUserById(existing.id, { password, email_confirm: true }));
}
if (error) throw error;

const { error: roleError } = await supabase
  .from("profiles")
  .update({ role: "Super Admin", is_active: true })
  .eq("id", data.user.id);
if (roleError) throw roleError;

console.log(`Super Admin ready: ${email}`);
