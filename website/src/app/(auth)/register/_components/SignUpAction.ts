"use server";
import { z } from "zod";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

const SignUpSchema = z
  .object({
    email: z.email("This is not a valid email."),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This specifies where the error message should appear
  });

export async function SignUpAction(prevState, formData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("re enter your password") as string,
  };

  
  
  const checkedData = SignUpSchema.safeParse(data);
  if (!checkedData.success) {
    return { error: checkedData.error.flatten().fieldErrors };
  }
  
  const checks = formData.get("terms")
  if (checks !== 'yes') {
    return { error: { checks: 'please accept our terms' } };
  }
  
  
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return { error: { auth: error.message } };
  }
  revalidatePath("/", "layout");

  return { success: true };
}
