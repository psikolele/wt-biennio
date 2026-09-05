"use client";

import { useEffect, useState } from "react";

const phrases = [
  "una classe alla volta.",
  "un progetto alla volta.",
  "un laboratorio alla volta.",
  "un passo alla volta."
];

export function AnimatedRotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="text-[#AAA2FF] inline-block transition-opacity duration-300 ease-in-out"
      style={{
        opacity: visible ? 1 : 0,
      }}
      aria-live="polite"
    >
      {phrases[index]}
    </span>
  );
}
