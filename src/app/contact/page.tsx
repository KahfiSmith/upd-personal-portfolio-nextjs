import type { Metadata } from "next";
import BackButton from "@/components/common/BackButton";
import ContactForm from "@/components/features/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Let's build together",
  description:
    "Reach out for collaborations, freelance work, or just to say hello.",
};

const contactMethods = [
  {
    label: "Email",
    value: "alkahfii2018@gmail.com",
    href: "mailto:alkahfii2018@gmail.com",
  },
  {
    label: "WhatsApp",
    value: "+62 812-6867-5668",
    href: "https://wa.me/6281268675668",
  },
];

const availabilityNotes = [
  { label: "Availability", value: "Open for freelance & contract" },
  { label: "Preferred zones", value: "Remote / GMT+7" },
  { label: "Response time", value: "Under 24 hours on weekdays" },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-cream text-charcoal">
      <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-orange-200/70 via-pink-100/50 to-transparent blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[22rem] w-[28rem] rounded-[999px] bg-gradient-to-br from-cyan-100/50 via-indigo-100/50 to-transparent blur-[150px]" />
        <div className="absolute top-1/3 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-br from-charcoal/10 to-transparent blur-[80px]" />
      </div>

      <section className="relative max-w-[96rem] mx-auto px-6 md:px-10 py-16 lg:py-24">
        <BackButton href="/" label="Back" className="mb-10" />

        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
                  Simple, modern, and always collaborative.
                  <span className="block text-charcoal/70 text-2xl sm:text-3xl font-light mt-4">
                    Let&apos;s craft interfaces that feel effortless.
                  </span>
                </h1>
                <p className="text-lg text-charcoal/70 leading-relaxed max-w-2xl">
                  Whether you need a polished marketing site, a complex
                  dashboard, or a design system brought to life, I keep the
                  process focused and calm. Send a note and I&apos;ll respond
                  with a plan, availability, and next steps.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex flex-col border-b border-charcoal/10 pb-4 transition hover:border-charcoal/40"
                  rel="noopener noreferrer"
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-charcoal/40">
                    {method.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-charcoal">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>

            <p className="font-mono uppercase tracking-[0.3em] text-xs text-charcoal/50">
              Working style
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {availabilityNotes.map((note) => (
                <div
                  key={note.label}
                  className="border-b border-charcoal/10 pb-3"
                >
                  <p className="text-sm text-charcoal/50">{note.label}</p>
                  <p className="text-lg font-medium">{note.value}</p>
                </div>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
