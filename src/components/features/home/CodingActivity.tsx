"use client";

import { useEffect, useState } from "react";

type LanguageStat = {
  name: string;
  percent: number;
  totalSeconds: number;
  text: string;
};

type EditorStat = {
  name: string;
  percent: number;
};

type CodingActivityResponse = {
  totalCodingTime: string;
  dailyAverage: string;
  totalSeconds: number;
  dailyAverageSeconds: number;
  bestDay: {
    date: string | null;
    text: string;
    totalSeconds: number;
  };
  topLanguage: string;
  languages: LanguageStat[];
  editors: EditorStat[];
};

const fallbackData: CodingActivityResponse = {
  totalCodingTime: "1,240 hrs",
  dailyAverage: "4 hrs 48 mins",
  totalSeconds: 4_464_000,
  dailyAverageSeconds: 17_280,
  bestDay: {
    date: null,
    text: "7 hrs 12 mins",
    totalSeconds: 25_920,
  },
  topLanguage: "TypeScript",
  languages: [
    { name: "TypeScript", percent: 42, totalSeconds: 54_000, text: "15 hrs" },
    { name: "JavaScript", percent: 28, totalSeconds: 36_000, text: "10 hrs" },
    { name: "PHP", percent: 18, totalSeconds: 24_000, text: "6 hrs 40 mins" },
    { name: "CSS", percent: 12, totalSeconds: 15_000, text: "4 hrs 10 mins" },
  ],
  editors: [
    { name: "VS Code", percent: 88 },
    { name: "Cursor", percent: 12 },
  ],
};

const chartColors = [
  "from-cyan-500 to-sky-500",
  "from-amber-400 to-orange-500",
  "from-indigo-500 to-violet-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-slate-500 to-zinc-700",
];

export default function CodingActivity() {
  const [stats, setStats] = useState<CodingActivityResponse>(fallbackData);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/wakatime", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as CodingActivityResponse;

        if (active) {
          setStats(payload);
          setStatus("ready");
        }
      } catch {
        if (active) {
          setStatus("error");
        }
      }
    }

    void loadStats();

    return () => {
      active = false;
    };
  }, []);

  const chartLanguages = stats.languages.slice(0, 6);
  const maxLanguageSeconds = Math.max(
    ...chartLanguages.map((language) => language.totalSeconds),
    1,
  );
  const topEditors = stats.editors.slice(0, 2);

  return (
    <section
      id="activity"
      data-anchor-offset="18"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute top-8 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-20 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle at center, #67e8f9 0%, #38bdf8 45%, transparent 72%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-12 h-64 w-64 rounded-full opacity-15 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle at center, #f59e0b 0%, #fb7185 55%, transparent 75%)",
          }}
        ></div>
      </div>

      <div className="max-w-[96rem] mx-auto px-6 md:px-8">
        <div className="mb-10 md:mb-14">
          <div>
            <h2 className="mt-3 pb-2 font-display bg-gradient-to-r from-charcoal via-cyan-600 to-charcoal sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight bg-clip-text text-transparent">
              A Quick Look At
              <span className="block bg-gradient-to-r from-charcoal via-cyan-600 to-charcoal bg-clip-text text-transparent">
                How I Build
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-cyan-300/80 bg-gradient-to-br from-cyan-100 via-sky-50 to-sky-100/90 p-5 md:p-6 shadow-[0_20px_70px_rgba(14,116,144,0.16)] backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-charcoal/45">
                  Total Coding Time
                </p>
                <p className="mt-4 font-display text-3xl md:text-4xl text-charcoal">
                  {stats.totalCodingTime}
                </p>
                <p className="mt-2 text-sm text-charcoal/55">
                  Lifetime tracked coding time
                </p>
              </div>

              <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-100/90 p-5 md:p-6 shadow-[0_20px_70px_rgba(217,119,6,0.16)] backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-charcoal/45">
                  Daily Average
                </p>
                <p className="mt-4 font-display text-3xl md:text-4xl text-charcoal">
                  {stats.dailyAverage}
                </p>
                <p className="mt-2 text-sm text-charcoal/55">
                  Average daily tracked time
                </p>
              </div>

              <div className="rounded-3xl border border-rose-300/80 bg-gradient-to-br from-rose-100 via-pink-50 to-pink-100/90 p-5 md:p-6 shadow-[0_20px_70px_rgba(225,29,72,0.16)] backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-charcoal/45">
                  Best Day
                </p>
                <p className="mt-4 font-display text-3xl md:text-4xl text-charcoal">
                  {stats.bestDay.text}
                </p>
                <p className="mt-2 text-sm text-charcoal/55">
                  {stats.bestDay.date
                    ? `Highest tracked day on ${stats.bestDay.date}`
                    : "Highest single tracked day"}
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-300/80 bg-gradient-to-br from-emerald-100 via-teal-50 to-teal-100/90 p-5 md:p-6 shadow-[0_20px_70px_rgba(5,150,105,0.16)] backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-charcoal/45">
                  Top Language
                </p>
                <p className="mt-4 font-display text-3xl md:text-4xl text-charcoal">
                  {stats.topLanguage}
                </p>
                <p className="mt-2 text-sm text-charcoal/55">
                  Primary language by tracked time
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-300/70 bg-gradient-to-br from-white via-slate-50 to-cyan-50/60 p-6 md:p-8 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.24em] text-charcoal/45">
                    Language Usage
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-charcoal">
                    Time spent per top language
                  </h3>
                </div>
                <p className="text-sm md:text-base text-charcoal/55">
                  Built from `data.languages` on the WakaTime response
                </p>
              </div>

              <div className="mt-8">
                <div className="flex h-56 items-end gap-3 md:gap-4">
                  {chartLanguages.map((language, index) => (
                    <div
                      key={language.name}
                      className="flex min-w-0 flex-1 flex-col items-center gap-3"
                    >
                      <div className="flex h-44 w-full items-end">
                        <div
                          className={`w-full rounded-t-[1.25rem] bg-gradient-to-t ${
                            chartColors[index % chartColors.length]
                          } shadow-[0_12px_36px_rgba(8,145,178,0.18)]`}
                          style={{
                            height: `${Math.max(
                              16,
                              (language.totalSeconds / maxLanguageSeconds) *
                                100,
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-charcoal/80">
                          {language.text}
                        </p>
                        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-charcoal/45">
                          {language.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="flex h-full flex-col rounded-[1.75rem] border border-sky-200/80 bg-gradient-to-br from-slate-100 via-white to-cyan-100/70 p-6 md:p-8 shadow-[0_24px_90px_rgba(14,116,144,0.10)]">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-charcoal/45">
                Language Breakdown
              </p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl text-charcoal">
                What the recent sessions look like
              </h3>

              <div className="mt-8 space-y-5">
                {stats.languages.slice(0, 4).map((language, index) => (
                  <div key={language.name}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <p className="text-sm md:text-base font-medium text-charcoal/80">
                        {language.name}
                      </p>
                      <p className="text-sm font-mono text-charcoal/50">
                        {language.percent.toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-3 rounded-full bg-charcoal/8">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          chartColors[index % chartColors.length]
                        }`}
                        style={{ width: `${Math.max(6, language.percent)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-cyan-50/50 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-charcoal/45">
                  Editor Usage
                </p>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-charcoal/60">
                  {topEditors.length > 0
                    ? topEditors
                        .map(
                          (editor) =>
                            `${editor.name} ${editor.percent.toFixed(1)}%`,
                        )
                        .join(" / ")
                    : "No editor data yet"}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-charcoal/35">
                  {status === "loading" && "Loading live WakaTime stats..."}
                  {status === "ready" && "Live data connected"}
                  {status === "error" &&
                    "Using fallback preview while API is unavailable"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
