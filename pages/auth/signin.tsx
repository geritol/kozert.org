import Container from "frontend/components/Container";
import SiteHead from "frontend/components/SiteHead";
import { getCsrfToken } from "next-auth/client";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  return (
    <Container>
      <SiteHead />
      <form
        method="post"
        action="/api/auth/signin/email"
        className="flex flex-col max-w-sm mx-auto"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          className="rounded border px-3 py-2 mt-4"
        />
        <button
          type="submit"
          className="rounded border px-3 py-1 hover:border-blue-400 mt-4"
        >
          Sign in with Email
        </button>
      </form>
    </Container>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
