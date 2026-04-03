"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Intro } from "@/components/Intro";
import { WorkExperience } from "@/components/WorkExperience";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { ContactMe } from "@/components/ContactMe";
import { FadeIn } from "@/components/FadeIn";

export const PageContent = () => {
  const { lang } = useLanguage();

  return (
    <div key={lang} className="flex flex-col md:gap-12 gap-8">
      <FadeIn delay={0}><Intro /></FadeIn>
      <FadeIn delay={0.15}><WorkExperience /></FadeIn>
      <FadeIn delay={0.25}><Education /></FadeIn>
      <FadeIn delay={0.35}><Skills /></FadeIn>
      <FadeIn delay={0.45}><Blog /></FadeIn>
      <FadeIn delay={0.55}><ContactMe /></FadeIn>
    </div>
  );
}
