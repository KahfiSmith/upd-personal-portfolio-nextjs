import { NextResponse } from "next/server";

const WAKATIME_ENDPOINT =
  "https://api.wakatime.com/api/v1/users/current/stats/all_time";

type WakaTimeLanguage = {
  name?: string;
  percent?: number;
  total_seconds?: number;
  text?: string;
};

type WakaTimeEditor = {
  name?: string;
  percent?: number;
};

type WakaTimePayload = {
  data?: {
    human_readable_total?: string;
    human_readable_daily_average?: string;
    total_seconds?: number;
    daily_average?: number;
    best_day?: {
      date?: string;
      text?: string;
      total_seconds?: number;
    };
    languages?: WakaTimeLanguage[];
    editors?: WakaTimeEditor[];
  };
};

function toBasicAuthHeader(apiKey: string) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing WAKATIME_API_KEY" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(WAKATIME_ENDPOINT, {
      headers: {
        Authorization: toBasicAuthHeader(apiKey),
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    const payload = (await response.json()) as WakaTimePayload | { error?: unknown };

    if (!response.ok || !("data" in payload) || !payload.data) {
      return NextResponse.json(
        { error: "Failed to fetch WakaTime stats", details: payload },
        { status: response.status || 500 },
      );
    }

    const stats = payload.data;
    const languages = (stats.languages ?? [])
      .filter((language) => language.name)
      .map((language) => ({
        name: language.name ?? "Unknown",
        percent: Number(language.percent ?? 0),
        totalSeconds: Number(language.total_seconds ?? 0),
        text: language.text ?? "0 secs",
      }));

    const editors = (stats.editors ?? [])
      .filter((editor) => editor.name)
      .map((editor) => ({
        name: editor.name ?? "Unknown",
        percent: Number(editor.percent ?? 0),
      }));

    return NextResponse.json({
      totalCodingTime: stats.human_readable_total ?? "0 hrs 0 mins",
      dailyAverage: stats.human_readable_daily_average ?? "0 mins",
      totalSeconds: Number(stats.total_seconds ?? 0),
      dailyAverageSeconds: Number(stats.daily_average ?? 0),
      bestDay: {
        date: stats.best_day?.date ?? null,
        text: stats.best_day?.text ?? "No tracked day yet",
        totalSeconds: Number(stats.best_day?.total_seconds ?? 0),
      },
      topLanguage: languages[0]?.name ?? "No data yet",
      languages,
      editors,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected error while fetching WakaTime stats",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
