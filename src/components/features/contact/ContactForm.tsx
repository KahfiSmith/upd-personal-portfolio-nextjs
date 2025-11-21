"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

const fieldStyle =
  "w-full border-b border-charcoal/20 bg-transparent px-1 pb-3 text-charcoal placeholder:text-charcoal/50 focus:border-charcoal focus:outline-none transition";

const PROJECT_OPTIONS = [
  "Landing Page",
  "Dashboard",
  "Design System",
  "UI Revamp",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [projectChoice, setProjectChoice] = useState<string>("");
  const [customProject, setCustomProject] = useState("");

  const handleProjectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProjectChoice(value);
    if (value !== "Other") {
      setCustomProject("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const projectType =
      projectChoice === "Other" ? customProject.trim() : projectChoice || "";
    const message = (data.get("message") as string) ?? "";

    const subject = encodeURIComponent(
      `Portfolio Inquiry${name ? ` - ${name}` : ""}`
    );

    const bodyLines = [
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      projectType ? `Project: ${projectType}` : null,
      message ? `Message:\n${message}` : null,
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join("\n\n"));

    window.location.href = `mailto:alkahfii2018@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
    setProjectChoice("");
    setCustomProject("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-[0.35em] text-charcoal/50">
          Start a Conversation
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-charcoal leading-tight">
          Tell me about your idea
        </h2>
        <p className="text-charcoal/60 text-base leading-relaxed">
          Drop a few details and I&apos;ll reply with a direction and timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          className={fieldStyle}
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
        />
        <input
          className={fieldStyle}
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-charcoal/40">
          Project type
        </p>
        <div className="flex flex-wrap gap-3">
          {PROJECT_OPTIONS.map((option, index) => {
            const isActive = projectChoice === option;
            return (
              <label
                key={option}
                className={`cursor-pointer border px-4 py-2 rounded-full text-sm transition ${
                  isActive
                    ? "border-charcoal bg-charcoal text-cream"
                    : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50"
                }`}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={option}
                  className="sr-only"
                  onChange={handleProjectChange}
                  checked={isActive}
                  required={projectChoice === "" && index === 0}
                />
                {option}
              </label>
            );
          })}
        </div>
        {projectChoice === "Other" && (
          <input
            className={fieldStyle}
            name="projectTypeOther"
            placeholder="Describe your project"
            value={customProject}
            onChange={(e) => setCustomProject(e.target.value)}
            required
          />
        )}
      </div>

      <textarea
        className={`${fieldStyle} min-h-[160px] resize-none`}
        name="message"
        placeholder="Share a short brief, goals, or timeline"
        required
      />

      <button
        type="submit"
        className="w-full border border-charcoal text-charcoal uppercase tracking-[0.3em] text-sm py-4 hover:bg-charcoal hover:text-cream transition"
      >
        Compose Email
      </button>

      {status === "sent" && (
        <p className="text-sm text-emerald-600">
          Opening your email client... feel free to edit before sending.
        </p>
      )}
    </form>
  );
}
