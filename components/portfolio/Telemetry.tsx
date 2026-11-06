"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Github, RefreshCw } from "lucide-react";
import { profile } from "@/lib/portfolio";
type Stats = {
  repos: number;
  followers: number;
  stars: number;
  languages: [string, number][];
  activity: Record<string, number>;
  activityAvailable: boolean;
  eventCount: number;
  recent: {
    name: string;
    url: string;
    language: string | null;
    updated: string;
  }[];
  fetchedAt: string;
};
export default function Telemetry() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch("/api/github", { signal: controller.signal })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setStats(data);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError("GitHub activity is temporarily unavailable.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);
  const total = stats?.languages.reduce((s, [, n]) => s + n, 0) || 1;
  const colors = ["#85d8f6", "#8c9aeb", "#56bdb5", "#c4bbec", "#a7becb"];
  return (
    <div className="console telemetry-console">
      <div className="console-bar">
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">
          <Github size={15} /> GITHUB / {profile.github}
        </a>
        <span>
          <span className={`status-dot ${error ? "offline" : ""}`} />
          {loading ? "CONNECTING" : error ? "UNAVAILABLE" : "PUBLIC ACTIVITY"}
        </span>
      </div>
      {loading ? (
        <div className="telemetry-loading" role="status">
          <RefreshCw size={20} className="spin" />
          <p>Reading public GitHub activity…</p>
        </div>
      ) : error ? (
        <div className="telemetry-loading">
          <p role="status">{error}</p>
          <button className="action" onClick={() => setRetry((n) => n + 1)}>
            TRY AGAIN <RefreshCw size={14} />
          </button>
          <a className="text-action" href={profile.githubUrl}>
            OPEN GITHUB <ArrowUpRight size={14} />
          </a>
        </div>
      ) : (
        stats && (
          <>
            <div className="telemetry-numbers">
              <div>
                <strong>{stats.repos}</strong>
                <span>PUBLIC REPOSITORIES</span>
              </div>
              <div>
                <strong>{stats.stars}</strong>
                <span>REPOSITORY STARS</span>
              </div>
              <div>
                <strong>{stats.followers}</strong>
                <span>FOLLOWERS</span>
              </div>
            </div>
            <div className="activity-area">
              <div className="activity-heading mono">
                <span>RECENT PUBLIC EVENTS</span>
                <span>
                  {stats.activityAvailable
                    ? `${stats.eventCount} RETURNED`
                    : "FEED UNAVAILABLE"}
                </span>
              </div>
              {stats.activityAvailable ? (
                <>
                  <div
                    className="heatmap"
                    role="img"
                    aria-label="Public GitHub events by day over the last 91 days"
                  >
                    {Array.from({ length: 91 }, (_, i) => {
                      const date = new Date(
                        new Date(stats.fetchedAt).setUTCHours(0, 0, 0, 0),
                      );
                      date.setUTCDate(date.getUTCDate() - 90 + i);
                      const key = date.toISOString().slice(0, 10);
                      const n = stats.activity[key] || 0;
                      return (
                        <div
                          key={key}
                          title={`${key}: ${n} public events`}
                          style={{
                            background: n
                              ? `rgba(126,211,243,${Math.min(0.25 + n * 0.12, 1)})`
                              : "#182029",
                          }}
                        />
                      );
                    })}
                  </div>
                  <p className="fine-print">
                    Up to 100 recent public events from GitHub’s feed, within
                    its 90-day window. This is not an annual contribution total.
                  </p>
                </>
              ) : (
                <p className="fine-print">
                  The activity feed is unavailable; repository statistics are
                  still shown.
                </p>
              )}
            </div>
            <div className="telemetry-bottom">
              <div>
                <p className="eyebrow">LANGUAGES / REPOSITORY COUNT</p>
                <div className="language-bar">
                  {stats.languages.map(([name, n], i) => (
                    <span
                      title={`${name}: ${n} repositories`}
                      key={name}
                      style={{
                        width: `${(n / total) * 100}%`,
                        background: colors[i % colors.length],
                      }}
                    />
                  ))}
                </div>
                <div className="language-legend">
                  {stats.languages.map(([name, n], i) => (
                    <span key={name}>
                      <i style={{ background: colors[i % colors.length] }} />
                      {name} <b>{n}</b>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">RECENTLY UPDATED</p>
                {stats.recent.map((repo) => (
                  <a
                    className="repo-row"
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{repo.name}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
            <div className="telemetry-foot mono">
              FETCHED{" "}
              {new Date(stats.fetchedAt).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })}{" "}
              · REFRESHED EVERY 15 MINUTES
            </div>
          </>
        )
      )}
    </div>
  );
}
