"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/hooks/useLang";

interface Command {
  id: string;
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette() {
  const { lang, toggle } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const navigateTo = (id: string) => {
    if (id === "contact") {
      if (pathname === "/") {
        scrollToBottom();
      } else {
        router.push("/");
        setTimeout(scrollToBottom, 600);
      }
      return;
    }
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [escHover, setEscHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] =
    lang === "pt"
      ? [
          {
            id: "home",
            label: "▸ início",
            hint: "ir para o início",
            action: () => navigateTo("home"),
          },
          {
            id: "about",
            label: "▸ sobre",
            hint: "quem sou",
            action: () => navigateTo("about"),
          },
          {
            id: "experience",
            label: "▸ experiência",
            hint: "minha trajetória",
            action: () => navigateTo("experience"),
          },
          {
            id: "blog",
            label: "▸ blog",
            hint: "algumas notas",
            action: () => navigateTo("blog"),
          },
          {
            id: "contact",
            label: "▸ contato",
            hint: "me escreva",
            action: () => navigateTo("contact"),
          },
          {
            id: "email",
            label: "⧉ email",
            hint: "daviaugustovissotto@gmail.com",
            action: () =>
              navigator.clipboard?.writeText("daviaugustovissotto@gmail.com"),
          },
          {
            id: "linkedin",
            label: "↗ linkedin",
            hint: "/in/daviaviss",
            action: () =>
              window.open("https://linkedin.com/in/daviaviss", "_blank"),
          },
          {
            id: "whatsapp",
            label: "↗ whatsapp",
            hint: "+55 48 98461-6370",
            action: () => window.open("https://wa.me/5548984616370", "_blank"),
          },
          {
            id: "instagram",
            label: "↗ instagram",
            hint: "@daviaviss",
            action: () =>
              window.open("https://www.instagram.com/daviaviss/", "_blank"),
          },
          {
            id: "github",
            label: "↗ github",
            hint: "@daviaviss",
            action: () => window.open("https://github.com/daviaviss", "_blank"),
          },
          {
            id: "theme",
            label: "◑ alternar tema",
            hint: "escuro / claro",
            action: () => {
              const h = document.documentElement;
              h.dataset.theme = h.dataset.theme === "light" ? "" : "light";
            },
          },
          {
            id: "lang",
            label: "◎ english",
            hint: "switch to english",
            action: toggle,
          },
        ]
      : [
          {
            id: "home",
            label: "▸ home",
            hint: "go to top",
            action: () => navigateTo("home"),
          },
          {
            id: "about",
            label: "▸ about",
            hint: "who am i",
            action: () => navigateTo("about"),
          },
          {
            id: "experience",
            label: "▸ experience",
            hint: "my trajectory",
            action: () => navigateTo("experience"),
          },
          {
            id: "blog",
            label: "▸ blog",
            hint: "some notes",
            action: () => navigateTo("blog"),
          },
          {
            id: "contact",
            label: "▸ contact",
            hint: "reach out",
            action: () => navigateTo("contact"),
          },
          {
            id: "email",
            label: "⧉ email",
            hint: "daviaugustovissotto@gmail.com",
            action: () =>
              navigator.clipboard?.writeText("daviaugustovissotto@gmail.com"),
          },
          {
            id: "linkedin",
            label: "↗ linkedin",
            hint: "/in/daviaviss",
            action: () =>
              window.open("https://linkedin.com/in/daviaviss", "_blank"),
          },
          {
            id: "whatsapp",
            label: "↗ whatsapp",
            hint: "+55 48 98461-6370",
            action: () => window.open("https://wa.me/5548984616370", "_blank"),
          },
          {
            id: "instagram",
            label: "↗ instagram",
            hint: "@daviaviss",
            action: () =>
              window.open("https://www.instagram.com/daviaviss/", "_blank"),
          },
          {
            id: "github",
            label: "↗ github",
            hint: "@daviaviss",
            action: () => window.open("https://github.com/daviaviss", "_blank"),
          },
          {
            id: "theme",
            label: "◑ toggle theme",
            hint: "dark / light",
            action: () => {
              const h = document.documentElement;
              h.dataset.theme = h.dataset.theme === "light" ? "" : "light";
            },
          },
          {
            id: "lang",
            label: "◎ português",
            hint: "mudar para português",
            action: toggle,
          },
        ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.hint.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => {
      setOpen(true);
      setQuery("");
      setSelected(0);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelectorAll("button")[selected];
    item?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const run = useCallback((cmd: Command) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (filtered[selected]) run(filtered[selected]);
    }
  };

  if (!open) return null;

  const pt = lang === "pt";

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,8,4,0.75)",
        backdropFilter: "blur(10px)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "20vh",
        animation: "fadeIn 150ms var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-3)",
          width: "min(560px, 90vw)",
          overflow: "hidden",
          boxShadow: "var(--shadow-3)",
          animation: "popIn 240ms var(--ease-spring)",
          position: "relative",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--grain)",
            opacity: 0.15,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              color: "var(--accent)",
              flexShrink: 0,
            }}
          >
            ▸
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder={
              pt
                ? "comandos, seções, ações..."
                : "commands, sections, actions..."
            }
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              color: "var(--fg-1)",
              flex: 1,
              caretColor: "var(--accent)",
            }}
          />
          <kbd
            onClick={() => setOpen(false)}
            onMouseEnter={() => setEscHover(true)}
            onMouseLeave={() => setEscHover(false)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: escHover ? "var(--accent)" : "var(--fg-3)",
              border: `1px solid ${escHover ? "var(--accent)" : "var(--border)"}`,
              borderRadius: "var(--r-1)",
              padding: "2px 6px",
              background: "var(--bg-raised)",
              cursor: "pointer",
              transition:
                "border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
            }}
          >
            esc
          </kbd>
        </div>

        <style>{`
          .palette-results::-webkit-scrollbar { width: 3px; }
          .palette-results::-webkit-scrollbar-track { background: transparent; }
          .palette-results::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
          .palette-results::-webkit-scrollbar-thumb:hover { background: var(--accent); }
          .palette-results { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
        `}</style>
        <div
          ref={listRef}
          className="palette-results"
          style={{ maxHeight: 320, overflowY: "auto", padding: "6px 0" }}
        >
          {filtered.length === 0 && (
            <div
              style={{
                padding: "20px 18px",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--fg-3)",
                textAlign: "center",
              }}
            >
              {pt ? "- nada encontrado" : "- nothing found"}
            </div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              onClick={() => run(cmd)}
              onMouseEnter={() => setSelected(i)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 18px",
                background:
                  i === selected ? "var(--accent-soft)" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background var(--dur-fast) var(--ease-out)",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: i === selected ? "var(--fg-1)" : "var(--fg-2)",
                  transition: "color var(--dur-fast)",
                  textAlign: "left",
                }}
              >
                {cmd.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-3)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 200,
                }}
              >
                {cmd.hint}
              </span>
            </button>
          ))}
        </div>

        <div
          style={{
            padding: "8px 18px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--fg-3)",
            letterSpacing: "0.08em",
          }}
        >
          <span>{pt ? "↑↓ navegar" : "↑↓ navigate"}</span>
          <span>{pt ? "↵ selecionar" : "↵ select"}</span>
          <span>{pt ? "esc fechar" : "esc close"}</span>
        </div>
      </div>
    </div>
  );
}
