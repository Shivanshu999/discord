import type { Metadata } from "next";
import { AuthProvider } from "./provider/AuthProvider";
import  {Header}  from "../components/Header";
import { Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "A Discord-like chat application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${openSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <main className="pt-16 min-h-screen bg-[#36393f]">
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}