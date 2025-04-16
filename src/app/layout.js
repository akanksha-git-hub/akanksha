import { Inter, Playfair_Display, Instrument_Sans } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import LenisScrollContext from "@/components/LenisScrollContext";
import FooterMain from "@/components/v2-components/footer/footer-main";
import HeaderDataLayer from "@/components/v2-components/header/header-data-layer";

// Google Fonts
const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const playFairDisplay = Playfair_Display({
  variable: "--font-pf-d",
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-inst-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Local Fonts
const ambitRegular = LocalFont({
  src: "../../public/font/AmbitRegular.woff2",
  weight: "400",
  variable: "--font-ambit-reg",
  style: "normal",
});

const ambitItalic = LocalFont({
  src: "../../public/font/Ambit Italic.woff2",
  weight: "400",
  variable: "--font-ambit-italic",
  style: "normal",
});

const ambitSemiBold = LocalFont({
  src: "../../public/font/AmbitSemiBold.woff2",
  weight: "700",
  variable: "--font-ambit-semibold",
  style: "normal",
});

const ambitBold = LocalFont({
  src: "../../public/font/AmbitBold.woff2",
  weight: "900",
  variable: "--font-ambit-bold",
  style: "normal",
});

const ambitLight = LocalFont({
  src: "../../public/font/AmbitLight.woff2",
  weight: "300",
  variable: "--font-ambit-light",
  style: "normal",
});

const ambitBlack = LocalFont({
  src: "../../public/font/AmbitBlack.woff2",
  weight: "400",
  variable: "--font-ambit-black",
  style: "normal",
});

// ✅ SEO Metadata and Favicon
export const metadata = {
  title: "Akanksha Foundation",
  description: "Empowering children through education and art.",
  keywords: ["Akanksha Foundation", "education", "non-profit", "children", "India"],
  authors: [{ name: "Akanksha Foundation", url: "https://www.akanksha.org" }],
  creator: "Akanksha Foundation",
  metadataBase: new URL("https://www.akanksha.org"),
  openGraph: {
    title: "Akanksha Foundation",
    description: "Empowering children through education and art.",
    url: "https://www.akanksha.org",
    siteName: "Akanksha Foundation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akanksha Foundation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akanksha Foundation",
    description: "Empowering children through education and art.",
    creator: "@akanksha_edu",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",              // ✅ SVG favicon
    shortcut: "/favicon.svg",          // ✅ Shortcut icon for older browsers
    apple: "/apple-touch-icon.png",    // ✅ Optional for Apple devices
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable} ${instrumentSans.variable} ${playFairDisplay.variable}
          ${ambitRegular.variable} ${ambitItalic.variable} ${ambitSemiBold.variable}
          ${ambitBold.variable} ${ambitLight.variable} ${ambitBlack.variable}
        `}
      >
        <LenisScrollContext>
          <HeaderDataLayer />
          {children}
          <FooterMain />
        </LenisScrollContext>
      </body>
    </html>
  );
}
