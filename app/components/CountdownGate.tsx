"use client";

import { useEffect, useState } from "react";

type CountdownGateProps = {
  onUnlock: () => void;
};

const PENALTY_STORAGE_KEY = "love-letter-penalty-minutes";
const BONUS_STORAGE_KEY = "love-letter-bonus-minutes"; // can be 0, 60, 120, ...

export function CountdownGate({ onUnlock }: CountdownGateProps) {
  const targetDate = new Date("December 7, 2025 22:00:00 GMT-0700"); // MST 10PM

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // +5 min button
  const [penaltyMinutes, setPenaltyMinutes] = useState(0);
  // -60 min “Andy loves you more” button (can stack)
  const [bonusMinutes, setBonusMinutes] = useState(0);

  // 🔹 1) Restore saved values on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedPenalty = window.localStorage.getItem(PENALTY_STORAGE_KEY);
    const storedBonus = window.localStorage.getItem(BONUS_STORAGE_KEY);

    if (storedPenalty) {
      const parsed = parseInt(storedPenalty, 10);
      if (!Number.isNaN(parsed) && parsed >= 0) {
        setPenaltyMinutes(parsed);
      }
    }

    if (storedBonus) {
      const parsed = parseInt(storedBonus, 10);
      if (!Number.isNaN(parsed) && parsed >= 0) {
        setBonusMinutes(parsed);
      }
    }
  }, []);

  // 🔹 2) Persist whenever either value changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(PENALTY_STORAGE_KEY, String(penaltyMinutes));
    window.localStorage.setItem(BONUS_STORAGE_KEY, String(bonusMinutes));
  }, [penaltyMinutes, bonusMinutes]);

  // 🔹 3) Main countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // penalty adds time, bonus subtracts time
      const offsetMinutes = penaltyMinutes - bonusMinutes;
      const adjustedTarget = new Date(
        targetDate.getTime() + offsetMinutes * 60000
      );

      const diff = adjustedTarget.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(PENALTY_STORAGE_KEY);
          window.localStorage.removeItem(BONUS_STORAGE_KEY);
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
  }, [penaltyMinutes, bonusMinutes, onUnlock]);

  // 🔹 4) Handlers

  const handlePenalty = () => {
    setPenaltyMinutes((prev) => prev + 5);
  };

  const handleBonus = () => {
    // allow clicking as many times as she wants: each click -60 minutes
    setBonusMinutes((prev) => prev + 60);
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

        <div className="countdown-buttons">
          <button className="button-ghost" onClick={handlePenalty}>
            I’m impatient 😭 (adds +5 mins)
          </button>

          <button className="button-ghost" onClick={handleBonus}>
            Reduce the wait by 1 hour… if you freely admit Andy loves you more. 😏❤️
          </button>
        </div>

        <p className="impatient-note">I love you more!</p>
      </div>
    </div>
  );
}
