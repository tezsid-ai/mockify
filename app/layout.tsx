import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockify",
  description: "Create premium product and UI mockups with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="w-full bg-foreground/5">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3 text-sm md:px-10">
            <Link href="/" className="font-semibold text-foreground">
              Mockify
            </Link>
            <span className="inline-flex items-center rounded-full border border-foreground/20 bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/80">
              Beta Version
            </span>
          </div>
        </header>

        {children}

        <footer className="mt-auto w-full bg-foreground/5">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-6 py-4 text-sm text-foreground/70 md:flex-row md:items-center md:px-10">
            <span className="font-medium text-foreground">Mockify</span>
            <div className="flex items-center gap-4">
              <Link
                href="/disclaimer"
                className="font-medium text-foreground/70 hover:text-foreground"
              >
                Disclaimer
              </Link>
              <Link
                href="/privacy-policy"
                className="font-medium text-foreground/70 hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
