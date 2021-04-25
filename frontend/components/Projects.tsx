import { useSession } from "next-auth/client";
import Link from "next/link";

export default function Projects() {
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
      <p className="mt-8">No projects found :(</p>
    </div>
  );
}
