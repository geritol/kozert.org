import { User } from ".prisma/client";
import Container from "frontend/components/Container";
import SiteHead from "frontend/components/SiteHead";
import Image from "frontend/components/Image";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/dist/client/router";
import { getAllUserIds, getUser } from "backend/data/user";
import { ReactNode } from "react";
import { useSession } from "next-auth/client";

const UserWrapper = (props: { children: ReactNode }) => (
  <Container>
    <SiteHead />
    <div className="max-w-xl mx-auto"> {props.children}</div>
  </Container>
);

export default function UserView(props: { user: User }) {
  const router = useRouter();
  const [session] = useSession();

  if (router.isFallback) {
    return <UserWrapper>Loading...</UserWrapper>;
  }

  if (!props.user.name) {
    if (session && session.userId === props.user.id) {
      return (
        <UserWrapper>
          <p className="text-center">You have not completed your profile yet</p>
        </UserWrapper>
      );
    }
    return (
      <UserWrapper>
        <p className="text-center">User has not completed their profile yet</p>
      </UserWrapper>
    );
  }

  return (
    <UserWrapper>
      {props.user.image && (
        <div
          style={{ height: "300px" }}
          className="relative overflow-hidden mb-6"
        >
          <Image src={props.user.image} objectFit="cover" layout="fill" />
        </div>
      )}
      <h1 className="text-3xl mb-6">{props.user.name}</h1>
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
          {props.user.bio}
        </ReactMarkdown>
      </div>
    </UserWrapper>
  );
}

export async function getStaticPaths() {
  const ids = await getAllUserIds();
  return {
    paths: ids.map((id) => ({ params: { id: `${id}` } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const user = await getUser(context.params.id);
  if (!user) return { notFound: true };
  return {
    props: { user },
    revalidate: 60,
  };
}
