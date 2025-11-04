import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 sm:p-20">
      <h1 className="text-3xl font-semibold mb-4">About</h1>
      <p className="text-base text-foreground/80">
        This is the About page. Add your bio and site info here.
      </p>
    </main>
  );
}

