"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  pt: {
    title: "Contato",
    text: "Quer conversar? Você pode me encontrar por qualquer um dos canais de comunicação disponíveis na barra de navegação.",
  },
  en: {
    title: "Contact Me",
    text: "Want to chat? You can reach me through any of the communication channels available in the navigation bar.",
  },
};

function ContactMe() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="flex flex-col gap-4 mb-20">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-300">{t.text}</p>
    </div>
  );
}

export default ContactMe;