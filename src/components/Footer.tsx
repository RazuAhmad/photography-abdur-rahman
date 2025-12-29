const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-charcoal border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="#"
            className="font-display text-2xl font-light tracking-wider text-foreground hover:text-gold transition-colors"
          >
            ARR
          </a>

          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Abdur Rahman Razu. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#work"
              className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase"
            >
              Work
            </a>
            <a
              href="#about"
              className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
