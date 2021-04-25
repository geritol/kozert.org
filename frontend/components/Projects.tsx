import { Project } from ".prisma/client";
import { useSession } from "next-auth/client";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

export default function Projects(props: { projects: Project[] }) {
  const [session] = useSession();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-12 border-b flex justify-between items-center">
        <h1 className="text-4xl text-left">Projects</h1>
        {session && (
          <Link href="/projects/create">
            <button>Create Project</button>
          </Link>
        )}
      </div>
      {props.projects.length === 0 && (
        <p className="mt-8">No projects found :(</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">
        {props.projects &&
          props.projects.map((p) => <ProjectCard project={p} key={p.id} />)}
      </div>
    </div>
  );
}
