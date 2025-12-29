import { useState, lazy, Suspense } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./ui/OptimizedImage";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface GalleryProps {
  photos: Photo[];
}

const Gallery = ({ photos }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...new Set(photos.map((p) => p.category))];

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "auto";
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(
      (p) => p.id === selectedPhoto.id
    );
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredPhotos.length
        : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <section id="work" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
            Selected Works
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeFilter === category
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer opacity-0 animate-scale-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
              onClick={() => openLightbox(photo)}
            >
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                widths={[320, 640, 768, 1024]}
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-foreground font-display text-lg">
                    {photo.alt}
                  </p>
                  <p className="text-gold text-xs tracking-widest uppercase mt-1">
                    {photo.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("prev");
              }}
              className="absolute left-6 text-foreground hover:text-gold transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            <OptimizedImage
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              priority={true} // Lightbox images should load immediately
              onLoad={() => {}}
              widths={[640, 750, 828, 1080, 1200, 1920, 2048]}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("next");
              }}
              className="absolute right-6 text-foreground hover:text-gold transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-foreground font-display text-xl">
                {selectedPhoto.alt}
              </p>
              <p className="text-gold text-xs tracking-widest uppercase mt-1">
                {selectedPhoto.category}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
