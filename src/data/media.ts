import type { StaticImageData } from "next/image";
import heroBg from "@/assets/hero-bg.jpg";
import aboutPortrait from "@/assets/about-portrait.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";

export interface Photo {
  id: number;
  src: StaticImageData;
  alt: string;
  category: string;
}

interface BaseVideo {
  id: number;
  title: string;
  url: string;
  category?: string;
}

export type Video =
  | (BaseVideo & {
      provider: "youtube";
      youtubeId: string;
    })
  | (BaseVideo & {
      provider: "facebook";
      facebookReelId: string;
      facebookUrl: string;
    });

export { aboutPortrait, heroBg };

export const photos: Photo[] = [
  {
    id: 1,
    src: gallery1,
    alt: "Life in Buriganga River",
    category: "Documentary",
  },
  { id: 2, src: gallery2, alt: "Ship Factory Worker", category: "Editorial" },
  {
    id: 3,
    src: gallery3,
    alt: "Slum resident's Struggle",
    category: "Editorial",
  },
  { id: 4, src: gallery4, alt: "Slum residents life", category: "Editorial" },
  {
    id: 5,
    src: gallery5,
    alt: "Life in Buriganga River",
    category: "Documentary",
  },
  { id: 6, src: gallery6, alt: "The Craftsman", category: "Documentary" },
  {
    id: 7,
    src: gallery7,
    alt: "Life in Buriganga River",
    category: "Documentary",
  },
  { id: 8, src: gallery8, alt: "Urban life at Night", category: "Street" },
  { id: 9, src: gallery9, alt: "Life in Old Dhaka", category: "Street" },
  {
    id: 10,
    src: gallery10,
    alt: "Life in a Machinery factory",
    category: "Documentary",
  },
  { id: 11, src: gallery11, alt: "The Muddy Boy", category: "Portrait" },
  { id: 12, src: gallery12, alt: "Golden Childhood", category: "Portrait" },
];

export const videos: Video[] = [
  {
    id: 1,
    provider: "youtube",
    title: "Documentary Reel I",
    url: "https://youtu.be/359KKVA3hFU?si=0qMAOXSQdrOUpjRD",
    youtubeId: "359KKVA3hFU",
    category: "Documentary",
  },
  {
    id: 2,
    provider: "youtube",
    title: "Documentary Reel II",
    url: "https://youtu.be/F0ru-6_MQpY?si=WOCjpPmf30AoGFwd",
    youtubeId: "F0ru-6_MQpY",
    category: "Documentary",
  },
  {
    id: 3,
    provider: "facebook",
    title: "The Untrained Eye Reel I",
    url: "https://www.facebook.com/reel/1874750780102092",
    facebookUrl: "https://www.facebook.com/reel/1874750780102092",
    facebookReelId: "1874750780102092",
    category: "Social",
  },
  {
    id: 4,
    provider: "youtube",
    title: "Documentary Film Reel",
    url: "https://youtu.be/2EiMtc5SGcI?si=HZEKioo3roi5NwCU",
    youtubeId: "2EiMtc5SGcI",
    category: "Documentary",
  },
  {
    id: 5,
    provider: "facebook",
    title: "The Untrained Eye Reel III",
    url: "https://www.facebook.com/reel/1998788410696568",
    facebookUrl: "https://www.facebook.com/reel/1998788410696568",
    facebookReelId: "1998788410696568",
    category: "Social",
  },
];
