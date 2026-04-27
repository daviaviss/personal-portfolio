"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/hooks/useLang";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Hero() {
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState(0);
  const [hintHover, setHintHover] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const t = {
    badge:
      lang === "pt"
        ? `disponível para projetos — ${new Date().getFullYear()}`
        : `available for projects — ${new Date().getFullYear()}`,
    lead1:
      lang === "pt"
        ? "construo interfaces impactantes —"
        : "I build impactful interfaces —",
    lead2:
      lang === "pt"
        ? ". atualmente desenvolvedor pleno na"
        : ". currently mid-level developer at",
    cta1: lang === "pt" ? "▸ ver blog" : "▸ read blog",
    cta2: lang === "pt" ? "me escreva →" : "reach out →",
    palette: lang === "pt" ? "paleta de comandos" : "command palette",
    scroll: lang === "pt" ? "rolar" : "scroll",
  };

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: "100dvh",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Video background */}
      {!isMobile && (
        <div
          className="hero-video-wrap"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 1200ms var(--ease-out)",
          }}
        >
          <video
            src="/assets/character_hero.webm"
            autoPlay
            loop
            muted
            playsInline
            style={{ height: "100%", width: "auto" }}
          />
        </div>
      )}

      {/* Fade bottom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: "linear-gradient(to top, var(--bg), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--grain)",
          opacity: 0.2,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Warm glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "5%",
          right: "0%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(circle, rgba(217,106,58,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(32px)",
          animation: "glowPulse 7s ease-in-out infinite",
          opacity: "var(--hero-glow-opacity)" as React.CSSProperties["opacity"],
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "0 auto",
          padding:
            "clamp(96px, 14vh, 140px) clamp(24px, 5vw, 48px) clamp(64px, 8vh, 96px)",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "none" : "translateY(8px)",
            transition:
              "opacity 600ms var(--ease-out), transform 600ms var(--ease-spring)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--signal-green)",
              boxShadow: "0 0 8px var(--signal-green)",
            }}
          />
          {t.badge}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(48px, 12vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.045em",
            color: "var(--fg-1)",
            margin: "0 0 36px",
            maxWidth: 700,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "none" : "translateY(20px)",
            transition:
              "opacity 700ms var(--ease-out) 100ms, transform 700ms var(--ease-spring) 100ms",
          }}
        >
          davi,
          <br />
          <span style={{ color: "var(--fg-2)" }}>dev</span>
          <span style={{ color: "var(--accent)" }}> &amp;</span>
          <br />
          <span style={{ color: "var(--fg-2)" }}>
            {lang === "pt" ? "entusiasta." : "enthusiast."}
          </span>
        </h1>

        {/* Lead */}
        <p
          style={{
            maxWidth: 480,
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--fg-2)",
            marginBottom: 40,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "none" : "translateY(12px)",
            transition:
              "opacity 600ms var(--ease-out), transform 600ms var(--ease-spring)",
          }}
        >
          {t.lead1}{" "}
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
          </code>
          ,{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--fg-1)",
            }}
          >
            react
          </code>
          {t.lead2} <span style={{ color: "var(--fg-1)" }}>ci&t</span>.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "none" : "translateY(8px)",
            transition:
              "opacity 500ms var(--ease-out), transform 500ms var(--ease-spring)",
          }}
        >
          <Button variant="primary" onClick={() => scrollTo("blog")}>
            {t.cta1}
          </Button>
          <Button variant="secondary" onClick={() => scrollTo("contact")}>
            {t.cta2}
          </Button>
        </div>

        {/* Cmd+K hint */}
        <button
          onClick={() =>
            document.dispatchEvent(new CustomEvent("open-palette"))
          }
          onMouseEnter={() => setHintHover(true)}
          onMouseLeave={() => setHintHover(false)}
          style={{
            marginTop: 40,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 600ms var(--ease-out) 200ms",
            background: "none",
            border: "none",
            padding: 0,
            color: "inherit",
          }}
        >
          <kbd
            style={{
              border: `1px solid ${hintHover ? "var(--accent)" : "var(--border)"}`,
              borderRadius: "var(--r-1)",
              padding: "1px 5px",
              fontSize: 10,
              background: "var(--bg-raised)",
              color: hintHover ? "var(--accent)" : "var(--fg-3)",
              transition:
                "border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
            }}
          >
            ⌘+K
          </kbd>
          <span
            style={{
              color: hintHover ? "var(--fg-1)" : "var(--fg-3)",
              transition: "color var(--dur-fast) var(--ease-out)",
            }}
          >
            {t.palette}
          </span>
        </button>

        {/* Scroll hint */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 40,
            left: "clamp(24px, 5vw, 48px)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 600ms var(--ease-out) 400ms",
          }}
        >
          <span>{t.scroll}</span>
          <span style={{ fontSize: 16 }}>↓</span>
        </div>
      </div>
    </section>
  );
}
