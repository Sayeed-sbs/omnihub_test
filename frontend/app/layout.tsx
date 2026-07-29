import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OMNIHUB | Future Marketplace",
  description: "Future Marketplace for premium technology, AI devices and next-generation innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full m-0 p-0 box-border selection:bg-cyan-500/30">
      <body className="antialiased min-h-screen w-full bg-[#050816] text-white overflow-x-hidden flex flex-col m-0 p-0">
        {children}
      </body>
    </html>
  );
}
