// import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
// import "./globals.css";
// import Providers from "./providers";
// import { Toaster } from "sonner";
// import Whatsapp from "@/components/custom icons/whatsapp";

// const manrope = Manrope({
//   variable: "--font-manrope",
//   subsets: ["latin"],
//   display: "swap", // يعرض fallback font فوراً
//   preload: true, // يحمله قبل كل حاجة
//   fallback: ["sans-serif"],
// });
// export const metadata: Metadata = {
//   title:
//     "Airport Assist | VIP Meet & Greet, Fast Track & Luxury Airport Concierge",
//   description:
//     "Premium VIP Airport Concierge offering Meet & Greet, Fast Track immigration & security, private entrances, chauffeur service, and seamless luxury travel assistance in over 100+ destinations worldwide.",
//   alternates: {
//     canonical: "https://www.airport-assist.com",
//   },
//   openGraph: {
//     title:
//       "Airport Assist | VIP Meet & Greet, Fast Track & Luxury Airport Concierge",
//     description:
//       "Experience luxury airport assistance with Fast Track, private entrances, chauffeur services, dedicated concierge, and exclusive private suites — available at 100+ major airports worldwide.",
//     url: "https://www.airport-assist.com",
//     type: "website",
//     images: [
//       {
//         url: "https://www.airport-assist.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Airport Assist VIP Concierge",
//       },
//     ],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         //  className={`capitalize ${manrope.variable} antialiased`}
//         className={`capitalize ${manrope.variable} ${manrope.className} antialiased`}
//       >
//         <Providers>{children}</Providers>
//         {/* WhatsApp Floating Button */}
//         <a
//           href="https://wa.me/442045177711?text=Hello%20I%20would%20like%20to%20book%20airport%20assistance"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Chat on WhatsApp (opens in a new tab)"
//           className="fixed bottom-5 right-5 z-50 text-white p-4 transition-all duration-300 hover:scale-110 w-max h-max focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
//         >
//           <Whatsapp className="w-12 h-12" />
//           <span className="sr-only">Chat on WhatsApp (opens in a new tab)</span>
//         </a>
//         <Toaster />
//       </body>
//     </html>
//   );
// }
//

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import Whatsapp from "@/components/custom icons/whatsapp";
import GTMPageView from "./GTM";
import SmoothScroll from "./SmoothScroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
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
}: {
  children: React.ReactNode;
}) {
  const isMac = navigator.platform.toUpperCase().includes("MAC");

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K7R4556M');
            `,
          }}
        />
      </head>

      <body
        className={`capitalize ${manrope.variable} ${manrope.className} antialiased`}
      >
        {!isMac && <SmoothScroll />}
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K7R4556M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <GTMPageView />

          {children}
        </Providers>
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/442045177711?text=Hello%20I%20would%20like%20to%20book%20airport%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-2 right-2 z-50 text-white p-4 transition-all duration-300 hover:scale-110 w-max h-max focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
        >
          <Whatsapp className="w-12 h-12" />
        </a>
        <Toaster />
      </body>
    </html>
  );
}
