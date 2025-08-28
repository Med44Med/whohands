"use client";
import React from "react";
import { useActionState, useEffect } from "react";
import InputField from "../../../../components/InputField";
import { SignUpAction } from "./SignUpAction.ts";
import Button from "@/components/Button";
import { redirect } from "next/navigation";
import { Text } from "@/components/typography";
import Link from "next/link";

const SignupEmailForm = ({ redirectTo = "/" }: { redirectTo: string }) => {
  const [state, formAction, isPending] = useActionState(SignUpAction);

  useEffect(() => {
    if (state?.success) {
      redirect(redirectTo);
    }
  }, [redirectTo, state]);

  return (
    <form
      action={formAction}
      className="mt-3 w-full flex flex-col justify-center items-center gap-1"
    >
      <InputField
        className="w-full mb-2"
        label="email"
        type="email"
        required
        error={state?.error?.email}
      />
      <InputField
        className="w-full mb-2"
        label="password"
        type="password"
        required
        error={state?.error?.password}
      />
      <InputField
        className="w-full mb-2"
        label="re enter your password"
        type="password"
        required
        error={state?.error?.password}
      />
      <div className="w-full flex justify-start items-center gap-1">
        <input type="checkbox" name="terms" value="yes" />
        <Text size="small">
          Accept <Link href="/terms">Terms</Link>
        </Text>
      </div>
      {state?.error?.checks && (
        <Text size="small" className="w-full !text-red-500">
          {state.error.checks}
        </Text>
      )}
      <Button
        title={isPending ? "loading..." : "Create an account"}
        type="submit"
        className="w-full py-3 mt-3 font-black"
      />
      {state?.error?.auth && (
        <Text size="small" className="w-full !text-red-500">
          {state.error.auth}
        </Text>
      )}
      <Text size="normal" className="w-full py-3" muted>
        Alerady have an Account?
        <Link
          href={
            redirectTo === "/" ? "/login" : `/login?redirectTo=${redirectTo}`
          }
          className="pl-1 !text-text font-bold duration-300 hover:!text-primary"
        >
          Login
        </Link>
      </Text>
    </form>
  );
};

export default SignupEmailForm;
