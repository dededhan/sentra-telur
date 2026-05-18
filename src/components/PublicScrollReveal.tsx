"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PublicScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section, main > div, main article, main .grid > *",
      ),
    ).filter((el) => !el.hasAttribute("data-no-reveal"));

    if (targets.length === 0) {
      return;
    }

    if (prefersReducedMotion) {
      targets.forEach((el) => {
        el.classList.add("reveal-on-scroll", "is-visible");
      });
      return;
    }

    targets.forEach((el, index) => {
      el.classList.add("reveal-on-scroll");
      el.style.setProperty("--reveal-delay", `${(index % 6) * 60}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
