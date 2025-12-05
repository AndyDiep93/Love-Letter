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

// A bigger pile of tiny love notes for the fun strip ✨
const tinyNotes: string[] = [
  "Today’s reason I love you: your laugh when you’re trying not to laugh.",
  "If you were a notification, you’d be the only one I never mute.",
  "Somehow you make even grocery runs feel like a date.",
  "You’re my favorite view, even on days with no sunsets.",
  "I still get a little excited when your name pops up on my phone.",
  "You make ordinary days feel like tiny holidays.",
  "You’re the person I want to tell every dumb little thing to.",
  "My favorite part of the day is when I realize I get to tell you about it.",
  "You’re the ‘we got this’ voice in the back of my mind.",
  "You make tired nights feel softer just by being there.",
  "You’re my favorite person to do absolutely nothing with.",
  "I love how safe it feels to just be myself around you.",
  "You’re the kind of person I want to grow old and weird with.",
  "I love the way your eyes do that little sparkle when you’re excited.",
  "You make even my overthinking feel a little less loud.",
  "You’re my home base, no matter where we actually are.",
  "I love that we can be serious, stupid, and soft—all in one conversation.",
  "You turn small moments into core memories without even trying.",
  "I still get butterflies when you look at me like I’m your person.",
  "You’re my favorite ‘are you still awake?’ text.",
  "You make my world feel less like chaos and more like a story.",
  "You’re the plot twist my life didn’t know it needed.",
  "Life feels less scary knowing I get to do it next to you.",
  "I love how you care about the people you love. It’s one of my favorite things.",
  "You’re my favorite coincidence and my favorite decision.",
  "You make my future feel less like a question mark and more like a cozy house with plants.",
  "I love the way you say my name. It always sounds a little like home.",
  "You are my comfort person, my crush, and my best friend all at once.",
  "If I had to pick one good thing about today, it would still be you.",
  "You’re proof that the universe occasionally gets things very, very right.",
];

export function LoveBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);

  const current = pages[pageIndex];

  // Pick a “note of the day” so it feels intentional, not random noise
  useEffect(() => {
    const today = new Date();
    const seed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const idx = seed % tinyNotes.length;
    setNoteIndex(idx);
  }, []);

  const currentTinyNote = tinyNotes[noteIndex];

  const nextPage = () =>
    setPageIndex((prev) => Math.min(prev + 1, pages.length - 1));
  const prevPage = () => setPageIndex((prev) => Math.max(prev - 1, 0));

  const handleAnotherNote = () => {
    setNoteIndex((prev) => (prev + 1) % tinyNotes.length);
  };

  const handleSecretClick = () => {
    if (typeof window !== "undefined") {
      window.open("/secret", "_blank");
    }
  };

  return (
    <div className="love-layout">
      {/* LEFT SIDE */}
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
          Not a grand speech. Just a small place you can open whenever you need
          a reminder that someone out here is very, very in love with you.
        </p>

        <div className="pill-row">
          <span className="pill">Built with too much love</span>
          <span className="pill">Best viewed in sweatpants</span>
          <span className="pill">Contains high levels of you</span>
        </div>

        {/* DAILY NOTE STRIP */}
        <div className="fun-strip">
          <motion.div
            className="tiny-note-card"
            key={currentTinyNote}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="tiny-note-label">Today’s tiny note</div>
            <p className="tiny-note-text">{currentTinyNote}</p>
            <button
              type="button"
              className="button-ghost tiny-note-button"
              onClick={handleAnotherNote}
            >
              Another one ↺
            </button>
          </motion.div>

          <motion.div
            className="tiny-character"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="tiny-emoji" aria-hidden>
              🌿
            </div>
            <div className="tiny-character-caption">
              Nature soft mode activated.
            </div>
          </motion.div>
        </div>

        {/* Page card with animation */}
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

        {/* Important Dates */}
        <ImportantDates />

        {/* BOTTOM NAV */}
        <div className="pagination-row">
          <button
            type="button"
            className="button-ghost nav-pill nav-pill-left"
            onClick={prevPage}
            disabled={pageIndex === 0}
          >
            ← Previous page
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
            Next page →
          </button>
        </div>

        <div className="side-note">
          💌 You can always add more pages later with new memories, anniversaries,
          or tiny rants I adore.
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
            Definitely not where I’d ever hide a little video or voice note just
            for you.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <Carousel />
        <SomedayList />
      </div>
    </div>
  );
}
