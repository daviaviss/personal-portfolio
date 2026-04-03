"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
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
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const files: { name: string; download_url: string }[] = await res.json();

  // pega apenas os arquivos base (sem .en.md) e ignora README
  const baseFiles = files.filter(
    (f) => f.name.endsWith(".md") && !f.name.endsWith(".en.md") && f.name !== "README.md"
  );

  const posts = await Promise.all(
    baseFiles.map(async (file) => {
      const slug = file.name.replace(".md", "");

      // tenta buscar versão EN se idioma for EN
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
        date: data.date ? new Date(data.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US").toLowerCase() : "",
        tags: data.tags ?? [],
      };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

const PAGE_SIZE = 3;

export default function Blog() {
  const { lang } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setExpanded(false);
    fetchPosts(lang).then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, [lang]);

  const readMore = lang === "pt" ? "Ler post" : "Read post";
  const noPostsMsg = lang === "pt" ? "Nenhum post ainda." : "No posts yet.";
  const expandLabel = lang === "pt" ? "Expandir" : "Expand";
  const collapseLabel = lang === "pt" ? "Recolher" : "Collapse";

  const visiblePosts = expanded ? posts : posts.slice(0, PAGE_SIZE);
  const hasMore = posts.length > PAGE_SIZE;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Blog</h1>

      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lang === "pt" ? "Carregando..." : "Loading..."}
        </p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{noPostsMsg}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {visiblePosts.map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col gap-2 border rounded-md p-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    {post.date && (
                      <span className="text-xs text-gray-400 shrink-0">{post.date}</span>
                    )}
                  </div>
                  {post.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.description}
                    </p>
                  )}
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 sm:self-end">{readMore} →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {expanded ? `↑ ${collapseLabel}` : `↓ ${expandLabel}`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}