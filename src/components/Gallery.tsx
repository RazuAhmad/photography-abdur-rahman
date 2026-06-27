"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import type { Photo, Video } from "@/data/media";

interface GalleryProps {
  photos: Photo[];
  videos: Video[];
}

const Gallery = ({ photos, videos }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const hasOpenModal = Boolean(selectedPhoto || selectedVideo);

  const categories = ["All", ...new Set(photos.map((p) => p.category))];

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    if (!hasOpenModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, hasOpenModal]);

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setSelectedVideo(null);
  };

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setSelectedPhoto(null);
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
    <section id="work" className="scroll-mt-24 py-24 px-6 bg-background">
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

        <div className="mb-10 text-center">
          <h3 className="font-display text-3xl font-light text-foreground">
            Photography
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold">
            Still Stories
          </p>
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
              onClick={() => openPhotoModal(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

        <div className="mt-24 mb-10 text-center">
          <h3 className="font-display text-3xl font-light text-foreground">
            Videography
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold">
            Motion Stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <article key={video.id} className="group">
              <button
                type="button"
                onClick={() => openVideoModal(video)}
                className="block w-full text-left"
                aria-label={`Play ${video.title}`}
              >
                <div className="relative aspect-video overflow-hidden border border-border bg-charcoal shadow-soft transition-colors duration-300 group-hover:border-gold/60">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/35 transition-colors duration-300 group-hover:bg-background/55">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/70 bg-background/70 text-gold shadow-soft transition-transform duration-300 group-hover:scale-110">
                      <Play size={28} fill="currentColor" />
                    </span>
                  </div>
                </div>
              </button>
              <div className="mt-4 text-left">
                <h4 className="font-display text-xl font-light text-foreground">
                  {video.title}
                </h4>
                {video.category && (
                  <p className="mt-1 text-xs uppercase tracking-widest text-gold">
                    {video.category}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Media Modal */}
        {hasOpenModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md animate-fade-in md:p-8"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors z-10"
              aria-label="Close media viewer"
            >
              <X size={32} />
            </button>

            {selectedPhoto && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhoto("prev");
                  }}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2 text-foreground transition-colors hover:border-gold hover:text-gold md:left-6 md:p-3"
                  aria-label="View previous photo"
                >
                  <ChevronLeft size={36} />
                </button>

                <div
                  className="flex max-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col items-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="max-h-[calc(100vh-11rem)] max-w-full object-contain"
                    width={selectedPhoto.src.width}
                    height={selectedPhoto.src.height}
                    placeholder="blur"
                    sizes="90vw"
                  />
                  <div className="text-center">
                    <p className="text-foreground font-display text-xl">
                      {selectedPhoto.alt}
                    </p>
                    <p className="text-gold text-xs tracking-widest uppercase mt-1">
                      {selectedPhoto.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhoto("next");
                  }}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2 text-foreground transition-colors hover:border-gold hover:text-gold md:right-6 md:p-3"
                  aria-label="View next photo"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            {selectedVideo && (
              <div
                className="w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video overflow-hidden border border-border bg-charcoal shadow-soft">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="mt-5 text-center">
                  <p className="text-foreground font-display text-2xl">
                    {selectedVideo.title}
                  </p>
                  {selectedVideo.category && (
                    <p className="text-gold text-xs tracking-widest uppercase mt-1">
                      {selectedVideo.category}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
