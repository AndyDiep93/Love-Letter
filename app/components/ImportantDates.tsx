"use client";

type ImportantDate = {
  emoji: string;
  label: string;
  date: string;
  note: string;
};


const importantDates: ImportantDate[] = [
  {
    emoji: "🌱",
    label: "First date",
    date: "Jul 23, 2021",
    note: "Having Korean food with you and getting bubbletea, me pretending I wasn’t nervous at all.",
  },
  {
    emoji: "💍",
    label: "Engagement",
    date: "Feb 14, 2025",
    note: "Somehow the easiest “yes” and the hardest my heart has ever raced.",
  },
  {
    emoji: "🏡",
    label: "Our home era",
    date: "Soon",
    note: "Coffee/Hot Cocoa, soft clothes, plants everywhere, and you.",
  },
  {
    emoji: "✈️",
    label: "Next adventure",
    date: "TBD",
    note: "Wherever we go next, I just want it to be with you.",
  },
];

export function ImportantDates() {
  return (
    <div className="dates-row">
      {importantDates.map((d) => (
        <div key={d.label} className="date-card">
          <div className="date-top">
            <span className="date-emoji" aria-hidden>
              {d.emoji}
            </span>
            <div>
              <div className="date-label">{d.label}</div>
              <div className="date-date">{d.date}</div>
            </div>
          </div>
          <div className="date-note">{d.note}</div>
        </div>
      ))}
    </div>
  );
}
