"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Divider() {
  const { ref, visible } = useScrollReveal(0.5);

  return (
    <div
      aria-hidden
      ref={ref as React.Ref<HTMLDivElement>}
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 48px)",
        opacity: visible ? 1 : 0,
        transition: "opacity var(--dur-slow) var(--ease-out)",
      }}
    >
      <div style={{ height: 1, background: "var(--border)" }} />
    </div>
  );
}
