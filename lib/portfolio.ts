import courses from "./courses.json";

export const profile = {
  name: "Arjun Rawat",
  firstName: "Arjun",
  lastName: "Rawat",
  role: "MSc Artificial Intelligence student",
  location: "Würzburg, Germany",
  email: "arjunrawat4741@gmail.com",
  github: "ARJUNRAWAT-DEL",
  githubUrl: "https://github.com/ARJUNRAWAT-DEL",
  linkedin: "https://www.linkedin.com/in/rwtarjun/",
  cv: "/Arjun-rawat-cv.pdf",
  availability: "Open to Werkstudent roles · up to 20 hours/week",
  summary: "I turn data into useful, intelligent software.",
};
export const skills = [
  {
    name: "AI & Machine Learning",
    color: "#82d9f9",
    items: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
    ],
  },
  {
    name: "Agents & Language Models",
    color: "#8e9bff",
    items: ["NLP", "RAG", "LangGraph", "pgvector", "LLMs"],
  },
  {
    name: "Data Engineering",
    color: "#54c6c3",
    items: ["SQL", "Apache Spark", "Kafka", "ETL", "PostgreSQL"],
  },
  {
    name: "Software & Backend",
    color: "#c9c7ee",
    items: ["FastAPI", "React", "TypeScript", "JavaScript", "REST APIs"],
  },
  {
    name: "Cloud & Tools",
    color: "#65a6c7",
    items: ["Git", "Docker", "AWS", "Azure", "Jupyter"],
  },
  {
    name: "Analytics & Visualization",
    color: "#afc4d5",
    items: ["Power BI", "Streamlit", "Plotly", "Seaborn", "R"],
  },
];
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string | null;
  status: string;
  overview: string;
  highlights: string[];
  flow: string[];
};
export const projects: Project[] = [
  {
    slug: "intellidoc",
    title: "AI-Powered Document Assistant",
    category: "NLP × SOFTWARE",
    description:
      "An assistant for processing, searching and summarizing documents with natural language.",
    tech: ["Python", "FastAPI", "PostgreSQL", "pgvector", "NLP"],
    link: "https://github.com/ARJUNRAWAT-DEL/INTELLIDOC",
    status: "SOURCE AVAILABLE",
    overview:
      "A document intelligence project connecting natural language processing with a FastAPI backend and PostgreSQL vector storage. It brings together my interests in applied AI, useful APIs and working with unstructured information.",
    highlights: [
      "Document processing and summarization workflows",
      "Vector storage with PostgreSQL and pgvector",
      "REST API integration for application access",
    ],
    flow: ["Documents", "Processing", "Vector store", "Answers"],
  },
  {
    slug: "multi-agent-simulator",
    title: "Multi-Agent Simulator",
    category: "AGENTS × AI",
    description:
      "A web application for exploring how AI assistants collaborate on tasks, with live monitoring.",
    tech: ["React", "FastAPI", "PostgreSQL", "NLP", "Python"],
    link: "https://github.com/ARJUNRAWAT-DEL/multi-agents-simulator-",
    status: "SOURCE AVAILABLE",
    overview:
      "An exploration of collaborative AI assistants, pairing a React interface with a Python backend. The project focuses on making task execution and agent activity visible in one place.",
    highlights: [
      "Collaborative assistant workflows",
      "React interface and performance dashboards",
      "Real-time agent monitoring",
    ],
    flow: ["Task", "Agents", "Collaboration", "Dashboard"],
  },
  {
    slug: "smart-retail",
    title: "Smart Retail Analytics",
    category: "DATA × ANALYTICS",
    description:
      "Customer segmentation, demand forecasting and interactive dashboards for retail data.",
    tech: ["Streamlit", "Python", "PostgreSQL", "Plotly", "Pandas"],
    link: "https://github.com/ARJUNRAWAT-DEL/Smart-Retail-Analytics-Platform",
    status: "SOURCE AVAILABLE",
    overview:
      "A retail analytics application that turns customer and transaction data into visual insights. It combines RFM analysis and K-Means segmentation with demand forecasting and interactive Plotly charts.",
    highlights: [
      "RFM and K-Means customer segmentation",
      "Demand forecasting workflows",
      "Interactive dashboards built with Streamlit and Plotly",
    ],
    flow: ["Retail data", "Analysis", "Segments", "Insights"],
  },
  {
    slug: "aethel-finance",
    title: "Aethel Finance",
    category: "STREAMING × AI",
    description:
      "A personal finance project exploring streaming data, knowledge graphs and AI-assisted analysis.",
    tech: ["Python", "LangGraph", "Kafka", "Neo4j", "React", "PostgreSQL"],
    link: "https://github.com/ARJUNRAWAT-DEL/AI_POWERED_FINANCIAL_MANAGEMENT_TOOL",
    status: "SOURCE AVAILABLE",
    overview:
      "A finance-focused project exploring a sentiment-to-liquidity pipeline with Kafka and Spark Streaming, alongside a graph-based retrieval layer. The source includes backend agents, a React interface, streaming jobs and Docker-based infrastructure.",
    highlights: [
      "Kafka and Spark Streaming pipeline exploration",
      "GraphRAG with Neo4j and language models",
      "Dashboard for interpreting financial signals",
    ],
    flow: ["Events", "Stream", "Knowledge graph", "Dashboard"],
  },
];
export const experiences = [
  {
    role: "Data Intake Specialist",
    company: "Cencora",
    period: "NOV 2025 → MAY 2026",
    location: "Vilnius, Lithuania",
    type: "WORK",
    details: [
      "Managed program correspondence and kept intake records accurate and up to date.",
      "Maintained databases and followed program procedures and compliance requirements.",
      "Coordinated information sharing through Microsoft Teams and SharePoint.",
    ],
  },
  {
    role: "Data Science with AI/ML Intern",
    company: "Labmentix",
    period: "JUL 2025 → OCT 2025",
    location: "Remote",
    type: "INTERNSHIP",
    details: [
      "Applied supervised and unsupervised learning with cross-validation and performance evaluation.",
      "Used Python, Pandas, NumPy and Scikit-learn for preprocessing and feature engineering.",
      "Communicated findings through Matplotlib and Seaborn visualizations.",
    ],
  },
  {
    role: "Software Engineer Intern (IT)",
    company: "Yara International",
    period: "JUL 2025 → SEP 2025",
    location: "Delhi, India",
    type: "INTERNSHIP",
    details: [
      "Developed a document assistant using FastAPI, PostgreSQL, pgvector and NLP.",
      "Worked on a React application integrating AI assistants.",
      "Used Git and GitHub for debugging and deployment workflows.",
    ],
  },
  {
    role: "Big Data Engineering Training",
    company: "Accenture Baltics",
    period: "JAN 2024 → FEB 2024",
    location: "Vilnius, Lithuania",
    type: "TRAINING",
    details: [
      "Explored cloud platforms and data processing pipelines.",
      "Practiced ETL workflows with Python, SQL and Apache Spark.",
      "Gained exposure to distributed data tools including Hadoop and Kafka.",
    ],
  },
];
export const education = [
  {
    degree: "MSc Artificial Intelligence",
    school: "Julius-Maximilians-Universität Würzburg",
    location: "Würzburg, Germany",
    period: "OCT 2026 → PRESENT",
    active: true,
    description:
      "Building a deeper foundation in artificial intelligence, machine learning and optimization. Currently studying Python, PyTorch and applied AI.",
  },
  {
    degree: "BSc Information Technology",
    school: "Vilnius Gediminas Technical University · VILNIUS TECH",
    location: "Vilnius, Lithuania",
    period: "2022 → 2026",
    active: false,
    description:
      "Studies in software engineering, databases, data structures, big data analytics and cloud computing. Bachelor’s thesis work on an AI document assistant.",
  },
];
export const learning = courses;
export const learningHighlights = [10, 11, 22, 35, 0].map((i) => courses[i]);
export const languages = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "German", level: "A2 conversational · previous B1 qualification" },
];
