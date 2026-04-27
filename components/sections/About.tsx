"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useLang } from "@/hooks/useLang";
import { useIsMobile } from "@/hooks/useIsMobile";

const STACK = [
  {
    group: { pt: "frameworks", en: "frameworks" },
    items: ["next.js", "expo", "react", "react native"],
  },
  {
    group: { pt: "linguagens", en: "languages" },
    items: ["javascript", "typescript", "expo"],
  },
  {
    group: { pt: "estilos", en: "styling" },
    items: ["tailwind", "shadcn", "css modules"],
  },
  {
    group: { pt: "ferramentas", en: "tools" },
    items: ["zed", "claude", "obsidian", "git"],
  },
];

export function About() {
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const { ref, visible } = useScrollReveal();
  const titlePt = useTextScramble("quem sou.", visible);
  const titleEn = useTextScramble("who am i.", visible);
  const title = lang === "pt" ? titlePt : titleEn;

  const bio = {
    p1:
      lang === "pt"
        ? "meu nome é davi augusto vissotto."
        : "my name is davi augusto vissotto.",
    p2:
      lang === "pt" ? (
        <>
          comecei a programar em 2019, quando me interessei por um livro de{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>
            html
          </code>
          . nunca mais parei. hoje curso sistemas de informação na ufsc e
          trabalho com frontend na ci&t.
        </>
      ) : (
        <>
          I started coding in 2019, after getting interested in an{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>
            html
          </code>{" "}
          book. never stopped. today I study information systems at ufsc and
          work as a frontend developer at ci&t.
        </>
      ),
    p3:
      lang === "pt" ? (
        <>
          trabalho com{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            next
          </code>
          ,{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            expo
          </code>{" "}
          e{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            react
          </code>
          . acredito que colaboração é o que transforma boas ideias em produtos
          reais. prefiro trabalhar em projetos que causem um impacto positivo na
          sociedade.
        </>
      ) : (
        <>
          I work with{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            next
          </code>
          ,{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            expo
          </code>{" "}
          and{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            react
          </code>
          . I believe collaboration is what turns good ideas into real products.
          I prefer to work on projects that have a positive impact on society.
        </>
      ),
  };

  return (
    <section
      id="about"
      ref={ref as React.Ref<HTMLElement>}
      style={{ padding: "var(--s-9) clamp(24px, 5vw, 48px)", maxWidth: 1080, margin: "0 auto" }}
    >
      <div
        style={{
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition:
            "opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-spring)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            marginBottom: 10,
          }}
        >
          <span style={{ color: "var(--accent)" }}>▸</span>{" "}
          {lang === "pt" ? "sobre" : "about"}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "var(--fs-h2)",
            letterSpacing: "var(--tracking-tight)",
            margin: 0,
            color: "var(--fg-1)",
          }}
        >
          {title}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
          gap: isMobile ? 24 : 40,
          alignItems: "flex-start",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition:
            "opacity var(--dur-slow) var(--ease-out) 120ms, transform var(--dur-slow) var(--ease-spring) 120ms",
        }}
      >
        {/* Portrait */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 0 40px -4px rgba(217, 106, 58, 0.55)",
              position: "relative",
            }}
          >
            <Image
              src="/assets/davi-portrait.jpg"
              alt="Davi Vissotto"
              width={180}
              height={180}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                filter: "sepia(0.15) saturate(1.1) contrast(1.03)",
              }}
              priority
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "var(--grain)",
                opacity: 0.4,
                mixBlendMode: "overlay",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              marginTop: 14,
              textAlign: isMobile ? "left" : "center",
            }}
          >
            florianópolis · sc · br
          </div>
        </div>

        {/* Bio + stack */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              lineHeight: 1.4,
              color: "var(--fg-1)",
              margin: "0 0 24px",
              maxWidth: 580,
            }}
          >
            {bio.p1}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--fg-2)",
              margin: "0 0 16px",
              maxWidth: 580,
            }}
          >
            {bio.p2}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--fg-2)",
              margin: "0 0 32px",
              maxWidth: 580,
            }}
          >
            {bio.p3}
          </p>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              marginBottom: 16,
            }}
          >
            — stack
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              rowGap: 12,
              columnGap: 16,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            {STACK.map((g) => (
              <div key={g.group.en} style={{ display: "contents" }}>
                <div style={{ color: "var(--fg-3)" }}>{g.group[lang]}</div>
                <div style={{ color: "var(--fg-1)" }}>
                  {g.items.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
