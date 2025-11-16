import Footer from "@/components/common/Footer";
import PageTransitionProvider from "@/components/common/PageTransitionProvider";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
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

const title = "Kahfi Smith | Frontend Web Developer";
const description =
  "Personal portfolio of Kahfi Smith – frontend engineer crafting polished digital experiences with performance and precision.";

export const metadata: Metadata = {
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
