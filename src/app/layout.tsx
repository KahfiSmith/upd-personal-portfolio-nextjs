import Footer from "@/components/common/Footer";
import PageTransitionProvider from "@/components/common/PageTransitionProvider";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import {
  getDefaultOpenGraphImage,
  getDefaultTwitterImage,
  getRequestMetadataBase,
  getSiteOrigin,
  toAbsoluteUrl,
} from "@/lib/seo";
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

const siteOrigin = getSiteOrigin();
const title = "Mohamad Al-Kahfi | Frontend Web Developer";
const description =
  "Personal portfolio of Mohamad Al-Kahfi – frontend engineer crafting polished digital experiences with performance and precision.";
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
  url: siteOrigin,
  jobTitle: "Frontend Web Developer",
  image: siteOrigin ? toAbsoluteUrl("/opengraph-image") : undefined,
  email: "mailto:alkahfii2018@gmail.com",
  sameAs: socialProfiles,
  worksFor: {
    "@type": "Organization",
    name: "Mohamad Al-Kahfi Studio",
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

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await getRequestMetadataBase();

  return {
    metadataBase,
    title: {
      default: title,
      template: "%s | Mohamad Al-Kahfi",
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: "Mohamad Al-Kahfi Portfolio",
      images: [getDefaultOpenGraphImage()],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getDefaultTwitterImage()],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/kahfi-og.png", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/kahfi-og.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} ${spaceGrotesk.variable} antialiased`}
      >
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
