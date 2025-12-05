"use client";

import { useEffect, useState } from "react";

type CountdownGateProps = {
  onUnlock: () => void;
};

export function CountdownGate({ onUnlock }: CountdownGateProps) {
  const targetDate = new Date("December 7, 2025 22:00:00 GMT-0700"); // MST 10PM

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [penaltyMinutes, setPenaltyMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const adjustedTarget = new Date(targetDate.getTime() + penaltyMinutes * 60000);

      const diff = adjustedTarget.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
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

  const handlePenalty = () => {
    setPenaltyMinutes(prev => prev + 5);
  };

  return (
    <div className="countdown-center-wrapper">
  <div className="countdown-wrapper">

    <h1 className="love-title">⏳ Not Yet...</h1>
    <p className="countdown-sub">
      Your letter unlocks on <strong>Sunday, December 7 @ 10PM MST</strong>
    </p>

    <div className="timer-box">
      <div className="time-seg"><span className="time-num">{timeLeft.days}</span><span className="time-label">Days</span></div>
      <div className="time-seg"><span className="time-num">{timeLeft.hours}</span><span className="time-label">Hours</span></div>
      <div className="time-seg"><span className="time-num">{timeLeft.minutes}</span><span className="time-label">Minutes</span></div>
      <div className="time-seg"><span className="time-num">{timeLeft.seconds}</span><span className="time-label">Seconds</span></div>
    </div>

    <button className="button-ghost" onClick={handlePenalty}>
      I’m impatient 😭 (adds +5 mins)
    </button>
    <p className="impatient-note">I love you more!</p>

  </div>
</div>

  );
}
