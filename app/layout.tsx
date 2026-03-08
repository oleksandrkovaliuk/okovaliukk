import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";
import Link from "next/link";

import { Document } from "~/components/icons/document";
import { Smile } from "~/components/smile";
import { Button } from "~/components/ui/button";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oleksandr Kovaliuk",
  description: "Senior Frontend Engineer",
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
                size="auto"
                variant="clean"
                nativeButton={false}
                render={
                  <Link
                    target="_blank"
                    className="font-medium"
                    href="https://docs.google.com/document/d/1lSxGmmAbTFf0WhDlkPbs-R42bwhjz9WC0cXrivOu2u4/edit?tab=t.0"
                  >
                    <span className="sr-only">View my resume</span>

                    <Document className="size-7.5" />
                  </Link>
                }
              />
            </header>

            <Analytics />
            <SpeedInsights />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
