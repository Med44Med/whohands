"use client";

import { useActionState, useEffect } from "react";
import { SignInAction } from "./SignInAction.ts";
import InputField from "../../../../components/InputField";
import Button from "@/components/Button";
import { Text } from "@/components/typography";
import Link from "next/link";

const SignInEmailForm = ({ redirectTo = "/" }: { redirectTo: string }) => {
  const [state, formAction, isPending] = useActionState(SignInAction);

  useEffect(() => {
    if (state?.success) {
      redirect(redirectTo);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="mt-3 bg-surface shadow rounded p-10 w-2/3 flex flex-col justify-center items-center gap-1"
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
      <Button
        title={isPending ? "loading" : "Log in"}
        type="submit"
        className="w-full py-3 mt-3"
      />

      {/* <button
        className="w-full bg-primary p-2 text-xl text-surface font-semibold rounded cursor-pointer hover:bg-primary-hover"
        type="submit"
      >
        {isPending ? "loading" : "Log in"}
      </button> */}

      {state?.error?.auth && (
        <Text size="normal" className="w-full !text-red-500">
          {state.error.auth}
        </Text>
      )}
      <Text size="normal" className="w-full py-1" muted>
        you don&#39;t have ann account 
        <Link href="/register" className="pl-1 !text-text font-bold duration-300 hover:!text-primary">
           Create an Account
        </Link>
      </Text>
    </form>
  );
};

export default SignInEmailForm;
