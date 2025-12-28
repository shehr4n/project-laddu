import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="letter-theme home">
      <div className="home-center">
        <div className="home-actions">
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "home-big-button text-[180%] tracking-[0.2em]",
            })}
            href="/time"
          >
            Time
          </Link>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "home-big-button text-[180%] tracking-[0.2em]",
            })}
            href="/months"
          >
            Letters
          </Link>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "home-big-button text-[180%] tracking-[0.2em]",
            })}
            href="/love-calculator"
          >
            <span className="home-button-line">Love</span>
            <span className="home-button-line">Calculator</span>
          </Link>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "home-big-button text-[180%] tracking-[0.2em]",
            })}
            href="/breakup"
          >
            <span className="home-button-line">So you</span>
            <span className="home-button-line">hate me...</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
