"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel } from "./Carousel";
import { ImportantDates } from "./ImportantDates";
import { SomedayList } from "./SomedayList";

type Page = {
  label: string;
  title: string;
  body: string;
  quote: string;
};

const pages: Page[] = [
  {
    label: "Page one",
    title: "A tiny note from a big heart.",
    body:
      "You’re probably just scrolling on your phone, but I wanted you to stumble into this little corner and be reminded that you are my favorite part of every day.",
    quote: "You’re my favorite “we made it through another day” person.",
  },
  {
    label: "Page two",
    title: "The everyday things I quietly love.",
    body:
      "The way you text. The way you laugh. The way you notice tiny details and the way we have our own weird language that somehow always makes sense.",
    quote: "You turn ‘just another Tuesday’ into something I look forward to.",
  },
  {
    label: "Page three",
    title: "The future I can see from here.",
    body:
      "When I think about the future, I picture you there—tired, busy, laughing, growing—and me, still choosing you, every single time.",
    quote: "You are the part of my future that feels simple: it’s you, always you.",
  },
];

export function LoveBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const current = pages[pageIndex];

  // Parallax scroll CSS variable
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const y = window.scrollY;
      document.documentElement.style.setProperty("--scrollY", `${y}`);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextPage = () =>
    setPageIndex((prev) => Math.min(prev + 1, pages.length - 1));
  const prevPage = () => setPageIndex((prev) => Math.max(prev - 1, 0));

  const handleSecretClick = () => {
    if (typeof window !== "undefined") {
      window.open("/secret", "_blank");
    }
  };

  return (
    <div className="parallax-page">
      {/* Soft greenery layers */}
      <div className="parallax-layer parallax-layer-back" aria-hidden="true" />
      <div className="parallax-layer parallax-layer-front" aria-hidden="true" />

      <main className="parallax-content">
        <div className="love-layout">
          {/* LEFT SIDE – story only */}
          <div>
            <div className="badge-soft">
              <span className="badge-dot" />
              A tiny corner of the internet just for you
            </div>

            <h1 className="love-title">
              For you, from me,
              <br />
              saved on this very random little URL.
            </h1>

            <p className="love-subtitle">
              Not a big letter. Just a small place you can open whenever you
              need a reminder that someone out here is very, very in love with
              you.
            </p>

            <div className="pill-row">
              <span className="pill">Built with too much love</span>
              <span className="pill">Best viewed in sweatpants</span>
              <span className="pill">Contains high levels of you</span>
            </div>

            {/* Page card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.label}
                className="love-page-card"
                style={{ marginTop: 24 }}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <div className="love-page-label">{current.label}</div>
                <div className="love-page-title">{current.title}</div>
                <p className="love-page-body">{current.body}</p>

                <p className="soft-quote">“{current.quote}”</p>

                <div className="love-page-corner">
                  <span className="love-page-number">
                    {pageIndex + 1}/{pages.length}
                  </span>{" "}
                  · Tiny chapter in our story
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom nav */}
            <div className="pagination-row">
              <button
                type="button"
                className="button-ghost nav-pill nav-pill-left"
                onClick={prevPage}
                disabled={pageIndex === 0}
              >
                ← Previous
              </button>

              <div className="pagination-meta">
                {pageIndex + 1} of {pages.length} ·{" "}
                {pageIndex + 1 === 1
                  ? "The beginning."
                  : pageIndex + 1 === pages.length
                  ? "Soft little ending (for now)."
                  : "Somewhere in the middle—like us, still writing."}
              </div>

              <button
                type="button"
                className="button-ghost nav-pill nav-pill-right"
                onClick={nextPage}
                disabled={pageIndex === pages.length - 1}
              >
                Next →
              </button>
            </div>

            <div className="side-note">
              💌 You can always add more pages later with new memories,
              anniversaries, or tiny rants I adore.
            </div>

            {/* Secret glowing "do not click" button */}
            <div className="dont-click-wrap">
              <button
                type="button"
                className="dont-click-button"
                onClick={handleSecretClick}
              >
                <span>Do not click here</span>
                <span className="dont-click-emoji" aria-hidden>
                  ✨
                </span>
              </button>
              <p className="dont-click-caption">
                Definitely not where I’d ever hide a little video or voice note
                just for you.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE – memories column */}
          <div>
            <Carousel />
            <ImportantDates />
            <SomedayList />
          </div>
        </div>
      </main>
    </div>
  );
}
