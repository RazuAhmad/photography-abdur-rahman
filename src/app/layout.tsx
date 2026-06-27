import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const siteUrl = "https://photographer-abdur-rahman-nt5b.vercel.app";
const title = "Abdur Rahman Razu | Professional Photographer";
const description =
  "Professional photography services by Abdur Rahman Razu. Specializing in portrait, wedding, editorial, and documentary photography. Based in Dhaka, Bangladesh.";
const previewImage = `${siteUrl}/og-image.jpg`;

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Abdur Rahman Razu" }],
  keywords: [
    "photographer",
    "portrait photography",
    "wedding photography",
    "documentary photography",
    "Dhaka",
    "Bangladesh",
    "freelance photographer",
  ],
  openGraph: {
    title,
    description:
      "Capturing moments that transcend time. Professional photography services in Dhaka, Bangladesh.",
    type: "website",
    url: siteUrl,
    siteName: "Abdur Rahman Razu Photography",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Portrait of Abdur Rahman Razu, professional photographer in Dhaka, Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@razuphotography",
    title,
    description:
      "Capturing moments that transcend time. Professional photography services in Dhaka, Bangladesh.",
    images: [
      {
        url: previewImage,
        alt: "Portrait of Abdur Rahman Razu, professional photographer in Dhaka, Bangladesh",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
