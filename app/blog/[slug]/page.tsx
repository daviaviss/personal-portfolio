"use client";

import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Copy, Check } from "lucide-react";
import { CustomDock } from "@/components/CustomDock";
import { motion } from "framer-motion";

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
      <SyntaxHighlighter
        style={nord}
        language={language}
        PreTag="div"
        customStyle={{ borderRadius: "0.5rem", fontSize: "0.875rem", margin: "1.25rem 0" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

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
      ? new Date(data.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US").toLowerCase()
      : "",
    tags: data.tags ?? [],
    content,
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const [post, setPost] = useState<PostData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPost(slug, lang).then((data) => {
      if (!data) setNotFound(true);
      else { setPost(data); setNotFound(false); }
      setLoading(false);
    });
  }, [slug, lang]);

  const back = lang === "pt" ? "← Voltar" : "← Back";

  if (loading) {
    return (
      <>
        <CustomDock />
        <main className="flex min-h-screen flex-col md:p-24 p-10 lg:w-7/12 sm:w-full mx-auto">
          <p className="text-gray-400 text-sm">{lang === "pt" ? "carregando..." : "loading..."}</p>
        </main>
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <CustomDock />
        <main className="flex min-h-screen flex-col md:p-24 p-10 lg:w-7/12 sm:w-full mx-auto">
          <p className="text-gray-500">{lang === "pt" ? "post não encontrado." : "post not found."}</p>
          <Link href="/" className="text-gray-700 dark:text-gray-300 mt-4 text-sm">{back}</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <CustomDock />
      <main className="flex min-h-screen flex-col md:gap-8 gap-6 md:p-24 p-10 pb-24 md:pb-24 lg:w-7/12 sm:w-full mx-auto">
        <motion.div
          className="flex flex-col md:gap-8 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <Link href="/" className="text-gray-700 dark:text-gray-300 text-sm">{back}</Link>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize-first">
            {post!.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            {post!.date && (
              <span className="text-sm text-gray-400">{post!.date}</span>
            )}
            <div className="flex gap-1 flex-wrap">
              {post!.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none
          prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
          prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-strong:text-gray-900 dark:prose-strong:text-white
          prose-a:text-gray-700 dark:prose-a:text-gray-300 prose-a:underline prose-a:underline-offset-2
          prose-code:before:content-none prose-code:after:content-none
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre({ children }) {
                return <>{children}</>;
              },
              a({ href, children }) {
                const isExternal = href?.startsWith("http");
                return (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                );
              },
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const code = String(children).replace(/\n$/, "");
                const isBlock = !!match || code.includes("\n");
                return isBlock ? (
                  <CodeBlock
                    language={match ? match[1] : "text"}
                    code={code}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post!.content}
          </ReactMarkdown>
        </article>
        </motion.div>
      </main>
    </>
  );
}