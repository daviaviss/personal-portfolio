"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ProfilePic from "@/app/images/davi.png";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  pt: {
    greeting: "Olá! Meu nome é Davi Augusto",
    description:
      "Possuo 23 anos e grande interesse por tecnologia desde cedo. Minha trajetória inclui participação em projetos com metodologias ágeis (como SCRUM/KANBAN) e foco em desenvolvimento front-end. Tenho experiência com diversas ferramentas e linguagens. Valorizo o trabalho em equipe e o aprendizado prático, buscando sempre evoluir com os desafios. Sou PCD, mas minha condição não exige adaptações no ambiente de trabalho. Meu objetivo é seguir aprendendo e contribuindo com projetos que gerem impacto positivo.",
  },
  en: {
    greeting: "Hi! My name is Davi Augusto",
    description:
      "I'm 23 years old with a deep passion for technology from an early age. My career includes participation in projects using agile methodologies (SCRUM/KANBAN) with a focus on front-end development. I have experience with a wide range of tools and languages. I value teamwork and hands-on learning, always looking to grow through challenges. I'm a person with a disability, but my condition requires no workplace adaptations. My goal is to keep learning and contributing to projects that generate a positive impact.",
  },
};

export const Intro = () => {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row gap-14 justify-between items-center -z-10">
      <div className="flex flex-col gap-2 w-full lg:w-4/5">
        <h1 className="text-4xl font-bold mb-4">{t.greeting}</h1>
        <p className="text-base text-gray-800 dark:text-gray-300">
          {t.description}
        </p>
      </div>
      <motion.div
        className="flex items-center justify-center md:mb-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Image
          src={ProfilePic}
          alt="Davi"
          width={160}
          height={160}
          className="border-2 border-gray-100 rounded-full object-cover"
        />
      </motion.div>
    </div>
  );
}