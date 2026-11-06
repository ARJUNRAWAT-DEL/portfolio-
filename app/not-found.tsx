import Link from "next/link";
export default function NotFound() {
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
      <p className="eyebrow">SIGNAL LOST / 404</p>
      <h1 style={{ fontSize: "clamp(36px,6vw,64px)" }}>
        This page is off the map.
      </h1>
      <p>The project or page you’re looking for could not be found.</p>
      <div>
        <Link className="action primary" href="/">
          BACK TO PORTFOLIO ↗
        </Link>
      </div>
    </main>
  );
}
