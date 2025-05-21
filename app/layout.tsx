import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "./ApolloWrapper";
import Header from "@/components/layout/Header/Header";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Jugá Tenis",
  description:
    "Un sitio para jugadores de tenis amateur que quieran encontrar gente para jugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = null;

  return (
    <html lang="es">
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <ApolloWrapper>
          <Header user={user} />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
