export default function BlogList() {
  return (
    <section className="max-w-[96rem] mx-auto px-6 md:px-8">
      <h2 className="text-2xl font-semibold mb-3">Latest Posts</h2>
      <ul className="space-y-3">
        <li>
          <a href="/blog/hello-world" className="font-medium hover:underline">
            Hello World
          </a>
          <p className="text-sm text-foreground/70">A starter post.</p>
        </li>
      </ul>
    </section>
  );
}

