"use client";
import React from "react";
import { Title, Text } from "@/components/typography";
import InputField from "../../../../components/InputField";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import Button from "@/components/Button";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [errorCall, setErrorCall] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    if (password.length === 0) {
      setErrorCall("please enter your password");
      setLoading(false);
      return;
    }
    if (password !== re_password) {
      setErrorCall("please reenter your password correcetlly");
      setLoading(false);
      return;
    }
    const supabase = createClient();

    const data = await supabase.auth.updateUser({ password });
    console.log(data);

    if (data.error) {
      setErrorCall(data.error.message);
    }
    setPassword("");
    setRe_password("");
    setLoading(false);
  };

  return (
    <div className="bg-surface w-full rounded-xl p-5 pb-10 flex flex-col justify-start items-center gap-3">
      <Title size="big" className="w-full">
        Password
      </Title>
      <div className="w-4/5 mt-5 flex flex-col justify-center items-center gap-5">
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          error=""
        />
        <InputField
          label="re enter your Password"
          type="password"
          value={re_password}
          onChange={(e) => setRe_password(e.target.value)}
          className="w-full"
          error=""
        />
        {errorCall && <Text className="w-full !text-red-400">{errorCall}</Text>}
        <Button
          title={loading ? "loading..." : "update"}
          className="!w-1/2"
          onClick={handleResetPassword}
        />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
