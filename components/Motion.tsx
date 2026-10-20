"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Site-wide motion: reveals blocks as they scroll into view, and lets hero glows follow the pointer.
// Content is fully visible without JavaScript or with reduced motion; this only adds the entrance.
const SELECTOR = [
  ".section .sheet",
  ".section .head",
  ".section .card",
  ".section .split > *",
  ".section .list-check li",
  ".section .table-wrap",
  "[data-reveal]",
].join(",");

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion");

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => !el.closest(".no-reveal"));
    els.forEach((el) => {
      const parent = el.parentElement;
      const idx = parent ? Array.from(parent.children).indexOf(el) : 0;
      el.style.setProperty("--d", `${Math.min(idx, 8) * 70}ms`);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) el.classList.add("in");
      else el.classList.add("pre");
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("in");
            io.unobserve(el);
            // Hand the element back to its own hover transitions once the entrance has finished.
            const delay = parseInt(el.style.getPropertyValue("--d")) || 0;
            setTimeout(() => el.classList.remove("pre", "in"), 900 + delay);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.filter((el) => el.classList.contains("pre")).forEach((el) => io.observe(el));

    const glows = Array.from(document.querySelectorAll<HTMLElement>("[data-spotlight]"));
    const onMove = (e: PointerEvent) => {
      for (const g of glows) {
        const r = g.getBoundingClientRect();
        if (e.clientY < r.top || e.clientY > r.bottom) continue;
        g.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        g.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}
