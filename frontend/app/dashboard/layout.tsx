import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AulaSync",
  description:
    "Sistema de gestión académica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="es"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
      `}
    >

      <body>

        {children}

      </body>

    </html>

  );

}