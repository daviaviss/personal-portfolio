"use client";

import { useState, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const [hover, setHover] = useState(false);

  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    padding: "10px 18px",
    borderRadius: "var(--r-2)",
    cursor: "pointer",
    letterSpacing: "0.02em",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: `border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)`,
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          background: "var(--accent)",
          color: "var(--espresso-950)",
          border: "1px solid var(--accent)",
          fontWeight: 500,
          opacity: hover ? 0.82 : 1,
        }
      : variant === "secondary"
      ? {
          ...base,
          background: "transparent",
          color: hover ? "var(--accent)" : "var(--fg-1)",
          border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
          fontWeight: 400,
        }
      : {
          ...base,
          background: "transparent",
          color: hover ? "var(--fg-1)" : "var(--fg-2)",
          border: "1px solid transparent",
          fontWeight: 400,
        };

  const handlers = {
    style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick,
    className,
  };

  if (href) {
    return <a href={href} {...handlers}>{children}</a>;
  }

  return (
    <button type={type} {...handlers}>{children}</button>
  );
}
