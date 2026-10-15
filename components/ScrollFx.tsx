"use client";

import { useEffect } from "react";

export default function ScrollFx() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) el.classList.add("is-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
