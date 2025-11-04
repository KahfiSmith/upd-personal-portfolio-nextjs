import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects list",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-8 sm:p-20">
      <h1 className="text-3xl font-semibold mb-4">Projects</h1>
      <p className="text-base text-foreground/80 mb-6">
        List your projects here. Each project can link to a detail page.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link className="underline" href="/projects/example-project">
            Example Project
          </Link>
        </li>
      </ul>
    </main>
  );
}

