import {
  profile,
  projects,
  experiences,
  education,
  skills,
  languages,
} from "./portfolio";
export const knowledge = [
  {
    keywords: ["who", "about", "introduce", "background"],
    text: `${profile.name} is an MSc Artificial Intelligence student at JMU Würzburg, based in ${profile.location}. He completed his BSc in Information Technology at VILNIUS TECH. His interests combine applied AI, data engineering and software development.`,
  },
  {
    keywords: [
      "hire",
      "available",
      "availability",
      "workstudent",
      "werkstudent",
      "job",
      "hours",
      "internship",
      "contact",
      "email",
    ],
    text: `Arjun is looking for Werkstudent opportunities in AI, data and software engineering, up to 20 hours per week. Contact him at ${profile.email} to discuss a role and starting date.`,
  },
  {
    keywords: [
      "education",
      "study",
      "studying",
      "university",
      "jmu",
      "master",
      "degree",
      "bachelor",
    ],
    text: education
      .map((e) => `${e.degree} at ${e.school} (${e.period}). ${e.description}`)
      .join("\n\n"),
  },
  {
    keywords: [
      "experience",
      "work",
      "cencora",
      "yara",
      "accenture",
      "labmentix",
    ],
    text: experiences
      .map((e) => `${e.role}, ${e.company} (${e.period}). ${e.details[0]}`)
      .join("\n\n"),
  },
  {
    keywords: [
      "skills",
      "tool",
      "technology",
      "stack",
      "python",
      "pytorch",
      "sql",
    ],
    text:
      skills.map((s) => `${s.name}: ${s.items.join(", ")}.`).join("\n") +
      "\nThese tools span project, coursework and training experience; Arjun is currently deepening his PyTorch and ML foundations.",
  },
  {
    keywords: ["language", "german", "english", "hindi"],
    text: languages.map((l) => `${l.name}: ${l.level}.`).join(" "),
  },
  {
    keywords: ["projects", "built", "portfolio"],
    text: projects
      .map(
        (p) =>
          `${p.title}: ${p.description} Arjun's contribution: ${p.contribution}`,
      )
      .join("\n\n"),
  },
  ...projects.map((p) => ({
    keywords: [
      p.slug,
      ...p.title
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter((s) => s.length > 4),
    ],
    text: `${p.title}\n\nProblem: ${p.problem}\n\nArjun's contribution: ${p.contribution}\n\nResult: ${p.result}\n\n${p.overview}\n\nTools: ${p.tech.join(", ")}. ${p.link ? `Source: ${p.link}` : "A public repository is not linked yet."}`,
  })),
];
export function answerFromPortfolio(question: string) {
  const words = question.toLowerCase().split(/[^a-z0-9-]+/);
  const ranked = knowledge
    .map((k) => ({
      ...k,
      score: k.keywords.reduce((n, w) => n + (words.includes(w) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);
  if (!ranked[0].score)
    return (
      "I can answer questions about Arjun’s projects, skills, education, experience and availability. I don’t have information beyond his portfolio. For a specific question, email " +
      profile.email +
      "."
    );
  return ranked[0].text;
}
