"use client";

type SomedayItem = {
  label: string;
  detail?: string;
  done?: boolean;
};

const somedayItems: SomedayItem[] = [
  {
    label: "Watch a sunrise somewhere ridiculously pretty.",
    detail: "Warm drinks, sleepy faces, no alarms.",
  },
  {
    label: "Have a weekend with no plans and no guilt.",
    detail: "Phones on airplane mode, just us and whatever we feel like.",
    done: true,
  },
  {
    label: "Take a trip that’s planned entirely around food.",
    detail: "Breakfast spots, late dinners, dessert detours.",
  },
  {
    label: "Grow way too many plants in our place.",
    detail: "You name them, I overwater them.",
  },
];

export function SomedayList() {
  return (
    <div className="someday-shell">
      <div className="someday-title">Someday (or soon) with you</div>
      <ul className="someday-list">
        {somedayItems.map((item) => (
          <li
            key={item.label}
            className={`someday-item ${item.done ? "done" : ""}`}
          >
            <div className="someday-icon">
              {item.done ? "✓" : ""}
            </div>
            <div>
              <div>{item.label}</div>
              {item.detail && (
                <div className="someday-detail">{item.detail}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
