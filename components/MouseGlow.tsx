"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const CELL = 56;
const DIRS = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
];

interface Signal {
  // nó atual (intersecção do grid, em pixels de página)
  x: number;
  y: number;
  dx: number;
  dy: number;
  progress: number; // pixels percorridos em direção ao próximo nó (0..CELL)
  speed: number;
  alpha: number;
  hops: number; // segmentos restantes a percorrer
}

export const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [visible, setVisible] = useState(false);
  const movedRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signalsRef = useRef<Signal[]>([]);
  const rafRef = useRef<number>(0);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = () => document.documentElement.classList.contains("dark");
    const sparkColor = () => (isDark() ? "255,255,255" : "120,120,120");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnSignal = (scrollY: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const cols = Math.floor(w / CELL);
      const rows = Math.floor(h / CELL);
      const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
      const startRow = Math.floor(scrollY / CELL) + Math.floor(Math.random() * rows);

      signalsRef.current.push({
        x: Math.floor(Math.random() * cols) * CELL,
        y: startRow * CELL, // coordenadas de página
        dx: dir.dx,
        dy: dir.dy,
        progress: 0,
        speed: 1.5 + Math.random() * 2,
        alpha: 0.25,
        hops: 3 + Math.floor(Math.random() * 8),
      });
    };

    const nextDir = (dx: number, dy: number) => {
      const r = Math.random();
      if (r < 0.55) return { dx, dy }; // continua reto
      if (r < 0.75) {
        // vira 90°
        return dy === 0
          ? { dx: 0, dy: Math.random() < 0.5 ? 1 : -1 }
          : { dx: Math.random() < 0.5 ? 1 : -1, dy: 0 };
      }
      return null; // para
    };

    let lastSpawn = 0;

    const draw = (timestamp: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const sy = window.scrollY;

      ctx.clearRect(0, 0, w, h);

      // Grid base — linhas horizontais offsetadas pelo scroll para acompanhar a página
      ctx.strokeStyle = "rgba(148,163,184,0.045)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += CELL) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      const gridOffsetY = -(sy % CELL);
      for (let y = gridOffsetY; y <= h; y += CELL) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Spawn — passa o scrollY atual para os sparks nascerem em coordenadas de página
      if (timestamp - lastSpawn > 150 + Math.random() * 150) {
        spawnSignal(sy);
        spawnSignal(sy);
        if (Math.random() < 0.3) spawnSignal(sy);
        lastSpawn = timestamp;
      }

      // Atualiza e desenha os sinais
      signalsRef.current = signalsRef.current.filter((s) => s.hops > 0);

      for (const sig of signalsRef.current) {
        sig.progress += sig.speed;

        // Chegou ao próximo nó
        if (sig.progress >= CELL) {
          sig.x += sig.dx * CELL;
          sig.y += sig.dy * CELL;
          sig.progress = 0;
          sig.hops -= 1;

          if (sig.hops > 0) {
            const nd = nextDir(sig.dx, sig.dy);
            if (!nd) {
              sig.hops = 0;
            } else {
              sig.dx = nd.dx;
              sig.dy = nd.dy;
            }
          }
        }

        if (sig.hops <= 0) continue;

        // Converte coordenadas de página para viewport (subtrai scrollY do y)
        const segLen = CELL * 4;
        const headX = sig.x + sig.dx * sig.progress;
        const headPageY = sig.y + sig.dy * sig.progress;
        const headY = headPageY - sy;
        const tailX = sig.x + sig.dx * Math.max(0, sig.progress - segLen);
        const tailPageY = sig.y + sig.dy * Math.max(0, sig.progress - segLen);
        const tailY = tailPageY - sy;

        // Ignora se estiver completamente fora do viewport
        if (headY < -segLen && tailY < -segLen) continue;
        if (headY > h + segLen && tailY > h + segLen) continue;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${sparkColor()},${sig.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const glow = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.11), transparent 80%)`;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

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
};
