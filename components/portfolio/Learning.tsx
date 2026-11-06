"use client";
import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { learning, learningHighlights, profile } from "@/lib/portfolio";
export default function Learning() {
  const [selected, setSelected] = useState(4);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const course = learningHighlights[selected];
  const filtered = learning.filter(
    (c) =>
      (filter === "All" || c.category === filter) &&
      c.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="console learning-console">
      <div className="console-bar">
        <span>LEARNING_STEP</span>
        <span>{learning.length} COURSES & TRAINING RECORDS</span>
      </div>
      <div className="learning-chart">
        <span className="mono dim chart-caption">
          knowledge ↑ / selected learning milestones
        </span>
        <svg
          viewBox="0 0 1000 270"
          role="group"
          aria-label="Five selected learning milestones. Select a node or use the buttons below."
        >
          <defs>
            <linearGradient id="learning-fill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#82d9f9" stopOpacity=".12" />
              <stop offset="1" stopColor="#82d9f9" stopOpacity=".01" />
            </linearGradient>
          </defs>
          {[150, 350, 550, 750, 950].map((x) => (
            <line
              key={x}
              x1={x}
              x2={x}
              y1="10"
              y2="255"
              stroke="#708191"
              strokeOpacity=".12"
              strokeDasharray="3 8"
            />
          ))}
          <path
            d="M20 250H120V210H310V165H500V120H700V75H890V30H980V250Z"
            fill="url(#learning-fill)"
          />
          <path
            d="M20 250H120V210H310V165H500V120H700V75H890V30H980"
            fill="none"
            stroke="#82cdeb"
            strokeWidth="2"
          />
          {[120, 310, 500, 700, 890].map((x, i) => (
            <g
              key={x}
              role="button"
              tabIndex={0}
              aria-label={`Select milestone ${i + 1}: ${learningHighlights[i].name}`}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(i);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <circle cx={x} cy={200 - i * 45} r={26} fill="transparent" />
              <text
                x={x}
                y={190 - i * 45}
                fill={selected === i ? "#89dfff" : "#798795"}
                fontSize="11"
                textAnchor="middle"
              >
                0{i + 1}
              </text>
              <rect
                x={x - 6}
                y={204 - i * 45}
                width="12"
                height="12"
                transform={`rotate(45 ${x} ${210 - i * 45})`}
                fill={selected === i ? "#89dfff" : "#0d1119"}
                stroke="#89dfff"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
        <div className="chart-dates mono">
          <span>MAR 2026</span>
          <span>APR 2026</span>
          <span>MAY 2026</span>
        </div>
      </div>
      <div className="learning-details">
        <div>
          <p className="eyebrow">
            RECORD_0{selected + 1} / {course.date.toUpperCase()}
          </p>
          <h3>{course.name}</h3>
          <p>{course.category}</p>
          <a
            className="text-action"
            href={`${profile.linkedin}details/certifications/`}
            target="_blank"
            rel="noreferrer"
          >
            VIEW LINKEDIN RECORDS <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="milestone-list">
          {learningHighlights.map((c, i) => (
            <button
              key={c.name}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              <span>{c.name}</span>
              <span>{c.date}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="learning-expand">
        <p className="fine-print">
          Course completions and exam preparation are listed as learning
          records, not as vendor certifications.
        </p>
        <button
          className="text-action"
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? "CLOSE COURSE LIBRARY"
            : `EXPLORE ALL ${learning.length} LEARNING RECORDS`}{" "}
          <span>{showAll ? "−" : "+"}</span>
        </button>
      </div>
      {showAll && (
        <div className="course-library">
          <div className="course-filters">
            <label>
              <Search size={16} />
              <input
                placeholder="Search courses"
                aria-label="Search courses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <select
              aria-label="Filter course category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {[
                "All",
                ...Array.from(new Set(learning.map((c) => c.category))),
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <p className="mono dim">{filtered.length} RESULTS</p>
          <div className="course-results">
            {filtered.map((c) => (
              <div key={c.name}>
                <span className="mono">
                  {c.date} / {c.category}
                </span>
                <p>{c.name}</p>
              </div>
            ))}
          </div>
          {!filtered.length && <p>No courses match this search.</p>}
        </div>
      )}
    </div>
  );
}
