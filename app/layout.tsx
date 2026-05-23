import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-hero",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Epoch — The Global AI Club for High School Students",
  description:
    "Epoch is a free, global, student-run AI club for high school students. Learn ML, build real projects, compete in hackathons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${spaceMono.variable} antialiased bg-[#080808] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
