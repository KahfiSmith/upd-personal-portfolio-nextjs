import Footer from "@/components/common/Footer";
import PageTransitionProvider from "@/components/common/PageTransitionProvider";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

// Local fonts from public/fonts
const outfit = localFont({
  src: "../../public/fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});

const playfair = localFont({
  src: "../../public/fonts/PlayfairDisplay-VariableFont_wght.ttf",
  variable: "--font-playfair",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteOrigin = new URL(siteUrl).origin;
const title = "Kahfi Smith | Frontend Web Developer";
const description =
  "Personal portfolio of Kahfi Smith – frontend engineer crafting polished digital experiences with performance and precision.";
const socialProfiles = [
  "https://github.com/kahfismith",
  "https://www.linkedin.com/in/mohamad-al-kahfi-b48107271/",
  "https://www.facebook.com/kahfi.smith.2025/",
  "https://www.instagram.com/alkaahfi__/",
];
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamad Al-Kahfi",
  alternateName: "Kahfi Smith",
  url: siteOrigin,
  jobTitle: "Frontend Web Developer",
  image: `${siteOrigin}/images/kahfi-og.png`,
  email: "mailto:alkahfii2018@gmail.com",
  sameAs: socialProfiles,
  worksFor: {
    "@type": "Organization",
    name: "Kahfi Smith Studio",
    url: siteOrigin,
  },
  knowsAbout: [
    "Frontend Development",
    "Frontend Web Developer",
    "Frontend Developer",
    "Frontend Engineering",
    "React.js",
    "Next.js",
    "TypeScript",
    "Web Performance",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Kahfi Smith",
  },
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Kahfi Smith Portfolio",
    images: [
      {
        url: "/images/kahfi-og.png",
        width: 1299,
        height: 1243,
        alt: "KS monogram on a cobalt background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/kahfi-og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/kahfi-og.png", sizes: "192x192", type: "image/png" },
      { url: "/kahfi-og.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/kahfi-og.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/kahfi-og.png" type="image/png" />
        <link rel="apple-touch-icon" href="/kahfi-og.png" />
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body className={`${outfit.variable} ${playfair.variable} ${spaceGrotesk.variable} antialiased`}>
        <PageTransitionProvider>
          <SmoothScrollProvider>
            {children}
            <Footer />
          </SmoothScrollProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
