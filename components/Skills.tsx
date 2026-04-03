"use client";

import React from "react";
import { motion } from "framer-motion";
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

export const Skills = () => {
  const { lang } = useLanguage();
  const title = lang === "pt" ? "Habilidades" : "Skills";

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {skillsData.map((skill, index) => (
          <motion.span
            key={index}
            className="bg-gray-500 text-gray-100 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

