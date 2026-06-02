import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ReelFeed — Vertical Scroll Video",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={dmSans.className}>
      <body className="bg-black text-white overflow-hidden">
        <div className="flex h-screen w-full overflow-hidden">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
