"use client";

import { useEffect, useState } from "react";

const START_DATE = new Date(2025, 5, 23, 2, 30, 0);

export default function TimePage() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const update = () => {
      const diffMs = Date.now() - START_DATE.getTime();
      setElapsedMs(Math.max(0, diffMs));
    };

    update();
    const intervalId = window.setInterval(update, 50);
    return () => window.clearInterval(intervalId);
  }, []);

  const totalSeconds = elapsedMs / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;
  const totalMonths = totalDays / 30;
  const totalYears = totalDays / 365;

  return (
    <div className="letter-theme time-page">
      <div className="time-center">
        <div className="time-stack">
          <div className="time-label">
            Since June 23, 2025 2:30 AM, we&apos;ve been together for...
          </div>
          <div className="time-value" aria-live="polite">
            {totalSeconds.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            seconds
          </div>
          <div className="time-or">or</div>
          <div className="time-value">
            {totalMinutes.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            minutes
          </div>
          <div className="time-or">or</div>
          <div className="time-value">
            {totalHours.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            hours
          </div>
          <div className="time-or">or</div>
          <div className="time-value">
            {totalDays.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            days
          </div>
          <div className="time-or">or</div>
          <div className="time-value">
            {totalMonths.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            months
          </div>
          <div className="time-or">or</div>
          <div className="time-value">
            {totalYears.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            years
          </div>
        </div>
      </div>
    </div>
  );
}
