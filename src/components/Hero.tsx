import { ArrowDown } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { Button } from "./ui/button";

interface HeroProps {
  heroImage: StaticImageData;
}

const Hero = ({ heroImage }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Photography by Abdur Rahman Razu"
          className="object-cover opacity-40"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="opacity-0 animate-fade-up stagger-1">
          <span className="inline-block px-4 py-2 border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase mb-8">
            Available for Freelance
          </span>
        </div>

        <h1 className="opacity-0 animate-fade-up stagger-2 font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-tight mb-6">
          Abdur Rahman
          <span className="block text-gold italic">Razu</span>
        </h1>

        <p className="opacity-0 animate-fade-up stagger-3 font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Capturing moments that transcend time. Specializing in portrait,
          editorial, and documentary photography.
        </p>

        <div className="opacity-0 animate-fade-up stagger-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg" asChild>
            <a href="#work">View Portfolio</a>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
        <a
          href="#work"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
