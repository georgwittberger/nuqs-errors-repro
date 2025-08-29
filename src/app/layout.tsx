import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Nuqs Errors Reproduction",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <NuqsAdapter>
      <html lang="en">
        <body className="container mx-auto">{children}</body>
      </html>
    </NuqsAdapter>
  );
}
