"use client";

import { useEffect, useState } from "react";
import { Check, RefreshCcw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export default function LoveCalculatorPage() {
  const [sujanaPresses, setSujanaPresses] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSujanaClick = () => {
    setSujanaPresses((count) => Math.min(count + 1, 3));
  };

  const isSujanaFalling = sujanaPresses >= 3;

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleShehranClick = () => {
    if (showChart || isLoading) return;
    setIsLoading(true);
    setProgress(0);
  };

  useEffect(() => {
    if (!isLoading) return;

    const start = Date.now();
    const duration = 3000;
    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(intervalId);
        setIsLoading(false);
        setShowChart(true);
      }
    }, 50);

    return () => window.clearInterval(intervalId);
  }, [isLoading]);

  const chartData = [
    { month: "Jun", shehran: 82, sujana: 20 },
    { month: "Jul", shehran: 88, sujana: 25 },
    { month: "Aug", shehran: 90, sujana: 30 },
    { month: "Sep", shehran: 95, sujana: 25 },
    { month: "Oct", shehran: 95, sujana: 15 },
    { month: "Nov", shehran: 97, sujana: 12 },
    { month: "Dec", shehran: 100, sujana: 10 }
    
  ];

  const chartConfig = {
    shehran: {
      label: "Shehran",
      color: "#ff8aa5",
    },
    sujana: {
      label: "Sujana",
      color: "#ffc1d0",
    },
  } satisfies ChartConfig;

  return (
    <div className="letter-theme love-calculator-page">
      <div className="home-center">
        <div className="love-stack love-zoom love-compact">
          <h1 className="home-header">Who loves their partner more?</h1>
          <div className={`love-actions${isSujanaFalling ? " love-shift" : ""}`}>
            <Button
              variant="outline"
              className={`love-button${isSujanaFalling ? " love-fall" : ""}`}
              onClick={handleSujanaClick}
              disabled={isSujanaFalling}
            >
              Sujana
            </Button>
            <Button
              variant="outline"
              className={`love-button love-shehran${
                showChart ? " love-selected" : ""
              }`}
              onClick={handleShehranClick}
            >
              Shehran {showChart && <Check className="love-check" />}
            </Button>
          </div>
          {isLoading && (
            <div className="love-loader">
              <div className="love-loader-label">Calculating Love Levels...</div>
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="love-slider"
                aria-label="Loading"
              />
            </div>
          )}
          {showChart && (
            <div className="love-chart">
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <BarChart data={chartData} margin={{ left: 12, right: 12 }} barCategoryGap="0%" barGap={2}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}

                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    label={{
                      value: "Love",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="shehran" fill="var(--color-shehran)" radius={[6, 6, 0, 0]} barSize={16} />
                  <Bar dataKey="sujana" fill="var(--color-sujana)" radius={[6, 6, 0, 0]} barSize={16} />
                </BarChart>
              </ChartContainer>
              <div className="love-source-inline">Source: trust me bro</div>
            </div>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="love-refresh"
        aria-label="Refresh calculator"
        onClick={handleRefresh}
      >
        <RefreshCcw />
      </Button>
    </div>
  );
}
