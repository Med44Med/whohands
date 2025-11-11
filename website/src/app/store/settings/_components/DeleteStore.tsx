"use client";

import React from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";
import { FaCircleNotch } from "react-icons/fa";
import { useState } from 'react';

const DeleteStore = ({ store }) => {
  const supabase = createClient();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('')

  const handleDelete = async () => {
    setIsDeleting(true);
    setStatusMessage('Deleting store data...');

    const {  error: storeAvatarError } = await supabase
      .storage
      .from('stores_avatar')
      .remove([`${store.id}.webp`]);

    if (storeAvatarError) {
      console.log('error deleting store avatar:', storeAvatarError);
    }
    setStatusMessage('Deleting store records...');

    setStatusMessage('Deleting store...');
    const { error: deleteStoreError } = await supabase
    .from("stores")
    .delete()
    .eq("owner", store?.owner);
    if (deleteStoreError) {
      console.log(deleteStoreError);
    }

    setStatusMessage('Updating profile...');
    const { error: errUpdateProfile } = await supabase
      .from("profiles")
      .update({ role: "user" })
      .eq("id", store?.owner);
    if (errUpdateProfile) {
      console.log(errUpdateProfile);
    }
    setStatusMessage('Store deleted successfully. Redirecting...');
    router.replace("/");
  };
  
  return (
    <div className="mt-3 w-full bg-orange-400/50 border-2 border-orange-400 shadow py-10 rounded-2xl flex flex-col items-center">
      <Alert className="flex items-center" show={isDeleting}>
        <div className="mr-4">
          <FaCircleNotch className="animate-spin text-3xl text-white" />
        </div>
        <h1 className="text-white h-full">{statusMessage}</h1>
      </Alert>
      <button
        className="bg-orange-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-700 transition-all"
        onClick={() => handleDelete()}
      >
        Delete Store
      </button>
    </div>
  );
};

export default DeleteStore;
