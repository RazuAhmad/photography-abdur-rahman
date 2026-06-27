import { Camera, Award, Users } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

interface AboutProps {
  aboutImage: StaticImageData;
}

const About = ({ aboutImage }: AboutProps) => {
  const stats = [
    { icon: Camera, value: "500+", label: "Curated Photos Published Online" },
    { icon: Award, value: "5+", label: "Years of Photography Practice" },
    { icon: Users, value: "2000+", label: "Audience Reached on Social Media" },
  ];

  return (
    <section id="about" className="scroll-mt-24 py-24 px-6 bg-charcoal">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={aboutImage}
                alt="Abdur Rahman Razu - Photographer"
                className="object-cover"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold" />
          </div>

          {/* Content */}
          <div>
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
              The Artist Behind
              <span className="block text-gold italic">the Lens</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                I'm Abdur Rahman Razu, a freelance photographer specializing in
                documentary, street, and socio-cultural storytelling. I focus on
                capturing everyday life, social movements, and public events,
                crafting visual narratives that convey authenticity and impact.
              </p>
              <p>
                My approach combines technical skill with a strong sense of
                narrative, ensuring each photograph tells a compelling story. I
                aim to document moments that inform, inspire, and resonate with
                audiences.
              </p>
              <p className="text-gold font-medium">
                Currently open to collaborations with newspapers, media
                agencies, NGOs, and organizations seeking impactful visual
                journalism.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-display text-2xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
