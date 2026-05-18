import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BANG TELOR: Farm Jatiasih",
  description: "Produsen & Supplier Telur Ayam Kebutuhan Industri Berkualitas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}

