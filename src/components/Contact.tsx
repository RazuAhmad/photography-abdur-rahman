"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Linkedin,
  Aperture,
} from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, value: "razu.ahmad247@gmail.com", label: "Email" },
    { icon: Phone, value: "+8809658172570", label: "Phone" },
    { icon: MapPin, value: "Dhaka, Bangladesh", label: "Location" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/abdur_rahman_razu",
      label: "Instagram",
    },
    {
      icon: Aperture,
      href: "https://www.flickr.com/photos/mohammedabdurrahman",
      label: "Flickr Archive",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/razuahmad247",
      label: "LinkedIn",
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
            Let's Work
            <span className="block text-gold italic">Together</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Whether you're looking for a professional photographer for your
              next project or just want to say hello, I'd love to hear from you.
              Let's create something beautiful together.
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground tracking-wider uppercase">
                      {item.label}
                    </p>
                    <p className="text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                  placeholder="Osman Hadi"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                  placeholder="hadi247@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
