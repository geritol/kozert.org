import { Project } from "@prisma/client";
import Link from "next/link";

export default function ProjectCard(props: { project: Project }) {
  return (
    <Link href={`/project/${props.project.id}`}>
      <div className="shadow rounded m-2 p-2 w-1/4 cursor-pointer">
        <div>{props.project.title}</div>
      </div>
    </Link>
  );
}
