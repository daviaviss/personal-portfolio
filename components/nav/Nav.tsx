"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { useIsMobile } from "@/hooks/useIsMobile";

type Section = "home" | "blog" | "experience" | "about" | "contact";

export function Nav() {
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<Section>("home");
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<Section | null>(null);

  const NAV_ITEMS: { id: Section; label: string }[] = [
    { id: "about",      label: lang === "pt" ? "sobre"    : "about" },
    { id: "experience", label: lang === "pt" ? "exp"      : "exp" },
    { id: "blog",       label: "blog" },
    { id: "contact",    label: lang === "pt" ? "contato"  : "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "blog", "experience", "about", "contact"] as const;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as Section);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: Section) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const goHome = () => {
    if (pathname === "/") scrollTo("home");
    else router.push("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      }}
    >
      <button
        onClick={goHome}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 22,
          color: "var(--fg-1)",
          letterSpacing: "-0.03em",
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          padding: 0,
          transition: "color var(--dur-fast) var(--ease-out)",
        }}
      >
        daviaviss
        <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontStyle: "normal", fontSize: 14 }}>
          /
        </span>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 0 : 4, fontFamily: "var(--font-mono)", fontSize: isMobile ? 12 : 13 }}>
        {NAV_ITEMS.map((item, i) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && <span style={{ color: "var(--fg-3)", margin: "0 2px" }}>/</span>}
            <button
              onClick={() => scrollTo(item.id)}
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active === item.id ? "var(--accent)" : hover === item.id ? "var(--fg-1)" : "var(--fg-2)",
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? 12 : 13,
                padding: isMobile ? "6px 6px" : "6px 10px",
                position: "relative",
                transition: "color var(--dur-fast) var(--ease-out)",
              }}
            >
              {active === item.id && <span style={{ color: "var(--accent)" }}>▸ </span>}
              {item.label}
              <span
                style={{
                  position: "absolute",
                  left: isMobile ? 6 : 10,
                  right: isMobile ? 6 : 10,
                  bottom: 2,
                  height: 1,
                  background: "var(--accent)",
                  transform: hover === item.id || active === item.id ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: `transform var(--dur-base) var(--ease-spring)`,
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
