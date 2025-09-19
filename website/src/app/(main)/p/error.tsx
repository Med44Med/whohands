"use client";
import React from "react";
import Button from '@/components/Button';

const ErrorProductsPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
    console.log(error);
    
  return (
    <main className="w-full min-h-screen pt-24 pb-5  flex flex-col justify-center items-center">
      <p>{error.message}</p>
      <Button title='Retry' onClick={()=>reset()}/>
    </main>
  );
};

export default ErrorProductsPage;
