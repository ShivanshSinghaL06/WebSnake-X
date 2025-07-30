import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🐍 WebSnake X - Modern Snake Game",
  description: "A modern, responsive Snake Game built with Next.js, TypeScript, and Tailwind CSS. Play the classic Snake game with leaderboard, themes, and sound effects.",
  keywords: ["Snake Game", "Next.js", "TypeScript", "Tailwind CSS", "Web Game", "React", "Leaderboard"],
  authors: [{ name: "WebSnake X Team" }],
  openGraph: {
    title: "WebSnake X - Modern Snake Game",
    description: "Play the classic Snake game with modern features and leaderboard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebSnake X - Modern Snake Game",
    description: "Play the classic Snake game with modern features and leaderboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
