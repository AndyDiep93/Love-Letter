"use client";

import { useEffect, useState } from "react";

type CountdownGateProps = {
  onUnlock: () => void;
  seconds?: number;
};

const IMPATIENT_MESSAGES = [
  "I see you. Same energy as checking the oven every 2 minutes.",
  "It’s coming, I promise. Good things, small load times.",
  "Okay but waiting together is kinda cute, no?",
  "You’re allowed to be impatient. I still adore you.",
];

export function CountdownGate({ onUnlock, seconds = 15 }: CountdownGateProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [impatientIndex, setImpatientIndex] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  const formatted = `00:${String(Math.max(remaining, 0)).padStart(2, "0")}`;
  const impatientMessage = IMPATIENT_MESSAGES[impatientIndex];

  const handleOpen = () => {
    if (remaining <= 0) onUnlock();
  };

<<<<<<< HEAD
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [penaltyMinutes, onUnlock]);

  const handlePenalty = () => {
    setPenaltyMinutes(prev => prev + 5);
=======
  const handleImpatient = () => {
    setImpatientIndex((prev) => (prev + 1) % IMPATIENT_MESSAGES.length);
>>>>>>> parent of 5202a58 (Added more love notes)
  };

  return (
    <div className="countdown-wrapper">
      <div className="badge-soft">
        <span className="badge-dot" />
        For your eyes only
      </div>

      <h1 className="love-title countdown-title">
        This page is quietly getting ready for you.
      </h1>

      <p className="countdown-sub">
        When the countdown reaches zero, your little corner of the internet
        opens up—just for you, just this moment. You can skip if you like, but
        there&apos;s something cute about waiting together.
      </p>

      <div className="countdown-center">
        {/* Circle timer */}
        <div className="countdown-ring">
          <div className="countdown-inner">
            <div className="countdown-number">{formatted}</div>
            <div className="countdown-label">Time until unlock</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="countdown-actions">
          <button
            type="button"
            className="button-solid"
            onClick={handleOpen}
            disabled={remaining > 0}
          >
            {remaining > 0 ? "Still loading feelings ⏳" : "Open the letter 💌"}
          </button>

          <button
            type="button"
            className="button-ghost"
            onClick={handleImpatient}
          >
            I&apos;m impatient 👀
          </button>
        </div>

        <p className="impatient-note">{impatientMessage}</p>

        <p className="subtle-caption">
          Real talk: you can only actually open it once the timer hits zero.
        </p>
      </div>
    </div>
<<<<<<< HEAD

    <button className="button-ghost" onClick={handlePenalty}>
      I’m impatient 😭
    </button>
    <p className="impatient-note">This will delay the unlock time by 5 minutes 👀</p>

  </div>
</div>

=======
>>>>>>> parent of 5202a58 (Added more love notes)
  );
}
