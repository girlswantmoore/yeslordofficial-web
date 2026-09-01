import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import SiteChrome from "../components/SiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yes Lord",
  description: "Faith. Fashion. Purpose.",

  openGraph: {
    title: "Yes Lord",
    description: "Faith. Fashion. Purpose.",
    url: "https://yeslord.shop",
    siteName: "Yes Lord",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Yes Lord",
    description: "Faith. Fashion. Purpose.",
    images: ["/og-image.jpg"],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maintenancePage =
    (await headers()).get("x-yeslord-maintenance-page") === "1";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <CartProvider>
          <SiteChrome maintenancePage={maintenancePage}>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
