import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog index",
};

export default function BlogPage() {
  return (
    <main className="max-w-[96rem] mx-auto px-6 md:px-8 min-h-screen my-12 md:my-20 lg:my-24">
      <h1 className="text-3xl font-semibold mb-4">Blog</h1>
      <p className="text-base text-foreground/80 mb-6">
        Your latest posts will appear here.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link className="underline" href="/blog/hello-world">
            Hello World
          </Link>
        </li>
      </ul>
    </main>
  );
}

