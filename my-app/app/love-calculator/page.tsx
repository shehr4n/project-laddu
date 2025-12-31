"use client";

import { useEffect, useState } from "react";
import { Check, RefreshCcw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from "recharts";

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
    setSujanaPresses((count) => Math.min(count + 1, 2));
  };

  const isSujanaFalling = sujanaPresses >= 2;

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
    { month: "Jun", shehran: 100, sujana: 0 },
    { month: "Jul", shehran: 100, sujana: 0 },
    { month: "Aug", shehran: 100, sujana: 0 },
    { month: "Sep", shehran: 100, sujana: 0 },
    { month: "Oct", shehran: 100, sujana: 0 },
    { month: "Nov", shehran: 100, sujana: 0 },
    { month: "Dec", shehran: 100, sujana: 0 }
    
  ];
  const pieData = [
    { name: "shehran", value: 98, fill: "var(--color-shehran)" },
    { name: "sujana", value: 2, fill: "var(--color-sujana)" },
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
            <>
              <div className="love-chart-stack">
                <div className="love-chart love-chart-bar">
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <BarChart
                      data={chartData}
                      margin={{ left: 12, right: 12 }}
                      barCategoryGap="0%"
                      barGap={2}
                    >
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
                      <Bar
                        dataKey="shehran"
                        fill="var(--color-shehran)"
                        radius={[6, 6, 0, 0]}
                        barSize={16}
                      />
                      <Bar
                        dataKey="sujana"
                        fill="var(--color-sujana)"
                        radius={[6, 6, 0, 0]}
                        barSize={16}
                      />
                    </BarChart>
                  </ChartContainer>
                  <div className="love-source-inline">Source: trust me bro</div>
                </div>
                <div className="love-chart love-chart-pie">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-[350px] w-full"
                  >
                    <PieChart>
                      <Pie data={pieData} dataKey="value" />
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                        className="love-pie-legend -translate-y-2 flex-wrap gap-2 *:basis-1/2 *:justify-center"
                      />
                    </PieChart>
                  </ChartContainer>
                  <div className="love-source-inline">Source: trust me bro</div>
                </div>
              </div>
              <div className="love-research">
                <a
                  className="love-research-link"
                  href="https://www.researchgate.net/publication/385709508_Romantic_Relationships_Matter_More_to_Men_than_to_Women"
                  target="_blank"
                  rel="noreferrer"
                >
                  read the research bro
                </a>
              </div>
            </>
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
