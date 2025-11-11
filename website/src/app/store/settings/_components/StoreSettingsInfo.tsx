"use client";
import React from "react";
import { wilayas } from "../../../../../public/location";
import { useState } from "react";
import { createClient } from "@/supabase/client";

const StoreSettingsInfo = ({ store }) => {
  const supabase = createClient();

  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {  error } = await supabase
      .from("stores")
      .update(info)
      .eq("id", store.id)
      .select();

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="mt-3 w-full bg-primary/10 shadow p-4 rounded-2xl flex flex-col items-center">
      <form className="w-11/12 max-w-md flex flex-col" onSubmit={handleUpdate}>
        <label className="w-full text-text">Store Name</label>
        <input
          type="text"
          className="mt-1 p-2 rounded border border-gray-400 w-full mb-4 bg-white outline-none"
        />
        <label className="w-full text-text">Store Description</label>
        <textarea
          className="mt-1 p-2 rounded border border-gray-400 w-full mb-4 bg-white outline-none"
          rows={4}
        ></textarea>
        <label className="w-full text-text">Wilaya</label>
        <select className="mt-1 p-2 rounded border border-gray-400 w-full mb-4 bg-white outline-none">
          {wilayas.map((w) => (
            <option key={w.id} value={w.slug}>
              {w.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
            disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default StoreSettingsInfo;
