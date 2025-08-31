"use client";
import React from "react";
import Button from "@/components/Button";
import { Title } from "@/components/typography";
import { useState } from "react";

const EraseAccount = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteClient = async () => {
    setLoading(true);
    const data = await fetch("api/deleteuser", { method: "POST" });
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="bg-surface w-full rounded-xl p-5 pb-10 flex flex-col justify-start items-center gap-3">
      <Title size="big" className="w-full">
        Delete Account
      </Title>
      <Button
        title={loading ? "loading..." : "Delete"}
        className="!w-4/5"
        onClick={handleDeleteClient}
      />
    </div>
  );
};

export default EraseAccount;
