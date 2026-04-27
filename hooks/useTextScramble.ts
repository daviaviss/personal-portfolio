"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=<>[]{}|";

export function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const totalFrames = text.length * 3;

    cancelAnimationFrame(raf.current);

    const update = () => {
      const resolved = Math.floor(iteration / 3);
      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);
      iteration++;

      if (iteration < totalFrames + text.length) {
        raf.current = requestAnimationFrame(update);
        frame.current = raf.current;
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(raf.current);
  }, [trigger, text]);

  return display;
}
