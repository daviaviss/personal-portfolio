import dynamic from "next/dynamic";
import { CustomDock } from "@/components/CustomDock";
import PageContent from "@/components/PageContent";

const MouseGlow = dynamic(() => import("@/components/MouseGlow"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:gap-12 gap-8 md:p-24 p-10 pb-24 md:pb-24 relative overflow-hidden lg:w-7/12 sm:w-full mx-auto">
      <MouseGlow />
      <div className="fixed inset-0 pointer-events-none light-mode-fade-bottom dark:fade-bottom z-10 bg-white/10 dark:bg-black/10" />
      <CustomDock />
      <PageContent />
    </main>
  );
}