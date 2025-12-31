"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const START_DATE = new Date(2025, 5, 23, 2, 30, 0);
const COUNTDOWN_TARGET = new Date(2026, 5, 2, 0, 0, 0);
const YEAR_END_TARGET = new Date(2026, 0, 19, 12, 30, 0);

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
  const remainingMs = Math.max(0, COUNTDOWN_TARGET.getTime() - Date.now());
  const remainingSeconds = remainingMs / 1000;
  const remainingMinutes = remainingSeconds / 60;
  const remainingHours = remainingMinutes / 60;
  const remainingDays = remainingHours / 24;
  const remainingMonths = remainingDays / 30;
  const remainingYears = remainingDays / 365;
  const yearEndMs = Math.max(0, YEAR_END_TARGET.getTime() - Date.now());
  const yearEndSeconds = yearEndMs / 1000;
  const yearEndMinutes = yearEndSeconds / 60;
  const yearEndHours = yearEndMinutes / 60;
  const yearEndDays = yearEndHours / 24;
  const yearEndMonths = yearEndDays / 30;
  const yearEndYears = yearEndDays / 365;
  const countdownSlides = [
    { label: "Seconds", value: remainingSeconds },
    { label: "Minutes", value: remainingMinutes },
    { label: "Hours", value: remainingHours },
    { label: "Days", value: remainingDays },
    { label: "Months", value: remainingMonths },
    { label: "Years", value: remainingYears },
  ];
  const yearEndSlides = [
    { label: "Seconds", value: yearEndSeconds },
    { label: "Minutes", value: yearEndMinutes },
    { label: "Hours", value: yearEndHours },
    { label: "Days", value: yearEndDays },
    { label: "Months", value: yearEndMonths },
    { label: "Years", value: yearEndYears },
  ];
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
  const [countdownCurrent, setCountdownCurrent] = useState(0);
  const countdownPrevLabel =
    countdownSlides[
      (countdownCurrent - 1 + countdownSlides.length) %
        countdownSlides.length
    ].label;
  const countdownNextLabel =
    countdownSlides[(countdownCurrent + 1) % countdownSlides.length].label;
  const [yearEndCurrent, setYearEndCurrent] = useState(0);
  const yearEndPrevLabel =
    yearEndSlides[(yearEndCurrent - 1 + yearEndSlides.length) % yearEndSlides.length]
      .label;
  const yearEndNextLabel =
    yearEndSlides[(yearEndCurrent + 1) % yearEndSlides.length].label;
  const MONTHS_INDEX = slides.findIndex((slide) => slide.label === "Months");
  const YEAR_END_DAYS_INDEX = yearEndSlides.findIndex(
    (slide) => slide.label === "Days"
  );
  const [showYearEnd, setShowYearEnd] = useState(false);

  return (
    <div className="letter-theme time-page">
      <div className="time-center">
        <div className="time-stack time-zoom">
          <div className="time-label">
            Since June 23, 2025 2:30 AM, we&apos;ve been together for...
          </div>
          <Carousel
            className="time-carousel"
            opts={{ align: "center", loop: true, startIndex: MONTHS_INDEX }}
            setApi={(api) => {
              if (!api) return;
              const update = () => setCurrent(api.selectedScrollSnap());
              update();
              api.on("select", update);
              api.on("reInit", update);
            }}
          >
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
          <div className="time-secondary">
            <div className="time-label">Your next birthday, June 2, 2026, 12:00AM will be in...</div>
            <Carousel
              className="time-carousel time-carousel-secondary"
              opts={{ align: "center", loop: true }}
              setApi={(api) => {
                if (!api) return;
                const update = () => setCountdownCurrent(api.selectedScrollSnap());
                update();
                api.on("select", update);
                api.on("reInit", update);
              }}
            >
              <CarouselContent>
                {countdownSlides.map((slide) => (
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
              <div className="time-preview time-preview-left">
                {countdownPrevLabel}
              </div>
              <div className="time-preview time-preview-right">
                {countdownNextLabel}
              </div>
              <CarouselPrevious className="time-carousel-prev" />
              <CarouselNext className="time-carousel-next" />
            </Carousel>
          </div>
          <div className="time-secondary time-tertiary">
            <div className="time-label">time left till Jan 19th, 2026 12:30PM</div>
            <div className="time-tertiary-body">
              <Button
                variant="outline"
                className="love-button time-toggle-button"
                onClick={() => setShowYearEnd((value) => !value)}
                aria-label={showYearEnd ? "Hide countdown" : "Show countdown"}
              >
                {showYearEnd ? "Hide" : "Show"}
              </Button>
              {!showYearEnd ? null : yearEndMs <= 0 ? (
                <div className="time-value" aria-live="polite">
                  :(
                </div>
              ) : (
                <Carousel
                  className="time-carousel time-carousel-secondary"
                  opts={{
                      align: "center",
                      loop: true,
                      startIndex: YEAR_END_DAYS_INDEX,
                    }}
                  setApi={(api) => {
                    if (!api) return;
                    const update = () =>
                      setYearEndCurrent(api.selectedScrollSnap());
                    update();
                    api.on("select", update);
                    api.on("reInit", update);
                  }}
                >
                  <CarouselContent>
                    {yearEndSlides.map((slide) => (
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
                  <div className="time-preview time-preview-left">
                    {yearEndPrevLabel}
                  </div>
                  <div className="time-preview time-preview-right">
                    {yearEndNextLabel}
                  </div>
                  <CarouselPrevious className="time-carousel-prev" />
                  <CarouselNext className="time-carousel-next" />
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
