import type { Metadata } from "next";
import { AuthProvider } from "./provider/AuthProvider";
import { SideBar } from "../components/SideBar";
import { Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/provider/Theme-Provider";
import { cn } from "@/lib/utils";

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
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            `${openSans.variable} ${geistMono.variable} font-sans`
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            storageKey="discord-theme"
          >
            <div className="flex h-screen bg-white dark:bg-[#313338]">
              <SideBar />
              <main className="flex-1 ml-64 overflow-y-auto">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}