"use client";

import { useEffect, useState } from "react";

type CountdownGateProps = {
  onUnlock: () => void;
};

const PENALTY_STORAGE_KEY = "love-letter-penalty-minutes";

export function CountdownGate({ onUnlock }: CountdownGateProps) {
  const targetDate = new Date("December 7, 2025 22:00:00 GMT-0700"); // MST 10PM

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [penaltyMinutes, setPenaltyMinutes] = useState(0);

  // 🔹 1) On mount, restore saved penalty minutes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(PENALTY_STORAGE_KEY);
    if (!stored) return;

    const parsed = parseInt(stored, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setPenaltyMinutes(parsed);
    }
  }, []);

  // 🔹 2) Save penalty minutes whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(PENALTY_STORAGE_KEY, String(penaltyMinutes));
  }, [penaltyMinutes]);

  // 🔹 3) Your existing countdown logic, unchanged
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const adjustedTarget = new Date(
        targetDate.getTime() + penaltyMinutes * 60000
      );

      const diff = adjustedTarget.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(PENALTY_STORAGE_KEY);
        }
        onUnlock();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [penaltyMinutes, onUnlock]);

  // 🔹 4) Button: still adds +5 mins, but now it also persists
  const handlePenalty = () => {
    setPenaltyMinutes((prev) => prev + 5);
  };

  return (
    <div className="countdown-center-wrapper">
      <div className="countdown-wrapper">
        <h1 className="love-title">⏳ Not Yet...</h1>
        <p className="countdown-sub">
          Your letter unlocks on <strong>Sunday, December 7 @ 10PM MST</strong>
        </p>

        <div className="timer-box">
          <div className="time-seg">
            <span className="time-num">{timeLeft.days}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-seg">
            <span className="time-num">{timeLeft.hours}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-seg">
            <span className="time-num">{timeLeft.minutes}</span>
            <span className="time-label">Minutes</span>
          </div>
          <div className="time-seg">
            <span className="time-num">{timeLeft.seconds}</span>
            <span className="time-label">Seconds</span>
          </div>
        </div>

        <button className="button-ghost" onClick={handlePenalty}>
          I’m impatient 😭 (adds +5 mins)
        </button>
        <p className="impatient-note">I love you more!</p>
      </div>
    </div>
  );
  
}