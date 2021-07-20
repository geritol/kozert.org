import Container from "frontend/components/Container";
import FileUpload, { createValue } from "frontend/components/FileUpload";
import SiteHead from "frontend/components/SiteHead";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { userSchema, validateOne } from "shared/validations";
import { prisma } from "backend/db";
import { authenticate } from "backend/authenticate";
import Custom404 from "pages/404";

export default function EditUserProfile(props: {
  name: string;
  bio: string;
  image: string;
}) {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return "Loading...";
  if (!session) return <Custom404 />;

  const userId = session.userId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: props.name,
      bio: props.bio,
      image: createValue(props.image),
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    completed: boolean;
    body: any;
  }>();

  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    const response = await fetch(`/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image:
          typeof data.image === "string"
            ? data.image
            : (
                await data.image.upload()
              )[0],
      }),
    });
    const body = await response.json();
    setResult({ ok: response.ok, completed: true, body });
    setIsLoading(false);
    if (response.ok) {
      router.push(`/user/${userId}`);
    }
  });

  return (
    <Container>
      <SiteHead />
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl mb-2">Edit Profile</h1>
        {!isLoading && result && !result.ok && result.completed && (
          <div className="bg-red-100 border border-red-500 rounded p-2">
            <p className="font-semibold mb-1">{result.body.message}</p>
            {result.body.errors && (
              <ul className="list-disc list-inside">
                {result.body.errors.map((e, index) => (
                  <li key={index}>{e}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        <form className="flex flex-col" onSubmit={submit}>
          <input
            className="rounded border px-3 py-2 mt-4"
            placeholder="Full Name"
            {...register("name", {
              validate: validateOne(userSchema, "name"),
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <Controller
            name="image"
            control={control}
            rules={{
              validate: (value) => {
                if (typeof value === "string") return true;
                return value?.files?.length > 0 || "Please select an image";
              },
            }}
            render={({ field }) => <FileUpload {...field} />}
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}

          <textarea
            className="rounded border px-3 py-2 mt-4"
            placeholder="Bio"
            {...register("bio", {
              validate: validateOne(userSchema, "bio"),
            })}
          />
          {errors.bio && (
            <span className="text-red-500">{errors.bio.message}</span>
          )}
          <span className="text-center mt-4">
            <button
              disabled={isLoading}
              className="rounded border px-3 py-1 hover:border-blue-400"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </span>
        </form>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const user = await authenticate(context.req).catch(() => {
    //pass
  });
  if (!user) {
    return { props: {} };
  }
  const userId = user.id;
  const { name, bio, image } = await prisma.user.findUnique({
    where: { id: userId },
  });
  return {
    props: { name, bio, image },
  };
}
