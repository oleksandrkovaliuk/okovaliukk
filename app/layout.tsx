import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Copyright } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

import { CVTypography } from "~/components/icons/cv-typography";
import { Document } from "~/components/icons/document";
import { Sitemap } from "~/components/icons/sitemap";
import { Smile } from "~/components/smile";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || baseUrl),
  title: {
    default: "Oleksandr Kovaliuk",
    template: "%s | Oleksandr Kovaliuk",
  },
  description: "Senior Frontend Engineer",
  keywords: ["frontend", "engineer", "React", "Next.js"],
  authors: [{ name: "Oleksandr Kovaliuk", url: "https://okovaliukk.dev" }],
  creator: "Oleksandr Kovaliuk",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://okovaliukk.dev",
    siteName: "Oleksandr Kovaliuk",
    title: "Oleksandr Kovaliuk",
    description: "Senior Frontend Engineer",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Oleksandr Kovaliuk - Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oleksandr Kovaliuk",
    description: "Senior Frontend Engineer",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const acknowledged = jar.get("acknowledged")?.value === "true";

  return (
    <html lang="en" className={nunitoSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative flex h-svh flex-col overflow-hidden antialiased`}
      >
        <span className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-linear-to-t to-transparent" />

        <main className="after:from-background flex h-full flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12 sm:py-24">
            <header className="mb-12 flex items-center justify-between">
              <Smile defaultAcknowledged={acknowledged} className="size-10" />

              <Button
                size="icon-lg"
                variant="ghost"
                nativeButton={false}
                render={
                  <Link
                    target="_blank"
                    className="font-medium"
                    href="https://docs.google.com/document/d/16Y9rpyhHnK78Abioa9FBQzfh4kiG697ki0gusEVHgv4/edit?usp=sharing"
                  >
                    <span className="sr-only">View my resume</span>

                    <CVTypography />
                  </Link>
                }
              />
            </header>

            <Analytics />
            <SpeedInsights />
            {children}

            <footer>
              <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                <Button
                  size="auto"
                  variant="link"
                  nativeButton={false}
                  className="text-md"
                  render={
                    <Link
                      href="mailto:okovaliukk@proton.me"
                      aria-label="Email me"
                      target="_blank"
                    >
                      okovaliukk@proton.me
                    </Link>
                  }
                />
                thanks, bye
              </span>

              <Separator className="mt-1 mb-2" />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                  <Copyright className="size-3" />
                  {new Date().getFullYear()} Oleksandr Kovaliuk
                </span>

                <Button
                  size="icon-sm"
                  variant="ghost"
                  nativeButton={false}
                  render={
                    <Link
                      href="/sitemap.xml"
                      aria-label="Sitemap"
                      target="_blank"
                    >
                      <span className="sr-only">Sitemap</span>
                      <Sitemap className="size-3" />
                    </Link>
                  }
                />
              </div>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
