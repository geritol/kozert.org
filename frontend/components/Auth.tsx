import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

export default function Auth() {
  const [session, loading] = useSession();

  if (loading) return <></>;

  return (
    <>
      {!session && (
        <>
          <button
            className="border rounded-md px-4 py-1 hover:border-blue-300"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <div className="flex items-center">
          Signed in as&nbsp;
          <Link href={`/user/${session.userId}`}>
            {session.user.email}
          </Link>{" "}
          <br />
          <button
            className="border rounded-md px-4 py-1 hover:border-red-300 ml-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
}
