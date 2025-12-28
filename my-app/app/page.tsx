import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="letter-theme home">
      <div className="home-center">
        <div className="home-actions">
          <Link
            className={buttonVariants({ variant: "ghost", className: "min-w-48" })}
            href="/time"
          >
            Time
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost", className: "min-w-48" })}
            href="/months"
          >
            Letters
          </Link>
        </div>
      </div>
    </div>
  );
}
