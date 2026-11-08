import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio";
export function CircuitArt({ flow }: { flow: string[] }) {
  return (
    <div className="circuit-art" aria-label="Project workflow">
      <svg viewBox="0 0 800 260" aria-hidden="true">
        <defs>
          <pattern
            id="circuit-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="#88d7f0"
              strokeOpacity=".08"
            />
          </pattern>
        </defs>
        <rect width="800" height="260" fill="url(#circuit-grid)" />
        <g fill="none" stroke="#79c9e8" strokeWidth="2" opacity=".65">
          <path d="M0 80H110V140H250V210H390V120H550V60H800M0 220H80V180H180M310 0V70H430V110M570 260V190H710V150H800M100 0V40H210" />
          {[
            [110, 140],
            [250, 210],
            [390, 120],
            [550, 60],
            [430, 110],
            [710, 150],
            [210, 40],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#0c1720" />
          ))}
        </g>
      </svg>
      <div className="flow-steps">
        {flow.map((step, i) => (
          <span key={step}>
            <small>0{i + 1}</small>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <CircuitArt flow={project.flow} />
      <div className="project-detail-body">
        <p className="eyebrow">MISSION FILE / {project.category}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.description}</p>
        <div className="tags">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-proof-grid">
          <article>
            <span>01 / PROBLEM</span>
            <p>{project.problem}</p>
          </article>
          <article>
            <span>02 / MY CONTRIBUTION</span>
            <p>{project.contribution}</p>
          </article>
          <article>
            <span>03 / RESULT</span>
            <p>{project.result}</p>
          </article>
        </div>
        <hr />
        {project.visual && (
          <figure className="project-visual">
            <div className="project-visual-bar">
              <span>PROJECT SNAPSHOT</span>
              <span>ANALYTICS OUTPUT</span>
            </div>
            <a
              href={project.visual.src}
              target="_blank"
              rel="noreferrer"
              aria-label="Open full-size retail analysis image"
            >
              <Image
                src={project.visual.src}
                alt={project.visual.alt}
                width={4470}
                height={3565}
                sizes="(max-width: 760px) 90vw, 800px"
              />
            </a>
            <figcaption>{project.visual.caption}</figcaption>
          </figure>
        )}
        <h2>Overview</h2>
        <p>{project.overview}</p>
        <h2>Highlights</h2>
        <ul className="detail-list">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        {project.link ? (
          <a
            className="action primary"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> EXPLORE SOURCE <ArrowUpRight size={16} />
          </a>
        ) : (
          <p className="fine-print">
            Public source and demo links have not been provided for this
            project.
          </p>
        )}
      </div>
    </>
  );
}
