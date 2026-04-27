import { LangProvider } from "@/hooks/useLang";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Blog } from "@/components/sections/Blog";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { StatusLine } from "@/components/ui/StatusLine";
import { Cursor } from "@/components/ui/Cursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Divider } from "@/components/ui/Divider";

export default function Home() {
  return (
    <LangProvider>
      <Cursor />
      <CommandPalette />
      <Nav />

      <main style={{ paddingBottom: 56 }}>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Blog />
        <Divider />
        <Contact />
      </main>

      <StatusLine />
    </LangProvider>
  );
}
