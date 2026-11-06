"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      className="section-shell"
      style={{
        minHeight: "80vh",
        display: "grid",
        alignContent: "center",
        gap: 24,
      }}
    >
      <p className="eyebrow">CONNECTION INTERRUPTED</p>
      <h1 style={{ fontSize: "clamp(36px,6vw,64px)" }}>
        Let’s try that again.
      </h1>
      <p>
        This section couldn’t load. You can retry or return to the homepage.
      </p>
      <div style={{ display: "flex", gap: 16 }}>
        <button className="action primary" onClick={reset}>
          TRY AGAIN
        </button>
        <a className="action" href="/">
          GO HOME
        </a>
      </div>
    </main>
  );
}
