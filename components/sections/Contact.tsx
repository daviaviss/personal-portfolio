"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useLang } from "@/hooks/useLang";

const EMAIL = "daviaugustovissotto@gmail.com";

const SOCIALS = [
  { label: "linkedin", handle: "/in/daviaviss", href: "#" },
  {
    label: "whatsapp",
    handle: "+55 48 98461-6370",
    href: "https://wa.me/5548984616370",
  },
  {
    label: "instagram",
    handle: "@daviaviss",
    href: "https://www.instagram.com/daviaviss/",
  },
  {
    label: "github",
    handle: "@daviaviss",
    href: "https://github.com/daviaviss",
  },
];

export function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const { ref, visible } = useScrollReveal();
  const titlePt = useTextScramble("me escreva.", visible);
  const titleEn = useTextScramble("reach out.", visible);
  const title = lang === "pt" ? titlePt : titleEn;

  const copy = async () => {
    await navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const t = {
    direct: lang === "pt" ? "— direto" : "— direct",
    elsewhere: lang === "pt" ? "— em outros lugares" : "— elsewhere",
    copy: lang === "pt" ? "copiar" : "copy",
    copied: lang === "pt" ? "✓ copiado" : "✓ copied",
  };

  return (
    <section
      id="contact"
      ref={ref as React.Ref<HTMLElement>}
      style={{
        padding: "var(--s-9) clamp(24px, 5vw, 48px) var(--s-10)",
        maxWidth: 1080,
        margin: "0 auto",
      }}
    >
      {/* Header */}
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
          {lang === "pt" ? "contato" : "contact"}
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

      {/* Contact info */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition:
            "opacity var(--dur-slow) var(--ease-out) 100ms, transform var(--dur-slow) var(--ease-spring) 100ms",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              marginBottom: 14,
            }}
          >
            {t.direct}
          </div>

          <button
            onClick={copy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "16px 18px",
              borderRadius: "var(--r-2)",
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              transition: `transform var(--dur-base) var(--ease-spring), border-color var(--dur-fast) var(--ease-out)`,
              transform: copied ? "scale(1.02)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--fg-1)",
                flex: 1,
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {EMAIL}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: copied ? "var(--signal-green)" : "var(--accent)",
                transition: "color var(--dur-fast) var(--ease-out)",
                flexShrink: 0,
              }}
            >
              {copied ? t.copied : t.copy}
            </span>
          </button>

          <div
            style={{
              marginTop: 32,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              marginBottom: 14,
            }}
          >
            {t.elsewhere}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              fontFamily: "var(--font-mono)",
              fontSize: 14,
            }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--fg-1)",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  transition: "color var(--dur-fast) var(--ease-out)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--fg-1)")
                }
              >
                <span>{s.label}</span>
                <span style={{ color: "var(--fg-3)" }}>{s.handle} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
