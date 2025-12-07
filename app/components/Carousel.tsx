"use client";

import { useState } from "react";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  link?: string; // optional MP4 path
};

const slides: Slide[] = [
  {
    src: "/together.jpg",
    alt: "Us, together",
    caption: "Still my favorite place: right beside you.",
  },
  {
    src: "/Engaged.jpg",
    alt: "Engagement moment",
    caption: "The exact second the world slowed down and it was just us.",
  },
  {
    src: "/Kneel.png", // make sure this file is in /public
    alt: "A moving memory",
    caption: "There’s sound, movement, and laughter in this one. Tap to play.",
    link: "/DJI_20250214234326_0304_D.MP4",
  },
];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(false); // only used for video slide

  const current = slides[index];

  const next = () => {
    setPlay(false);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setPlay(false);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const canPlayVideo = Boolean(current.link);

  return (
    <div className="carousel-shell">
      <div className="carousel-media">
        {/* If this slide has a video + we've tapped play, show video inline */}
        {canPlayVideo && play ? (
          <video
            src={current.link}
            controls
            autoPlay
            className="carousel-image"
          />
        ) : (
          <>
            <img
              src={current.src}
              alt={current.alt}
              className="carousel-image"
              onClick={() => {
                if (canPlayVideo) setPlay(true);
              }}
              style={{ cursor: canPlayVideo ? "pointer" : "default" }}
            />

            {/* Play button overlay only for the video slide before playing */}
            {canPlayVideo && !play && (
              <button
                type="button"
                className="carousel-play-overlay"
                onClick={() => setPlay(true)}
              >
                <span className="carousel-play-circle">▶</span>
              </button>
            )}
          </>
        )}
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
    </div>
  );
}
