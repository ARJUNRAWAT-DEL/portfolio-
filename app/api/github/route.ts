import { profile } from "@/lib/portfolio";
export const revalidate = 900;
type Repo = {
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};
type Event = { created_at: string; type: string };
async function github(path: string) {
  const response = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "arjun-portfolio",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("GitHub unavailable");
  return response.json();
}
export async function GET() {
  try {
    const user = await github(`users/${profile.github}`);
    const repositories: Repo[] = [];
    for (
      let page = 1;
      page <= Math.min(10, Math.ceil(user.public_repos / 100));
      page++
    ) {
      const rows = await github(
        `users/${profile.github}/repos?sort=updated&per_page=100&page=${page}`,
      );
      repositories.push(...rows);
    }
    let events: Event[] = [];
    let activityAvailable = true;
    try {
      events = await github(
        `users/${profile.github}/events/public?per_page=100`,
      );
    } catch {
      activityAvailable = false;
    }
    const owned = repositories.filter((r) => !r.fork);
    const languageCounts: Record<string, number> = {};
    owned.forEach((r) => {
      if (r.language)
        languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    });
    const days: Record<string, number> = {};
    events.forEach((e) => {
      const day = e.created_at.slice(0, 10);
      days[day] = (days[day] || 0) + 1;
    });
    return Response.json(
      {
        user: profile.github,
        repos: user.public_repos,
        followers: user.followers,
        stars: owned.reduce((n, r) => n + r.stargazers_count, 0),
        languages: Object.entries(languageCounts).sort((a, b) => b[1] - a[1]),
        activity: days,
        activityAvailable,
        eventCount: events.length,
        recent: owned
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            url: r.html_url,
            language: r.language,
            updated: r.updated_at,
          })),
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    return Response.json(
      {
        error:
          "GitHub activity is temporarily unavailable. Explore the profile directly.",
      },
      { status: 503 },
    );
  }
}
