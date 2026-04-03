"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [visible, setVisible] = useState(false);
  const movedRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!movedRef.current) {
        movedRef.current = true;
        setVisible(true);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const glow = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.11), transparent 80%)`;

  return (
    <>
      {/* Grid texture — glass feel */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "56px 56px",
        }}
      />

      {/* Mouse-following glow */}
      {visible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ background: glow }}
        />
      )}
    </>
  );
}
