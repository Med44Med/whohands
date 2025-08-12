"use client";

import { useRouter, usePathname  } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const path = usePathname ();
  
  
  const switchLocale = async (locale: string) => {
    await fetch(`/api/set-locale?locale=${locale}&path=${path}`);
    router.refresh();
  };

  return (
    <div>
      <button onClick={() => switchLocale("en")}>English</button>
      <button onClick={() => switchLocale("fr")}>Français</button>
      <button onClick={() => switchLocale("ar")}>العربية</button>
    </div>
  );
}
