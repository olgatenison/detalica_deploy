import type { Metadata } from "next";
import { Work_Sans, Noto_Sans } from "next/font/google";
import { Navbar } from "./components/Header";
import Footer from "./components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.detailica.com"),

  title: {
    default: "Detailica",
    template: "%s | Detailica",
  },

  description:
    "Integrated project partner supporting architecture and engineering teams with documentation, BIM modelling and technical project delivery across international markets.",

  applicationName: "Detailica",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Detailica",
    description:
      "Integrated project partner supporting architecture and engineering teams with documentation, BIM modelling and technical project delivery across international markets.",
    url: "https://www.detailica.com",
    siteName: "Detailica",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Detailica — Architecture and Engineering Project Partner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Detailica",
    description:
      "Integrated project partner supporting architecture and engineering teams with documentation, BIM modelling and technical project delivery across international markets.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />

        {children}

        <Footer />
      </body>
      <GoogleAnalytics gaId="G-130BFSSVZ7" />
    </html>
  );
}
