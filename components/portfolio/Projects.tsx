"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  X,
} from "lucide-react";
import { projects, type Project } from "@/lib/portfolio";
import ProjectDetail from "./ProjectDetail";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const [detail, setDetail] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const selected = projects[active];
  useEffect(() => {
    if (
      paused ||
      detail ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let visible = false;
    const observer = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0.3 },
    );
    if (area.current) observer.observe(area.current);
    const timer = setInterval(() => {
      if (visible) setActive((i) => (i + 1) % projects.length);
    }, 8000);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [paused, detail]);
  useEffect(() => {
    if (detail) {
      dialog.current?.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflow;
      };
    }
  }, [detail]);
  const close = () => {
    dialog.current?.close();
    setDetail(null);
    opener.current?.focus();
  };
  const open = (p: Project) => {
    opener.current = document.activeElement as HTMLElement;
    setDetail(p);
  };
  return (
    <div ref={area} className="project-system">
      <div className="project-controls">
        <span className="mono dim">
          PROJECT DISPATCH / {String(active + 1).padStart(2, "0")} OF 04
        </span>
        <div>
          <button
            aria-label="Previous project"
            onClick={() => {
              setPaused(true);
              setActive((i) => (i + projects.length - 1) % projects.length);
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            aria-label={
              paused ? "Play project conveyor" : "Pause project conveyor"
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button
            aria-label="Next project"
            onClick={() => {
              setPaused(true);
              setActive((i) => (i + 1) % projects.length);
            }}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="conveyor-window">
        <div className="scanner">
          <div className="scanner-top mono">
            SCANNER_01 <span>● ● ● &nbsp; LOCKED</span>
          </div>
          <div className="scan-light" />
        </div>
        <div
          className="parcel-track"
          style={{ "--active": active } as React.CSSProperties}
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              className={`parcel ${i === active ? "active" : ""}`}
              aria-label={`Open ${p.title} project`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => {
                setActive(i);
                setPaused(true);
                open(p);
              }}
            >
              <div className="hazard" />
              <div className="parcel-top mono">
                <span>PKG_0{i + 1}</span>
                <span>{p.category}</span>
              </div>
              <div className="shipping-label">
                <span className="mono label-kicker">FROM ARJUN TO YOU</span>
                <h3>{p.title}</h3>
                <p className="mono">contents {p.tech.slice(0, 4).join(", ")}</p>
                <div className="label-bottom">
                  <div className="barcode" />
                  <span className="stamp">
                    {p.link ? "OPEN SOURCE" : "OVERVIEW"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="conveyor-belt" />
        <div className="rollers" />
      </div>
      <div className="project-dots" aria-label="Select project">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            aria-label={`Select ${p.title}`}
            aria-pressed={active === i}
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <div className="console scanner-output">
        <div className="console-bar">
          <span>SCANNER_01 OUTPUT</span>
          <span>PROJECT INDEX</span>
        </div>
        <div className="scanner-content">
          <div className="scanner-log mono">
            <p>✓ detected &nbsp; pkg_0{active + 1}</p>
            <p>✓ contents &nbsp; {selected.tech.join(", ")}</p>
            <p>✓ status &nbsp; {selected.status.toLowerCase()}</p>
          </div>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <button className="text-action" onClick={() => open(selected)}>
            OPEN MISSION FILE <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-label={detail?.title || "Project details"}
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {detail && (
          <div className="project-sheet">
            <div className="sheet-bar">
              <button onClick={close}>
                <ArrowLeft size={16} /> Back
              </button>
              <a href={`/projects/${detail.slug}`}>
                Open full page <ArrowUpRight size={14} />
              </a>
              <button aria-label="Close project" onClick={close}>
                <X size={20} />
              </button>
            </div>
            <ProjectDetail project={detail} />
          </div>
        )}
      </dialog>
    </div>
  );
}
