"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
}

const LangContext = createContext<LangContextType>({ lang: "pt", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    return (localStorage.getItem("lang") as Lang) ?? "pt";
  });

  const toggle = () =>
    setLang((l) => {
      const next = l === "pt" ? "en" : "pt";
      localStorage.setItem("lang", next);
      return next;
    });

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
