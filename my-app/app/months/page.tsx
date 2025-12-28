"use client";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthsPage() {
  const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.classList.toggle("open");
  };

  const handleKeyToggle = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.classList.toggle("open");
    }
  };

  return (
    <div className="letter-theme">
      <div className="envelope-wrapper">
        <div className="month-grid">
          {months.map((month) => (
            <div className="month-card" key={month}>
              <div
                className="envelope"
                onClick={handleToggle}
                onKeyDown={handleKeyToggle}
                role="button"
                tabIndex={0}
                aria-label={`Open ${month} letter`}
              >
                <div className="front flap"></div>
                <div className="front pocket"></div>
                <div className="letter">
                  <div className="words line1">To: Name</div>
                  <div className="words line2">{month}</div>
                  <div className="words line3">Place holder.</div>
                  <div className="words line4">From: Shehran</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
