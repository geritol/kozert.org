import { Project } from ".prisma/client";
import { getAllProjectIds, getProject } from "backend/data/project";
import Container from "frontend/components/Container";
import SiteHead from "frontend/components/SiteHead";
import Image from "frontend/components/Image";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/dist/client/router";

export default function ProjectView(props: { project: Project }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <SiteHead />
      <div className="max-w-xl mx-auto">
        {props.project.image && (
          <div
            style={{ height: "300px" }}
            className="relative overflow-hidden mb-6"
          >
            <Image src={props.project.image} objectFit="cover" layout="fill" />
          </div>
        )}
        <h1 className="text-3xl mb-6">{props.project.title}</h1>
        <div className="space-y-4">
          <ReactMarkdown
            linkTarget="_blank"
            components={{
              h1: "h2",
              h2: "h3",
              h3: "h4",
              h4: "h5",
              h5: "h6",
            }}
          >
            {props.project.description}
          </ReactMarkdown>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const ids = await getAllProjectIds();
  return {
    paths: ids.map((id) => ({ params: { id: `${id}` } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const project = await getProject(context.params.id);
  if (!project) return { notFound: true };
  return {
    props: { project },
    revalidate: 60,
  };
}
