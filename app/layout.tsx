import type { Metadata } from "next";
import TopNav from "./components/TopNav";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  title: "Pomaah Cosmetics Dashboard",
  description: "Management software for Pomaah Cosmetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-50/50 flex flex-col min-h-screen selection:bg-rose-100 selection:text-rose-900`}>
        <TopNav />
        <main className="flex-1 w-full p-4 pb-24 md:p-8 shrink-0">
          {children}
        </main>
      </body>
    </html>
  );
}
