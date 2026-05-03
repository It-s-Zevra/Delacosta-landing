import type { Metadata, Viewport } from "next";
import { Rufina, Montserrat } from "next/font/google";
import { ASSETS } from "@/lib/assets";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const rufina = Rufina({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-rufina",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = "https://delacosta.studio";
const SITE_TITLE = "Delacosta Studio · Joyas hechas a mano en Chile";
const SITE_DESCRIPTION =
  "Joyas únicas creadas por chilenas, para ti. Aros, collares, pulseras y anillos hechos a mano con perlas de río, oro y plata. Envíos a todo Chile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Delacosta Studio",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Delacosta Studio",
  authors: [{ name: "Delacosta Studio" }],
  creator: "Delacosta Studio",
  publisher: "Delacosta Studio",
  category: "shopping",
  keywords: [
    "joyas chilenas",
    "joyas hechas a mano",
    "perlas de río",
    "aros",
    "collares",
    "pulseras",
    "anillos",
    "Delacosta Studio",
    "joyería Chile",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: ASSETS.logo.isotipoColor,
        sizes: "any",
        type: "image/png",
      },
    ],
    apple: ASSETS.logo.isotipoColor,
    shortcut: ASSETS.logo.isotipoColor,
  },
  openGraph: {
    type: "website",
    siteName: "Delacosta Studio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "es_CL",
    images: [
      {
        url: ASSETS.hero.body,
        width: 1200,
        height: 1500,
        alt: "Delacosta Studio · Joyas hechas a mano en Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [ASSETS.hero.body],
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#010169",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" className={`${rufina.variable} ${montserrat.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href={ASSETS.logo.isotipoWhite}
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}`,
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
