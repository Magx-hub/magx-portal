
// # src/components/WeekSelector.jsx
import React from "react";

export default function WeekSelector({ week, setWeek }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm">Select week</label>
      <input
        type="number"
        min="1"
        max="16"
        value={week}
        onChange={(e) => setWeek(Number(e.target.value))}
        className="w-20 border rounded px-2 py-1"
      />
    </div>
  );
}