"use client";

import { useRef } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./ui.module.css";

const NAV = [
  ["Overview", "#overview"],
  ["Heroes", "#heroes"],
  ["Story", "#story"],
  ["Timeline", "#timeline"],
] as const;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * The website header + navigation. It doesn't exist during the Marvel intro —
 * it slides in as the camera exits the portal into the Hero, keyed off the
 * scroll-driven `signals.header`. It retires again as the horizontal timeline
 * begins so the cinematic back-half (reel → finale) stays immersive; the footer
 * carries the nav at the very end.
 */
export default function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useRaf(() => {
    const el = ref.current;
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleY(${clamp01(signals.scroll)})`;
    }
    if (!el) return;
    const h = signals.header * (1 - smoothstep(0.02, 0.14, signals.reel));
    el.style.opacity = h.toFixed(3);
    el.style.transform = `translateY(${(1 - h) * -20}px)`;
    el.style.pointerEvents = h > 0.6 ? "auto" : "none";
    el.style.visibility = h < 0.01 ? "hidden" : "visible";
  });

  return (
    <>
      <span className={styles.pageProgressTrack} aria-hidden="true">
        <span ref={progressRef} />
      </span>
      <header ref={ref} className={styles.header} style={{ opacity: 0, visibility: "hidden" }}>
        <div className={styles.brand}>
          <span className={styles.mark} aria-hidden />
          <h1 className={styles.brandText}>
            MARVEL<b>STUDIOS</b>
            <span className="sr-only"> Avengers: Doomsday cinematic fan interface by Dwij Kansagara</span>
          </h1>
        </div>
        <nav className={styles.nav}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className={styles.navLink}>
              {label}
            </a>
          ))}
        </nav>
        <a className={styles.cta} href="https://github.com/DwijKansagara/avengers-doomsday" target="_blank" rel="noreferrer">View source</a>
      </header>
    </>
  );
}
