"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const skillsData = [
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "GraphQL",
  "VTEX IO",
  "WordPress",
  "Docker",
  "Git",
  "Jest",
];

function Skills() {
  const { lang } = useLanguage();
  const title = lang === "pt" ? "Habilidades" : "Skills";

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {skillsData.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-500 text-gray-100 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Skills;