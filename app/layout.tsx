import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Htet Ar Yan | Full-Stack Developer",
  description:
    "Full-stack developer crafting beautiful and performant web applications. Open to work and always looking for new opportunities.",
  keywords: [
    "Htet Ar Yan",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Htet Ar Yan" }],
  openGraph: {
    title: "Htet Ar Yan | Full-Stack Developer",
    description:
      "Full-stack developer crafting beautiful and performant web applications.",
    type: "website",

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

