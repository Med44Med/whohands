"use client";

import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/Button";

export default function LangSwitcher({ lang, className }) {
  const router = useRouter();
  const path = usePathname();

  const handleLocals = async (locale: string) => {
    await fetch(`/api/set-locale?locale=${locale}&path=${path}`);
    router.refresh();
  };

  return (
    <Button
      title={lang === "ar" ? "3" : lang}
      onClick={() => handleLocals(lang)}
      className={className}
    />
  );
}
