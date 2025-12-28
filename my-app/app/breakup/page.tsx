"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BreakupPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [position, setPosition] = useState({ top: "45%", left: "50%" });
  const [phase, setPhase] = useState<"button" | "countdown" | "done">("button");
  const [countdown, setCountdown] = useState(5);

  const moveRandomly = () => {
    const pad = 12;
    const top = Math.floor(Math.random() * (100 - pad * 2) + pad);
    const left = Math.floor(Math.random() * (100 - pad * 2) + pad);
    setPosition({ top: `${top}%`, left: `${left}%` });
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleHover = () => {
    if (hoverCount >= 5) return;
    setHoverCount((count) => count + 1);
    moveRandomly();
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setPhase("countdown");
    setCountdown(5);
  };

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 1) {
      const timer = window.setTimeout(() => {
        setPhase("done");
      }, 1000);
      return () => window.clearTimeout(timer);
    }

    const intervalId = window.setInterval(() => {
      setCountdown((value) => Math.max(1, value - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [phase, countdown]);

  return (
    <div className="letter-theme breakup-page">
      {phase === "button" && (
        <div className="breakup-stage">
          <Button
            variant="outline"
            className="breakup-button"
            style={{ top: position.top, left: position.left }}
            onClick={handleClick}
            onMouseEnter={handleHover}
            onPointerEnter={handleHover}
          >
            Breakup
          </Button>
        </div>
      )}

      {phase === "countdown" && (
        <div className="breakup-countdown">
          <div className="breakup-count-label">
            Breakup Commencing in:
          </div>
          <div className="breakup-count">{countdown}</div>
        </div>
      )}

      {phase === "done" && (
        <div className="breakup-result">
          <div className="breakup-image" aria-label="Placeholder image" />
          <div className="breakup-caption">ur breakup request has been rejected lol</div>
        </div>
      )}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently break you up with Shehran Salam.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
