import { Project } from ".prisma/client";
import { getAllProjectIds, getProject } from "backend/data/project";
import Container from "frontend/components/Container";
import SiteHead from "frontend/components/SiteHead";

export default function ProjectView(props: { project: Project }) {
  return (
    <Container>
      <SiteHead />
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl mb-6">{props.project.title}</h1>
        <div>{props.project.description}</div>
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
