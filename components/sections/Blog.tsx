"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useLang } from "@/hooks/useLang";
import matter from "gray-matter";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

async function fetchPosts(lang: "pt" | "en"): Promise<Post[]> {
  const res = await fetch(
    "https://api.github.com/repos/daviaviss/blog-posts/contents",
    { next: { revalidate: 3600 } } as RequestInit,
  );
  if (!res.ok) return [];

  const files: { name: string; download_url: string }[] = await res.json();
  const baseFiles = files.filter(
    (f) =>
      f.name.endsWith(".md") &&
      !f.name.endsWith(".en.md") &&
      f.name !== "README.md" &&
      f.name !== "CLAUDE.md",
  );

  const posts = await Promise.all(
    baseFiles.map(async (file) => {
      const slug = file.name.replace(".md", "");
      let targetFile = file;
      if (lang === "en") {
        const enFile = files.find((f) => f.name === `${slug}.en.md`);
        if (enFile) targetFile = enFile;
      }
      const raw = await fetch(targetFile.download_url).then((r) => r.text());
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date
          ? new Date(data.date).toLocaleDateString(
              lang === "pt" ? "pt-BR" : "en-US",
            )
          : "",
        tags: (data.tags ?? []) as string[],
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const { lang } = useLang();
  const { ref, visible } = useScrollReveal(0.1);
  const [hov, setHov] = useState(false);

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        background: hov ? "var(--bg-elevated)" : "var(--bg-raised)",
        border: `1px solid ${hov ? "rgba(217,106,58,0.5)" : "var(--border)"}`,
        borderRadius: "var(--r-3)",
        padding: "var(--s-5)",
        position: "relative",
        overflow: "hidden",
        transform: hov
          ? "translateY(-2px)"
          : visible
            ? "translateY(0)"
            : "translateY(12px)",
        boxShadow: hov ? "var(--shadow-2)" : "var(--shadow-1)",
        opacity: visible ? 1 : 0,
        transition: `opacity var(--dur-slow) var(--ease-out) ${index * 80}ms, transform var(--dur-base) var(--ease-spring), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)`,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--grain)",
          opacity: hov ? 0.32 : 0.18,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          transition: "opacity var(--dur-base) var(--ease-out)",
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 10,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 26,
              lineHeight: 1.15,
              color: "var(--fg-1)",
              margin: 0,
            }}
          >
            {post.title}
          </h3>
          {post.date && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "var(--fg-3)",
                flexShrink: 0,
                marginTop: 6,
              }}
            >
              {post.date}
            </span>
          )}
        </div>

        {post.description && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--fg-2)",
              margin: "0 0 14px",
            }}
          >
            {post.description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            marginTop: "auto",
          }}
        >
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
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--accent)",
            }}
          >
            {lang === "pt" ? "ler ↗" : "read ↗"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Blog() {
  const { lang } = useLang();
  const { ref, visible } = useScrollReveal();
  const titlePt = useTextScramble("algumas notas.", visible);
  const titleEn = useTextScramble("some notes.", visible);
  const title = lang === "pt" ? titlePt : titleEn;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPosts(lang).then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, [lang]);

  return (
    <section
      id="blog"
      ref={ref as React.Ref<HTMLElement>}
      style={{ padding: "var(--s-9) clamp(24px, 5vw, 48px)", maxWidth: 1080, margin: "0 auto" }}
    >
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
          {lang === "pt" ? "blog" : "blog"}
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

      {loading ? (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--fg-3)",
            opacity: visible ? 1 : 0,
            transition: "opacity var(--dur-slow) var(--ease-out) 100ms",
          }}
        >
          {lang === "pt" ? "carregando..." : "loading..."}
        </div>
      ) : posts.length === 0 ? (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--fg-3)",
          }}
        >
          {lang === "pt" ? "nenhum post ainda." : "no posts yet."}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 440px), 1fr))",
            gap: 20,
          }}
        >
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
