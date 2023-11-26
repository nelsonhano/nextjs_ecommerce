import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flowmazon",
  description: "Offering you best product for consumption",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-4 m-auto min-w-fit" data-theme="nord">
          {children}
        </main>
      </body>
    </html>
  );
}
