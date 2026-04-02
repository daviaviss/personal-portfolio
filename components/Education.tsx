"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface EducationItem {
  startDate: string;
  endDate?: string;
  institution: string;
  degree: string;
  detail?: string;
}

const educationData: Record<"pt" | "en", EducationItem[]> = {
  pt: [
    {
      startDate: "jun 2021",
      endDate: "dez 2026",
      institution: "Universidade Federal de Santa Catarina",
      degree: "Sistemas de Informação",
      detail: "Bacharelado",
    },
    {
      startDate: "fev 2018",
      endDate: "dez 2020",
      institution: "Universidade Federal de Santa Catarina",
      degree: "Colégio de Aplicação",
      detail: "Ensino médio",
    },
  ],
  en: [
    {
      startDate: "Jun 2021",
      endDate: "Dec 2026",
      institution: "Federal University of Santa Catarina",
      degree: "Information Systems",
      detail: "Bachelor's Degree",
    },
    {
      startDate: "Feb 2018",
      endDate: "Dec 2020",
      institution: "Federal University of Santa Catarina",
      degree: "Colégio de Aplicação",
      detail: "High School",
    },
  ],
};

const Education: React.FC = () => {
  const { lang } = useLanguage();
  const data = educationData[lang];
  const present = lang === "pt" ? "o momento" : "Present";
  const title = lang === "pt" ? "Educação" : "Education";

  return (
    <div className="flex flex-col gap-4 w-full -z-10">
      <h1 className="text-2xl font-bold">{title}</h1>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {data.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === data.length - 1 ? "mb-0" : ""
            }`}
          >
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startDate} - {item.endDate || present}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.degree} @ {item.institution}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Education;