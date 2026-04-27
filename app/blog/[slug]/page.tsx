"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { useLang } from "@/hooks/useLang";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const espressoTheme = {
  'code[class*="language-"]': { color: "#e2c9b0", background: "#130a05", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6 },
  'pre[class*="language-"]':  { color: "#e2c9b0", background: "#130a05" },
  comment:      { color: "#5c4030", fontStyle: "italic" },
  prolog:       { color: "#5c4030" },
  doctype:      { color: "#5c4030" },
  cdata:        { color: "#5c4030" },
  punctuation:  { color: "#8a6248" },
  property:     { color: "#e8a87c" },
  tag:          { color: "#d96a3a" },
  boolean:      { color: "#f0b87a" },
  number:       { color: "#f0b87a" },
  constant:     { color: "#f0b87a" },
  symbol:       { color: "#f0c898" },
  deleted:      { color: "#c04830" },
  selector:     { color: "#c4a882" },
  "attr-name":  { color: "#f0c898" },
  string:       { color: "#c4a882" },
  char:         { color: "#c4a882" },
  builtin:      { color: "#e8956a" },
  inserted:     { color: "#a8905a" },
  operator:     { color: "#a86840" },
  entity:       { color: "#f0c898" },
  url:          { color: "#c4a882" },
  variable:     { color: "#e2c9b0" },
  atrule:       { color: "#d96a3a" },
  "attr-value": { color: "#c4a882" },
  function:     { color: "#e8a87c" },
  "class-name": { color: "#f0c898" },
  keyword:      { color: "#d96a3a" },
  regex:        { color: "#f0b87a" },
  important:    { color: "#d96a3a", fontWeight: "bold" },
  bold:         { fontWeight: "bold" },
  italic:       { fontStyle: "italic" },
};

interface PostData {
  title: string;
  date: string;
  tags: string[];
  content: string;
}

async function fetchPost(slug: string, lang: "pt" | "en"): Promise<PostData | null> {
  const filename = lang === "en" ? `${slug}.en.md` : `${slug}.md`;
  let res = await fetch(
    `https://raw.githubusercontent.com/daviaviss/blog-posts/main/${filename}`
  );
  if (!res.ok && lang === "en") {
    res = await fetch(
      `https://raw.githubusercontent.com/daviaviss/blog-posts/main/${slug}.md`
    );
  }
  if (!res.ok) return null;
  const raw = await res.text();
  const { data, content } = matter(raw);
  return {
    title: data.title ?? slug,
    date: data.date
      ? new Date(data.date).toLocaleDateString(
          lang === "pt" ? "pt-BR" : "en-US"
        )
      : "",
    tags: (data.tags ?? []) as string[],
    content,
  };
}

const espressoLight = {
  'code[class*="language-"]': { color: "#3a1f14", background: "#f2ebdd", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6 },
  'pre[class*="language-"]':  { color: "#3a1f14", background: "#f2ebdd" },
  comment:      { color: "#a08060", fontStyle: "italic" },
  prolog:       { color: "#a08060" },
  doctype:      { color: "#a08060" },
  cdata:        { color: "#a08060" },
  punctuation:  { color: "#7a5040" },
  property:     { color: "#7a3010" },
  tag:          { color: "#c4521f" },
  boolean:      { color: "#a04010" },
  number:       { color: "#a04010" },
  constant:     { color: "#a04010" },
  symbol:       { color: "#805020" },
  deleted:      { color: "#c03020" },
  selector:     { color: "#606840" },
  "attr-name":  { color: "#805020" },
  string:       { color: "#606840" },
  char:         { color: "#606840" },
  builtin:      { color: "#7a5030" },
  inserted:     { color: "#506030" },
  operator:     { color: "#7a5030" },
  entity:       { color: "#805020" },
  url:          { color: "#606840" },
  variable:     { color: "#3a1f14" },
  atrule:       { color: "#c4521f" },
  "attr-value": { color: "#606840" },
  function:     { color: "#7a3010" },
  "class-name": { color: "#805020" },
  keyword:      { color: "#c4521f" },
  regex:        { color: "#a04010" },
  important:    { color: "#c4521f", fontWeight: "bold" },
  bold:         { fontWeight: "bold" },
  italic:       { fontStyle: "italic" },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const [post, setPost] = useState<PostData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.dataset.theme === "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPost(slug, lang).then((data) => {
      if (!data) setNotFound(true);
      else { setPost(data); setNotFound(false); }
      setLoading(false);
    });
  }, [slug, lang]);

  const back = lang === "pt" ? "← voltar" : "← back";

  const prose: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--fg-2)",
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px 80px", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)" }}>
        {lang === "pt" ? "carregando..." : "loading..."}
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px 80px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)", marginBottom: 24 }}>
          {lang === "pt" ? "post não encontrado." : "post not found."}
        </p>
        <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
          {back}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px 120px" }}>
      {/* Back */}
      <Link
        href="/#blog"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "var(--fg-3)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: 48,
          transition: "color var(--dur-fast) var(--ease-out)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
      >
        {back}
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          {post.date && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--fg-3)" }}>
              {post.date}
            </span>
          )}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "2px 7px",
                  borderRadius: "var(--r-1)",
                  border: "1px solid var(--border)",
                  color: "var(--fg-3)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "var(--tracking-tight)",
            color: "var(--fg-1)",
            margin: 0,
          }}
        >
          {post.title}
        </h1>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)", marginBottom: 40 }} />

      {/* Content */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 32, color: "var(--fg-1)", margin: "48px 0 16px", lineHeight: 1.2 }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, color: "var(--fg-1)", margin: "40px 0 12px", lineHeight: 1.2 }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 600, color: "var(--fg-1)", margin: "32px 0 10px" }}>{children}</h3>
          ),
          p: ({ children }) => (
            <p style={{ ...prose, margin: "0 0 20px" }}>{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");
            if (match) {
              const theme = isLight ? espressoLight : espressoTheme;
              const border = isLight ? "1px solid #e0d0b8" : "1px solid #2a1508";
              return (
                <SyntaxHighlighter
                  language={match[1]}
                  style={theme as never}
                  customStyle={{ borderRadius: "var(--r-2)", border, margin: "24px 0", fontSize: 13, padding: "20px 24px" }}
                  PreTag="div"
                >
                  {code}
                </SyntaxHighlighter>
              );
            }
            const inlineBg = isLight ? "#f2ebdd" : "#130a05";
            const inlineBorder = isLight ? "1px solid #e0d0b8" : "1px solid #2a1508";
            const inlineColor = isLight ? "#3a1f14" : "#e2c9b0";
            return (
              <code style={{ fontFamily: "var(--font-mono)", fontSize: 13, background: inlineBg, border: inlineBorder, borderRadius: "var(--r-1)", padding: "1px 6px", color: inlineColor }}>{children}</code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          ul: ({ children }) => (
            <ul style={{ ...prose, paddingLeft: 20, margin: "0 0 20px" }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ ...prose, paddingLeft: 20, margin: "0 0 20px" }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ ...prose, marginBottom: 6 }}>{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 16, margin: "24px 0", color: "var(--fg-3)", fontStyle: "italic" }}>{children}</blockquote>
          ),
          hr: () => (
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "32px 0" }} />
          ),
          strong: ({ children }) => (
            <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>{children}</strong>
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", margin: "24px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", fontSize: 14 }}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ borderBottom: "1px solid var(--border)" }}>{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr style={{ borderBottom: "1px solid var(--border)" }}>{children}</tr>
          ),
          th: ({ children }) => (
            <th style={{ padding: "10px 16px", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 500, whiteSpace: "nowrap" }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: "10px 16px", color: "var(--fg-2)", verticalAlign: "middle", lineHeight: 1.5 }}>
              {children}
            </td>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  );
}
