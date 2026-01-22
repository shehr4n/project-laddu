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

const START_DATE = new Date(2025, 5, 22, 14, 30, 0);
const COUNTDOWN_TARGET = new Date(2026, 5, 2, 0, 0, 0);
const YEAR_END_TARGET = new Date(2026, 0, 19, 12, 30, 0);
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

function addMonthsSafe(date: Date, monthsToAdd: number) {
  const year = date.getFullYear();
  const month = date.getMonth() + monthsToAdd;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = date.getMilliseconds();
  const target = new Date(year, month, 1, hours, minutes, seconds, ms);
  const daysInTargetMonth = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0
  ).getDate();
  target.setDate(Math.min(day, daysInTargetMonth));
  return target;
}

function getCalendarTotals(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  if (toTime <= fromTime) {
    return { months: 0, years: 0 };
  }

  let totalMonths =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  let anchor = addMonthsSafe(from, totalMonths);
  while (anchor.getTime() > toTime) {
    totalMonths -= 1;
    anchor = addMonthsSafe(from, totalMonths);
  }

  const nextAnchor = addMonthsSafe(anchor, 1);
  const monthMs = nextAnchor.getTime() - anchor.getTime();
  const remainderMs = toTime - anchor.getTime();
  const monthFraction = monthMs > 0 ? remainderMs / monthMs : 0;
  const months = totalMonths + monthFraction;
  return { months, years: months / 12 };
}

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

  const nowMs = Date.now();
  const now = new Date(nowMs);
  const totalSeconds = elapsedMs / MS_PER_SECOND;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = elapsedMs / MS_PER_DAY;
  const elapsedCalendar = getCalendarTotals(START_DATE, now);
  const totalMonths = elapsedCalendar.months;
  const totalYears = elapsedCalendar.years;
  const remainingMs = Math.max(0, COUNTDOWN_TARGET.getTime() - nowMs);
  const remainingSeconds = remainingMs / MS_PER_SECOND;
  const remainingMinutes = remainingSeconds / 60;
  const remainingHours = remainingMinutes / 60;
  const remainingDays = remainingMs / MS_PER_DAY;
  const remainingCalendar = getCalendarTotals(now, COUNTDOWN_TARGET);
  const remainingMonths = remainingCalendar.months;
  const remainingYears = remainingCalendar.years;
  const yearEndMs = Math.max(0, YEAR_END_TARGET.getTime() - nowMs);
  const yearEndSeconds = yearEndMs / MS_PER_SECOND;
  const yearEndMinutes = yearEndSeconds / 60;
  const yearEndHours = yearEndMinutes / 60;
  const yearEndDays = yearEndMs / MS_PER_DAY;
  const yearEndCalendar = getCalendarTotals(now, YEAR_END_TARGET);
  const yearEndMonths = yearEndCalendar.months;
  const yearEndYears = yearEndCalendar.years;
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
