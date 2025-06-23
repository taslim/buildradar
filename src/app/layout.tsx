import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "~/components/ui/footer";

export const metadata: Metadata = {
  title: "BuildRadar - Discover Companies Being Built",
  description: "Discover and explore startups and companies being built by entrepreneurs across various industries including AgriTech, FinTech, EdTech, Creative, and more.",
  icons: [
    { 
      rel: "icon", 
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%22 y=%2258%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:65px;font-weight:bold%22>🏗️</text></svg>",
      type: "image/svg+xml" 
    },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <div className="pb-12 sm:pb-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
