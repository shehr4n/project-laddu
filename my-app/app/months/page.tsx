"use client";

import { useState } from "react";

const months = [
  { name: "January", message: "Your hair; the way it looks and smells, and the way you tie it or leave it open. I will still one day replace all your hair er jinish with my 7in1 body wash so u can experience real hair care 😎 " },
  { name: "February", message: "Your smile, it suits your pretty face so so much, you have the sweetest smile I have ever seen. I will do anything just to see it😋" },
  { name: "March", message: "Your hands, eto soft and squishy. I love to hold them tight, including mickey and chittir shob scratches.(ador kore dibo ami shob gula😘)" },
  { name: "April", message: "Your eyes, tumi amar dike takay thakle amar onek beshi lojja lage. I can barely stare back; they're so pretty. Tumi ektu onno dike takayo so I can stare at you beshorom er moto 😏" },
  { name: "May", message: "Your voice, ami pura din tomar kotha shunte parbo, shob mone rakhbo naki na no guarantees 😙. I'm sorry ami eto kotha bhule jai, ami asholei ekta diary kine okhane shob likhe rakhbo" },
  { name: "June", message: "I love how nerdy you are, tumi eto beshi smarty ekta. Pura din shudhu porashona koro 🤓. Maybe we should go on a study date sometime (no studying will be done that day (jk asholei poiro tumi) )" },
  { name: "July", message: "I love how sweet and considerate you are. Ami jani tumi amar jonno onek jhamela kore phone e kotha bolo and baire jao. I'm sorry tomake amar jonno eto mittha kotha bolte hoy tomar maa ke 😬" },
  { name: "August", message: "Your facial expressions, koto cutie lage tomake jokhon tumi raag hoye jao 😂. Tarpor ami flirt korle tumi eto lojja pao ekdom erokom lage tomake dekhte -> ☺️. Pretty ahh gurl" },
  { name: "September", message: "I love you. I love everything and anything about you. I never thought I'd become so fond of a person over such a short period of time. Thank you for existing, u goated fr 💚💚💚 " },
  /*{ name: "October", message: "October message..." },
  { name: "November", message: "November message..." },
  { name: "December", message: "December message..." },*/
];

export default function MonthsPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.classList.toggle("open");
  };

  const handleKeyToggle = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.classList.toggle("open");
    }
  };

  const handleUnlock = () => {
    if (password.trim() === "laddu123") {
      setIsUnlocked(true);
      setError("");
      return;
    }
    setError("bro that's incorrect >:(");
  };

  const handlePasswordKey: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="letter-theme months-page">
      {!isUnlocked ? (
        <div className="months-lockscreen">
          <div className="months-lock-card">
            <div className="months-lock-title">Enter the secret password</div>
            <div className="months-lock-subtitle">
              
            </div>
            <div className="months-lock-row">
              <input
                className="months-lock-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={handlePasswordKey}
                aria-label="Password"
              />
              <button
                className="months-lock-button"
                type="button"
                onClick={handleUnlock}
              >
                Unlock
              </button>
            </div>
            {error ? <div className="months-lock-error">{error}</div> : null}
          </div>
        </div>
      ) : (
        <>
          <div className="months-page-subtitle">9 Things I Love about you</div>
          <div className="envelope-wrapper">
            <div className="month-grid month-grid-3">
              {months.map((month) => (
                <div className="month-card" key={month.name}>
                  <div
                    className="envelope"
                    onClick={handleToggle}
                    onKeyDown={handleKeyToggle}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${month.name} letter`}
                  >
                    <div className="front flap"></div>
                    <div className="front pocket"></div>
                    <div className="letter">
                      <div className="words line1">{month.message}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
