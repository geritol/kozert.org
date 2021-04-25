import Container from "frontend/components/Container";
import SiteHead from "frontend/components/SiteHead";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { projectSchema, validateOne } from "shared/validations";

export default function CreateProject() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", description: "" } });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    completed: boolean;
    body: any;
  }>();

  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    const response = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    setResult({ ok: response.ok, completed: true, body });
    setIsLoading(false);
    if (response.ok) {
      router.push(`/project/${body.data.id}`);
    }
  });

  return (
    <Container>
      <SiteHead />
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl mb-2">New Project</h1>
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
            placeholder="Project title"
            {...register("title", {
              validate: validateOne(projectSchema, "title"),
            })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <textarea
            className="rounded border px-3 py-2 mt-4"
            placeholder="Project description (markdown)"
            {...register("description", {
              validate: validateOne(projectSchema, "description"),
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
          <span className="text-center mt-4">
            <button
              disabled={isLoading}
              className="rounded border px-3 py-1 hover:border-blue-400"
            >
              {isLoading ? "Loading..." : "Create Project"}
            </button>
          </span>
        </form>
      </div>
    </Container>
  );
}
