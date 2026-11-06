import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/portfolio";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} | Arjun Rawat` : "Project not found",
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <main id="main" className="standalone-project">
      <div className="sheet-bar">
        <Link href="/#projects">← Back to portfolio</Link>
        <span className="mono">AR / MISSION FILE</span>
      </div>
      <ProjectDetail project={project} />
    </main>
  );
}
