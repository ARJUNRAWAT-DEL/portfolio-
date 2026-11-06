"use client";
import { useEffect, useRef, useState } from "react";
import { RotateCcw, Pause, Play } from "lucide-react";
import { skills } from "@/lib/portfolio";

const nodes = skills.flatMap((group, groupIndex) =>
  group.items.map((name, i) => {
    const angle = (groupIndex / skills.length) * Math.PI * 2;
    return {
      name,
      group: groupIndex,
      color: group.color,
      x: Math.cos(angle) * 145 + Math.sin(i * 2.4) * 75,
      y: Math.sin(angle) * 145 + Math.cos(i * 2.4) * 75,
      z: Math.sin(i * 1.7 + groupIndex) * 145,
    };
  }),
);
export default function SkillGraph() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: -0.14, y: 0.25 });
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (panel.current) observer.observe(panel.current);
    const timer = setInterval(() => {
      if (visible && !drag.current)
        setRotation((r) => ({ ...r, y: r.y + 0.009 }));
    }, 80);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [paused]);
  const projected = nodes.map((n) => {
    const xx = n.x * Math.cos(rotation.y) + n.z * Math.sin(rotation.y);
    const zz = -n.x * Math.sin(rotation.y) + n.z * Math.cos(rotation.y);
    const yy = n.y * Math.cos(rotation.x) - zz * Math.sin(rotation.x);
    const depth = n.y * Math.sin(rotation.x) + zz * Math.cos(rotation.x);
    const scale = 600 / (600 + depth);
    return { ...n, px: 300 + xx * scale, py: 270 + yy * scale, scale };
  });
  return (
    <div className="skills-layout">
      <div className="console graph-console" ref={panel}>
        <div className="console-bar">
          <span>SKILL_GRAPH</span>
          <span>
            {nodes.length} NODES / {skills.length} CLUSTERS
          </span>
        </div>
        <svg
          className="skill-graph"
          viewBox="0 0 600 540"
          role="group"
          aria-label="Interactive skill graph. Drag to orbit; use arrow keys to rotate."
          tabIndex={0}
          onKeyDown={(e) => {
            if (
              ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                e.key,
              )
            ) {
              e.preventDefault();
              setRotation((r) => ({
                x:
                  r.x +
                  (e.key === "ArrowUp"
                    ? -0.1
                    : e.key === "ArrowDown"
                      ? 0.1
                      : 0),
                y:
                  r.y +
                  (e.key === "ArrowLeft"
                    ? -0.1
                    : e.key === "ArrowRight"
                      ? 0.1
                      : 0),
              }));
            }
          }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, y: e.clientY };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (drag.current) {
              const dx = e.clientX - drag.current.x;
              const dy = e.clientY - drag.current.y;
              setRotation((r) => ({
                x: r.x + dy * 0.005,
                y: r.y + dx * 0.005,
              }));
              drag.current = { x: e.clientX, y: e.clientY };
            }
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <defs>
            <radialGradient id="graph-glow">
              <stop stopColor="#76d8ff" stopOpacity=".1" />
              <stop offset="1" stopColor="#76d8ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="270" r="250" fill="url(#graph-glow)" />
          <g
            className="orbit-rings"
            fill="none"
            stroke="#5c99b6"
            strokeOpacity=".15"
          >
            <ellipse
              cx="300"
              cy="270"
              rx="240"
              ry="92"
              transform="rotate(-25 300 270)"
            />
            <ellipse
              cx="300"
              cy="270"
              rx="240"
              ry="92"
              transform="rotate(65 300 270)"
            />
            <circle cx="300" cy="270" r="210" strokeDasharray="2 9" />
          </g>
          {projected.map((n, i) => {
            const neighbor = projected.find((p) => p.group === n.group)!;
            return (
              <line
                key={`l${i}`}
                x1={n.px}
                y1={n.py}
                x2={neighbor.px}
                y2={neighbor.py}
                stroke={n.color}
                opacity={
                  selected === null || selected === n.group ? 0.26 : 0.04
                }
              />
            );
          })}
          {projected.map((n, i) => (
            <g
              key={n.name}
              opacity={selected === null || selected === n.group ? 1 : 0.15}
              onMouseEnter={() => setHovered(n.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <line
                x1="300"
                y1="270"
                x2={n.px}
                y2={n.py}
                stroke={n.color}
                opacity=".09"
              />
              <circle
                cx={n.px}
                cy={n.py}
                r={hovered === n.name ? 8 : 4 * n.scale}
                fill={n.color}
              />
              <circle cx={n.px} cy={n.py} r="13" fill="transparent" />
              {(i % 2 === 0 || hovered === n.name || selected === n.group) && (
                <text
                  x={n.px + 10}
                  y={n.py + 4}
                  fill={n.color}
                  fontSize={hovered === n.name ? 14 : 11}
                >
                  {n.name}
                </text>
              )}
            </g>
          ))}
          <circle cx="300" cy="270" r="20" stroke="#8bd8f8" fill="#0d1820" />
          <text
            x="300"
            y="275"
            textAnchor="middle"
            fill="#a9dff3"
            fontSize="12"
          >
            AR
          </text>
        </svg>
        <div className="graph-footer">
          <span>{hovered || "drag to orbit · arrows to rotate"}</span>
          <div>
            <button
              aria-label={
                paused ? "Play graph rotation" : "Pause graph rotation"
              }
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
            <button
              aria-label="Reset graph"
              onClick={() => {
                setRotation({ x: -0.14, y: 0.25 });
                setSelected(null);
              }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="skill-groups">
        {skills.map((group, i) => (
          <button
            key={group.name}
            className={`skill-group ${selected === i ? "selected" : ""}`}
            aria-pressed={selected === i}
            onClick={() => setSelected(selected === i ? null : i)}
            style={{ "--group-color": group.color } as React.CSSProperties}
          >
            <div className="skill-group-title">
              <span className="mono dim">0{i + 1}</span>
              <span className="diamond">◇</span>
              <h3>{group.name}</h3>
              <span className="mono dim count">{group.items.length}</span>
            </div>
            <div className="tags">
              {group.items.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </button>
        ))}
        <p className="fine-print">
          Tools used across projects, coursework and training. Currently
          deepening my PyTorch and ML foundations.
        </p>
      </div>
    </div>
  );
}
