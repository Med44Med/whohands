"use client";
import React from "react";
import { useState } from "react";
import InputField from "../../../../components/InputField";

const CredentialsForm = ({ data }) => {
  const [credentials, setCredentials] = useState(data);

  console.log(credentials);

  return (
    <div className="bg-surface w-full rounded-xl p-5 flex flex-col justify-start items-center gap-3">
      <InputField
        label="email"
        value={credentials.email}
        onChange={(e)=>setCredentials(perv=>({...perv,['email']:e.target.value}))}
        className="w-full"
        error=""
        />
      <InputField
        label="username"
        value={credentials.username}
        onChange={(e)=>setCredentials(perv=>({...perv,['username']:e.target.value}))}
        className="w-full"
      />
    </div>
  );
};

export default CredentialsForm;
