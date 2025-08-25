"use server";
import { z } from "zod";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

const SignUpSchema = z.object({
  email: z.email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export async function SignInAction(prevState, formData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const checkedData = SignUpSchema.safeParse(data);

  if (!checkedData.success) {
    return { error: checkedData.error.flatten().fieldErrors };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { error: { auth: error.message } };
  }
  revalidatePath("/", "layout");

  return { success: true };
}
