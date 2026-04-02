"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface WorkExperienceItem {
  startDate: string;
  endDate?: string;
  companyName: string;
  jobTitle: string;
  description: string[];
  companyLink?: string;
}

const workExperienceData: Record<"pt" | "en", WorkExperienceItem[]> = {
  pt: [
    {
      startDate: "jul 2025",
      companyName: "CI&T",
      jobTitle: "Desenvolvedor de Software (Pleno)",
      description: [
        "Atuo no time de customer experience desenvolvendo e aprimorando funcionalidades voltadas à jornada do usuário em um aplicativo de banking de uma grande rede de cosméticos. Utilizo tecnologias como React Native e Node.js para entregar soluções que melhoram a usabilidade, a performance e a satisfação do cliente.",
      ],
    },
    {
      startDate: "jan 2025",
      endDate: "jun 2025",
      companyName: "CI&T",
      jobTitle: "Desenvolvedor de Software (Júnior)",
      description: [
        "Atuei na equipe de adequação PJ, desenvolvendo apps móveis com React Native e Node.js. Com foco em novas funcionalidades, integração de APIs, otimização e resolução de problemas. Contribuí para um projeto de banking de uma grande rede de cosméticos, criando soluções financeiras para uma experiência segura e intuitiva.",
      ],
    },
    {
      startDate: "fev 2023",
      endDate: "jan 2025",
      companyName: "Quality Digital",
      jobTitle: "Desenvolvedor de Software (Júnior)",
      description: [
        "Na Quality Digital, desenvolvi lojas virtuais para marcas como Electrolux, Vivara e Fast Shop, focando na implementação de funcionalidades, otimização de desempenho, correção de problemas e manutenção das plataformas. Também documentei atualizações de código, garantindo organização e qualidade no trabalho em equipe.",
      ],
    },
    {
      startDate: "jul 2022",
      endDate: "fev 2023",
      companyName: "Quality Digital",
      jobTitle: "Desenvolvedor de Software (Estagiário)",
      description: [
        "Quando estagiário na Quality Digital, foquei no aprendizado e desenvolvimento de soluções de e-commerce, utilizando diversas tecnologias do setor. Trabalhei com várias plataformas, adquirindo experiência em criar soluções personalizadas e escaláveis para atender às necessidades dos clientes.",
      ],
    },
    {
      startDate: "dez 2021",
      endDate: "fev 2022",
      companyName: "InfinityWorks",
      jobTitle: "Desenvolvedor de Software (Autônomo)",
      description: [
        "Na InfinityWorks, atuei como desenvolvedor web freelance, criando websites e aplicativos personalizados para empresas locais. Trabalhei em colaboração com equipes de design e gestão para entregar soluções modernas alinhadas às necessidades dos clientes, aprimorando minhas habilidades em comunicação, trabalho em equipe e desenvolvimento web.",
      ],
    },
  ],
  en: [
    {
      startDate: "Jul 2025",
      companyName: "CI&T",
      jobTitle: "Software Developer (Mid-level)",
      description: [
        "I work on the customer experience team, developing and improving features focused on the user journey in a banking app for a major cosmetics retail chain. I use React Native and Node.js to deliver solutions that enhance usability, performance, and customer satisfaction.",
      ],
    },
    {
      startDate: "Jan 2025",
      endDate: "Jun 2025",
      companyName: "CI&T",
      jobTitle: "Software Developer (Junior)",
      description: [
        "I worked on the PJ compliance team, building mobile apps with React Native and Node.js. Focused on new features, API integration, optimization, and bug fixing. Contributed to a banking project for a major cosmetics chain, building financial solutions for a secure and intuitive experience.",
      ],
    },
    {
      startDate: "Feb 2023",
      endDate: "Jan 2025",
      companyName: "Quality Digital",
      jobTitle: "Software Developer (Junior)",
      description: [
        "At Quality Digital, I developed e-commerce storefronts for brands such as Electrolux, Vivara, and Fast Shop, focusing on feature implementation, performance optimization, bug fixing, and platform maintenance. I also documented code updates to ensure organization and quality in team collaboration.",
      ],
    },
    {
      startDate: "Jul 2022",
      endDate: "Feb 2023",
      companyName: "Quality Digital",
      jobTitle: "Software Developer (Intern)",
      description: [
        "As an intern at Quality Digital, I focused on learning and building e-commerce solutions using various industry technologies. I worked across multiple platforms, gaining experience in creating customized and scalable solutions to meet client needs.",
      ],
    },
    {
      startDate: "Dec 2021",
      endDate: "Feb 2022",
      companyName: "InfinityWorks",
      jobTitle: "Software Developer (Freelance)",
      description: [
        "At InfinityWorks, I worked as a freelance web developer, building custom websites and applications for local businesses. I collaborated with design and management teams to deliver modern solutions aligned with client needs, improving my communication, teamwork, and web development skills.",
      ],
    },
  ],
};

const WorkExperience: React.FC = () => {
  const { lang } = useLanguage();
  const data = workExperienceData[lang];
  const present = lang === "pt" ? "o momento" : "Present";
  const title = lang === "pt" ? "Experiência" : "Experience";

  return (
    <div className="flex flex-col gap-4 w-full -z-10">
      <h1 className="text-2xl font-bold">{title}</h1>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {data.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${index === data.length - 1 ? "mb-0" : ""}`}
          >
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startDate} - {item.endDate || present}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.jobTitle} @ {item.companyName}
            </h3>
            <div className="mb-4 text-base font-normal text-gray-700 dark:text-gray-400">
              <ul>
                {item.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
            {item.companyLink && (
              <a
                href={item.companyLink}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                {lang === "pt" ? "Saiba mais" : "Learn more"}{" "}
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkExperience;