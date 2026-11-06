"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Globe2 } from "lucide-react";
const cities = [
  { name: "India", zone: "Asia/Kolkata" },
  { name: "Lithuania", zone: "Europe/Vilnius" },
  { name: "London", zone: "Europe/London" },
  { name: "New York", zone: "America/New_York" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
];
export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [zone, setZone] = useState("Asia/Kolkata");
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!panel.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const time = (zone: string) =>
    now
      ? new Intl.DateTimeFormat("en-GB", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
        }).format(now)
      : "--:--";
  return (
    <div
      ref={panel}
      className="clock-wrap"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        className="clock-pill"
        aria-expanded={open}
        aria-controls="time-compare"
        onClick={() => setOpen(!open)}
      >
        <Globe2 size={14} />
        <span>{time("Europe/Berlin")} in Germany</span>
        <span className="clock-compare">
          Compare <ChevronRight size={13} />
        </span>
      </button>
      {open && (
        <div id="time-compare" className="time-popover console">
          <p className="eyebrow">TIME_SYNC / LOCAL CLOCKS</p>
          <label>
            Compare Germany with
            <select value={zone} onChange={(e) => setZone(e.target.value)}>
              {cities.map((c) => (
                <option key={c.zone} value={c.zone}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <div className="time-pair">
            <div>
              <span>Würzburg</span>
              <strong>{time("Europe/Berlin")}</strong>
            </div>
            <span>↔</span>
            <div>
              <span>{cities.find((c) => c.zone === zone)?.name}</span>
              <strong>{time(zone)}</strong>
            </div>
          </div>
          <p className="fine-print">
            Times follow each location’s daylight-saving rules.
          </p>
        </div>
      )}
    </div>
  );
}
