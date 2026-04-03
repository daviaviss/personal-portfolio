"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const movedRef = useRef(false);
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";
  const pathname = usePathname();

  useEffect(() => {
    setHovering(false);
  }, [pathname]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!movedRef.current) {
        movedRef.current = true;
        setVisible(true);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => { if (movedRef.current) setVisible(true); };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button']"))
        setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button']"))
        setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "transparent",
        border: `2.5px solid ${color}`,
        opacity: clicking ? 0.5 : 0.7,
      }}
      animate={{
        width: clicking ? 16 : hovering ? 52 : 24,
        height: clicking ? 16 : hovering ? 52 : 24,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
}
