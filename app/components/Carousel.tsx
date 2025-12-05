"use client";

import { useState } from "react";

type Slide = {
  src: string;
  alt: string;
  caption: string;
};

const slides: Slide[] = [
  {
    src: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    alt: "Mountain landscape at sunset",
    caption: "The kind of quiet place I picture us walking through.",
  },
  {
    src: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
    alt: "Forest and river",
    caption: "The big views I want to share with you one day.",
  },
  {
    src: "https://images.pexels.com/photos/104827/couple-kiss-sunset-silhouette-104827.jpeg",
    alt: "Couple at sunset",
    caption: "Just us, somewhere pretty, doing absolutely nothing important.",
  },
];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="carousel-shell">
      <div className="carousel-media">
        <img src={current.src} alt={current.alt} className="carousel-image" />
      </div>
      <p className="carousel-caption">{current.caption}</p>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "dot-active" : ""}`}
          />
        ))}
      </div>

      <div className="carousel-nav">
        <button type="button" className="button-ghost" onClick={prev}>
          ← Previous
        </button>
        <button type="button" className="button-ghost" onClick={next}>
          Next →
        </button>
      </div>

      <p className="carousel-footnote">
        You can replace these with your own photos or clips later.
      </p>
    </div>
  );
}
