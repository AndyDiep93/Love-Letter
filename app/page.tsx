"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { CountdownGate } from "./components/CountdownGate";
import { LoveBook } from "./components/LoveBook";

export default function HomePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  // Get window size for confetti
  useEffect(() => {
    if (typeof window === "undefined") return;

    
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    setShowConfetti(true);
    // Stop confetti after a few seconds
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <main className="main-root">
      {showConfetti && (
        <Confetti
          width={viewport.width}
          height={viewport.height}
          numberOfPieces={220}
          recycle={false}
        />
      )}

      <div className="card-shell">
         {/* <LoveBook /> */}
        {unlocked ? (
          <LoveBook />
        ) : (
          <CountdownGate onUnlock={handleUnlock} />
        )}
      </div>
    </main>
  );
}
