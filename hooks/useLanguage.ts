"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Lang } from "@/hooks/translations";
import { translations } from "@/hooks/translations";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const useLanguage = () => {
  const searchParams = useSearchParams();
  const paramLang = searchParams.get("lang");
  const [cookieLang, setCookieLang] = useState<string | null>(null);

  useEffect(() => {
    setCookieLang(getCookie("lang"));
  }, []);

  const lang: Lang =
    paramLang === "pt" ? "pt" : cookieLang === "pt" ? "pt" : "en";

  const t = (key: string): string => translations[lang][key] ?? key;

  return { lang, t };
};
