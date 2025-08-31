"use client";
import React from "react";
import { useState } from "react";
import InputField from "../../../../components/InputField";
import { Title } from "@/components/typography";
import Button from "@/components/Button";
import { createClient } from "@/supabase/client";

const CredentialsForm = ({ data }) => {
  const [credentials, setCredentials] = useState(data);
  const [loading, setLoading] = useState(false);
  console.log(credentials);

  const updateProfile = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ 
        username: credentials.username,
        wilaya: credentials.wilaya,
        commun: credentials.commun,
       })
      .eq("id", data.id);
    if (error) {
      alert(error.message);
    } else {
      alert("updated successfully");
    }
    setLoading(false);
  };
  return (
    <div className="bg-surface w-full rounded-xl p-5 pb-10 flex flex-col justify-start items-center gap-3">
      <Title size="big" className="w-full">
        Credentials
      </Title>
      <div className="w-4/5 mt-5 flex flex-col justify-center items-center gap-5">
        <InputField
          label="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials((perv) => ({ ...perv, ["email"]: e.target.value }))
          }
          className="w-full"
          error=""
        />
        <InputField
          label="username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials((perv) => ({
              ...perv,
              ["username"]: e.target.value,
            }))
          }
          className="w-full"
        />
        <select
          className="w-full outline-0 rounded border px-1 py-5 text-xs"
          value={credentials.wilaya}
          onChange={(e) =>
            setCredentials((perv) => ({
              ...perv,
              ["wilaya"]: e.target.value,
            }))
          }
        >
          <option value={null}>Please choose a wilaya</option>
          <option value="Ain-Defla">Ain Defla</option>
          <option value="Alger">Alger</option>
        </select>
        <select
          className="w-full outline-0 rounded border px-1 py-5 text-xs"
          disabled={credentials.wilaya === null}
          value={credentials.commun}
          onChange={(e) =>
            setCredentials((perv) => ({
              ...perv,
              ["commun"]: e.target.value,
            }))
          }
        >
          <option value={null}>Please choose a commun</option>
          <option value="Ain-Defla">Ain Defla</option>
          <option value="Amra">Amra</option>
        </select>
        <Button
          title={loading ? "loading..." : "update"}
          className="!w-1/2"
          onClick={updateProfile}
        />
      </div>
    </div>
  );
};

export default CredentialsForm;
