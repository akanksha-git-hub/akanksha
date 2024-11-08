import { Inter, Playfair_Display, Instrument_Sans } from "next/font/google";
import LocalFont from "next/font/local"
import "./globals.css";
import Header from "@/components/Header";
import NotificationBar from "@/components/NotificationBar";
import Footer from "@/components/Footer";
import LenisScrollContext from "@/components/LenisScrollContext";

const inter = Inter({ 
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"] 
})

const playFairDisplay = Playfair_Display({
  variable: '--font-pf-d',
  weight: ['400', '500', '600'],
  style: ["italic", "normal"],
  subsets: ["latin"]
})

const instrumentSans = Instrument_Sans({
  variable: '--font-inst-sans',
  weight: ['400', '500', '600'],
  subsets: ["latin"]
})

const ambitRegular = LocalFont({
  src: "../../public/font/AmbitRegular.woff2",
  weight: '400',
  variable: '--font-ambit-reg',
  style: 'normal'
})

const ambitItalic = LocalFont({
  src: "../../public/font/Ambit Italic.woff2",
  weight: "400",
  variable: "--font-ambit-italic",
  style: "normal"
})

const ambitSemiBold = LocalFont({
  src: "../../public/font/AmbitSemiBold.woff2",
  weight: '700',
  variable: '--font-ambit-semibold',
  style: 'normal'
})

const ambitBold = LocalFont({
  src: "../../public/font/AmbitBold.woff2",
  weight: '900',
  variable: '--font-ambit-bold',
  style: 'normal'
})

const ambitLight = LocalFont({
  src: "../../public/font/AmbitLight.woff2",
  weight: '300',
  variable: '--font-ambit-light',
  style: 'normal'
})

const ambitBlack = LocalFont({
  src: "../../public/font/AmbitBlack.woff2",
  weight: '400',
  variable: '--font-ambit-black',
  style: 'normal'
})

export const metadata = {
  title: "Akanksha",
  description: "Welcome to Akanksha",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`
          ${inter.variable} ${instrumentSans.variable} 
          ${playFairDisplay.variable} ${ambitRegular.variable}
          ${ambitBlack.variable} ${ambitBold.variable} ${ambitLight.variable}
          ${ambitSemiBold.variable} ${ambitItalic.variable}
        `}
      >
        <LenisScrollContext>
          <Header />
          <NotificationBar />
          {children}
          <Footer />
        </LenisScrollContext>
      </body>
    </html>
  );
}
