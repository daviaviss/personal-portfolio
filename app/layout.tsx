import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "daviaviss — dev & entusiasta",
  description: "construo interfaces no frontend — next, react, react native.",
  openGraph: {
    title: "daviaviss",
    description: "construo interfaces no frontend — next, react, react native.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full" data-theme="">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
