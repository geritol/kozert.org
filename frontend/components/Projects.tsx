import { Project } from ".prisma/client";
import { useSession } from "next-auth/client";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

export default function Projects(props: { projects: Project[] }) {
  const [session] = useSession();

  return (
    <div>
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
      <div className="flex mt-6">
        {props.projects &&
          props.projects.map((p) => <ProjectCard project={p} key={p.id} />)}
      </div>
    </div>
  );
}
