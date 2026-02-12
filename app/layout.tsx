import type { Metadata } from "next";
import { Manrope, Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";

const nunito = Nunito({
  variable: "--font-nuito",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Airport Assist | VIP Meet & Greet, Fast Track & Luxury Airport Concierge",
  description:
    "Premium VIP Airport Concierge offering Meet & Greet, Fast Track immigration & security, private entrances, chauffeur service, and seamless luxury travel assistance in over 100+ destinations worldwide.",
  alternates: {
    canonical: "https://www.airport-assist.com",
  },
  openGraph: {
    title:
      "Airport Assist | VIP Meet & Greet, Fast Track & Luxury Airport Concierge",
    description:
      "Experience luxury airport assistance with Fast Track, private entrances, chauffeur services, dedicated concierge, and exclusive private suites — available at 100+ major airports worldwide.",
    url: "https://www.airport-assist.com",
    type: "website",
    images: [
      {
        url: "https://www.airport-assist.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Airport Assist VIP Concierge",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${nunito.variable}antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
