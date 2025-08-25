"use client";

import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/Button";
import { useState } from 'react';

export default function LangSwitcher({ lang, className }) {
  const router = useRouter();
  const path = usePathname();

  const [loading, setLoading] = useState(false)

  const handleLocals = async (locale: string) => {
    setLoading(true)
    await fetch(`/api/set-locale?locale=${locale}&path=${path}`);
    setLoading(false)
    router.refresh();
  };

  return (
    <Button
      title={loading ? 'loading':lang === "ar" ? "3" : lang}
      onClick={() => handleLocals(lang)}
      className={className}
    />
  );
}
