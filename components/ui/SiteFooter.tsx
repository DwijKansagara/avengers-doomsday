"use client";

import { createElement, useRef } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./footer.module.css";

/**
 * The closing footer — rises from the bottom after the title reveal, driven by
 * `signals.footer`. Minimal + elegant, in the same dark-green cinematic language.
 */
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const NAV = [["Overview", "#overview"], ["Characters", "#heroes"], ["Story", "#story"], ["Timeline", "#timeline"]] as const;
const LEGAL = [
  ["Privacy", "/privacy.html"],
  ["Terms", "/terms.html"],
  ["Cookies", "/cookies.html"],
  ["Refunds", "/refunds.html"],
] as const;

export default function SiteFooter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLElement>(null);

  useRaf(() => {
    const foot = signals.footer;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (foot <= 0.0006) {
      if (wrap.style.visibility !== "hidden") wrap.style.visibility = "hidden";
      return;
    }
    wrap.style.visibility = "visible";
    if (footRef.current) {
      footRef.current.style.transform = `translateY(${((1 - foot) * 100).toFixed(2)}%)`;
      footRef.current.style.opacity = smoothstep(0, 0.25, foot).toFixed(3);
    }
  });

  return (
    <div className={styles.wrap} ref={wrapRef} style={{ visibility: "hidden" }}>
      <footer className={styles.footer} ref={footRef} style={{ opacity: 0 }}>
        <span className={styles.glow} />
        {createElement("dwij-engagement", { site: "doomsday", compact: "" })}
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.mark}>
              Doomsday<span>.</span>
            </span>
            <span className={styles.tag}>A scroll-driven cinematic concept experience.</span>
          </div>

          <nav>
            <div className={styles.colHead}>Explore</div>
            <div className={styles.links}>
              {NAV.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <div className={styles.colHead}>Legal</div>
            <div className={styles.social}>
              {LEGAL.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <section className={styles.about} aria-labelledby="project-facts">
          <div>
            <div className={styles.colHead}>Created by</div>
            <p><a href="https://about-me.antideploy.com/">Dwij Kansagara</a> is a Class 10 student and developer in Rajkot, India. He built this project to study cinematic interaction, 3D graphics and scroll choreography.</p>
          </div>
          <div>
            <div className={styles.colHead} id="project-facts">Project facts</div>
            <details><summary>Is this an official Marvel website?</summary><p>No. This is an independent, non-commercial fan interface study and is not affiliated with Marvel or Disney.</p></details>
            <details><summary>How was it built?</summary><p>With Next.js, React Three Fiber, Three.js and GSAP. Scrolling controls the scene progression.</p></details>
          </div>
        </section>

        <div className={styles.rule} />
        <div className={styles.base}>
          <span>© 2026 Dwij Kansagara · Independent fan concept, not affiliated with Marvel or Disney.</span>
          <span>Built as a cinematic web experience.</span>
        </div>
      </footer>
    </div>
  );
}

