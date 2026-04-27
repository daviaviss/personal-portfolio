import { LangProvider } from "@/hooks/useLang";
import { Nav } from "@/components/nav/Nav";
import { StatusLine } from "@/components/ui/StatusLine";
import { Cursor } from "@/components/ui/Cursor";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Cursor />
      <CommandPalette />
      <Nav />
      <main>{children}</main>
      <StatusLine />
    </LangProvider>
  );
}
