import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { aboutPortrait, heroBg, photos, videos } from "@/data/media";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero heroImage={heroBg} />
      <Gallery photos={photos} videos={videos} />
      <About aboutImage={aboutPortrait} />
      <Contact />
      <Footer />
    </main>
  );
}
