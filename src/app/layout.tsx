import type { Metadata } from "next";
import { AuthProvider } from "./provider/AuthProvider";
import { Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/provider/Theme-Provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "./provider/modal-provider";


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
            <div >
              <main >
                <ModalProvider />
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}