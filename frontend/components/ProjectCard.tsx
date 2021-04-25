import { Project } from "@prisma/client";
import Link from "next/link";
import Image from "frontend/components/Image";

export default function ProjectCard(props: { project: Project }) {
  return (
    <Link href={`/project/${props.project.id}`}>
      <div className="shadow rounded p-2 cursor-pointer">
        {props.project.image && (
          <div style={{ height: "200px" }} className="relative overflow-hidden">
            <Image src={props.project.image} layout="fill" objectFit="cover" />
          </div>
        )}
        <div>{props.project.title}</div>
      </div>
    </Link>
  );
}
