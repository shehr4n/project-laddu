"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const slides = [
    { label: "Seconds", value: totalSeconds },
    { label: "Minutes", value: totalMinutes },
    { label: "Hours", value: totalHours },
    { label: "Days", value: totalDays },
    { label: "Months", value: totalMonths },
    { label: "Years", value: totalYears },
  ];

  const [current, setCurrent] = useState(0);
  const prevLabel = slides[(current - 1 + slides.length) % slides.length].label;
  const nextLabel = slides[(current + 1) % slides.length].label;

  return (
    <div className="letter-theme time-page">
      <div className="time-center">
        <div className="time-stack time-zoom">
          <div className="time-label">
            Since June 23, 2025 2:30 AM, we&apos;ve been together for...
          </div>
          <Carousel
            className="time-carousel"
            opts={{ align: "center", loop: true }}
            setApi={(api) => {
            if (!api) return;
            const update = () => setCurrent(api.selectedScrollSnap());
            update();
            api.on("select", update);
            api.on("reInit", update);
          }}>
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.label} className="time-item">
                  <div className="time-slide">
                    {slide.label === "Seconds" ? (
                      <div className="time-value" aria-live="polite">
                        <span className="time-number">
                          {slide.value.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="time-unit">seconds</span>
                      </div>
                    ) : (
                      <div className="time-value" aria-live="polite">
                        {slide.value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        {slide.label.toLowerCase()}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="time-preview time-preview-left">{prevLabel}</div>
            <div className="time-preview time-preview-right">{nextLabel}</div>
            <CarouselPrevious className="time-carousel-prev" />
            <CarouselNext className="time-carousel-next" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
