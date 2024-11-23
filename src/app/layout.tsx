import type { Metadata } from "next";
import localFont from "next/font/local";

// import Link from 'next/link'
import "./globals.css";

const FragmentMono = localFont({
  src: "./../../public/FragmentMono-Italic.ttf",
  variable: "--font-Fragment-Mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Calculor",
  description: "A calculator website.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FragmentMono.variable} antialiased`}
      >
      {children}
      </body>
    </html>
  );
}
