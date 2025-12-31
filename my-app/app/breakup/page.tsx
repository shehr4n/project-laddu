"use client";

import { useEffect, useRef, useState } from "react";

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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [phase, setPhase] = useState<"button" | "countdown" | "done">("button");
  const [countdown, setCountdown] = useState(5);
  const hoverCountRef = useRef(0);
  const [isDodging, setIsDodging] = useState(false);
  const [canDodge, setCanDodge] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const placeButton = (mode: "center" | "random") => {
    const stage = stageRef.current;
    const button = buttonRef.current;
    if (!stage || !button) return;

    const pad = 16;
    const header = document.querySelector("header");
    const headerBottom = header
      ? Math.max(0, header.getBoundingClientRect().bottom - stage.getBoundingClientRect().top)
      : 0;
    const avoidTop = headerBottom + 12;
    const maxLeft = stage.clientWidth - button.offsetWidth - pad;
    const maxTop = stage.clientHeight - button.offsetHeight - pad;
    const minLeft = pad;
    const minTop = Math.max(pad, avoidTop);

    if (mode === "center") {
      const left = clamp(
        (stage.clientWidth - button.offsetWidth) / 2,
        minLeft,
        maxLeft
      );
      const top = clamp(
        (stage.clientHeight - button.offsetHeight) / 2,
        minTop,
        maxTop
      );
      setPosition({ top, left });
      return;
    }

    const left = clamp(
      Math.random() * (maxLeft - minLeft) + minLeft,
      minLeft,
      maxLeft
    );
    const top = clamp(
      Math.random() * (maxTop - minTop) + minTop,
      minTop,
      maxTop
    );
    setPosition({ top, left });
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleHover = () => {
    if (!canDodge || isDodging || hoverCountRef.current >= 6) return;
    setCanDodge(false);
    setIsDodging(true);
    hoverCountRef.current += 1;
    setHoverCount(hoverCountRef.current);
    placeButton("random");
    window.setTimeout(() => {
      setIsDodging(false);
      setCanDodge(true);
    }, 180);
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

  useEffect(() => {
    if (phase !== "button") return;
    hoverCountRef.current = 0;
    setHoverCount(0);
    setCanDodge(true);
    setIsDodging(false);
    placeButton("center");
    const handleResize = () => placeButton("center");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [phase]);

  return (
    <div className="letter-theme breakup-page">
      {phase === "button" && (
        <div className="breakup-stage" ref={stageRef}>
          <Button
            variant="outline"
            className="breakup-button"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onClick={handleClick}
            onPointerEnter={handleHover}
            ref={buttonRef}
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
          <img src="images.jpeg" alt="Breakup" className="breakup-image" />
          <div className="breakup-caption">sry no breakupz</div>
        </div>
      )}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently break you up with Mr. Parrot Salam.
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
