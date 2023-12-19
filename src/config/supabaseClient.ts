import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_ANNON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});
export default supabase;

export async function signUpNewUser(
  email: string,
  password: string,
  username: string
) {
  if (email.length <= 0 || password.length <= 0 || username.length <= 0)
    return "Enter required details";
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: username,
      },
    },
  });
  if (error?.message) return error.message;
  else null;
}

export async function signInWithPassword(email: string, password: string) {
  if (email.length <= 0 || password.length <= 0)
    return "Enter required details";
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error?.message) return error.message;
  else null;
}

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function fetchFavorites(email: string) {
  const { data } = await supabase
    .from("pets")
    .select("*,favorites!inner(*)")
    .eq("favorites.email", email);
  return data;
}

export const addToStore = async (id: number, email: string) => {
  try {
    await supabase.from("favorites").insert({ email: email, pet_id: id });
    console.log("added");
  } catch (error) {
    console.log("error adding");
  }
};

export const removeFromStore = async (id: number, email: string) => {
  try {
    await supabase
      .from("favorites")
      .delete()
      .match({ email: email, pet_id: id });
  } catch (error) {
    console.log("error deleting");
  }
};
