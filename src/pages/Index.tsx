import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy load the Gallery component since it's image-heavy
const Gallery = lazy(() => import("@/components/Gallery"));

// Import images
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

const photos = [
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

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero heroImage={heroBg} />
      <Suspense
        fallback={<div className="py-24 text-center">Loading gallery...</div>}
      >
        <Gallery photos={photos} />
      </Suspense>
      <About aboutImage={aboutPortrait} />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
