import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import { CustomDock } from "@/components/CustomDock";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Blog from "@/components/Blog";
import ContactMe from "@/components/ContactMe";
import FadeIn from "@/components/FadeIn";

const Meteors = dynamic(() => import("@/components/magicui/meteors"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:gap-12 gap-8 md:p-24 p-10 pb-24 md:pb-24 relative overflow-hidden lg:w-7/12 sm:w-full mx-auto">
      <div className="fixed inset-0 pointer-events-none light-mode-fade-bottom dark:fade-bottom z-10 bg-white/10 dark:bg-black/10" />
      <CustomDock />

      <FadeIn delay={0}><Intro /></FadeIn>
      <FadeIn delay={0.15}><WorkExperience /></FadeIn>
      <FadeIn delay={0.25}><Education /></FadeIn>
      <FadeIn delay={0.35}><Skills /></FadeIn>
      <FadeIn delay={0.45}><Blog /></FadeIn>
      <FadeIn delay={0.55}><ContactMe /></FadeIn>
      <Meteors number={20} />
    </main>
  );
}