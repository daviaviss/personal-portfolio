"use client";

const CURSOR = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24"><path d="M2 1L2 18L6 13L9 21L11 20L8 12L14 12Z" fill="#d96a3a" stroke="#0f0804" stroke-width="1.5" stroke-linejoin="round"/></svg>`
)}") 2 1, auto`;

export function Cursor() {
  const isMobile =
    typeof navigator !== "undefined" && /Mobi/i.test(navigator.userAgent);
  if (isMobile) return null;

  return (
    <style>{`
      * { cursor: ${CURSOR} !important; }
      input, textarea, [contenteditable] {
        cursor: text !important;
      }
    `}</style>
  );
}
