"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import MediaSkeleton from "./MediaSkeleton";
import type { Photo, Video } from "@/data/media";

interface GalleryProps {
  photos: Photo[];
  videos: Video[];
}

const ArchiveLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 border border-gold/50 px-6 py-3 text-xs uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <span>{label}</span>
    <ExternalLink className="h-4 w-4" aria-hidden="true" />
  </a>
);

const getVideoEmbedUrl = (video: Video) => {
  if (video.provider === "youtube") {
    return `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
  }

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    video.facebookUrl
  )}&show_text=false&autoplay=true`;
};

const Gallery = ({ photos, videos }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loadedPhotoIds, setLoadedPhotoIds] = useState<Set<number>>(
    () => new Set()
  );
  const [loadedVideoIds, setLoadedVideoIds] = useState<Set<number>>(
    () => new Set()
  );
  const [isModalPhotoLoaded, setIsModalPhotoLoaded] = useState(false);
  const [isModalVideoLoaded, setIsModalVideoLoaded] = useState(false);
  const hasOpenModal = Boolean(selectedPhoto || selectedVideo);

  const categories = ["All", ...new Set(photos.map((p) => p.category))];

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedVideo(null);
    setIsModalPhotoLoaded(false);
    setIsModalVideoLoaded(false);
  }, []);

  const markPhotoLoaded = useCallback((photoId: number) => {
    setLoadedPhotoIds((currentIds) => {
      if (currentIds.has(photoId)) return currentIds;
      const nextIds = new Set(currentIds);
      nextIds.add(photoId);
      return nextIds;
    });
  }, []);

  const markVideoLoaded = useCallback((videoId: number) => {
    setLoadedVideoIds((currentIds) => {
      if (currentIds.has(videoId)) return currentIds;
      const nextIds = new Set(currentIds);
      nextIds.add(videoId);
      return nextIds;
    });
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

  useEffect(() => {
    videos.forEach((video) => {
      if (video.provider === "facebook") {
        markVideoLoaded(video.id);
      }
    });
  }, [markVideoLoaded, videos]);

  const openPhotoModal = (photo: Photo) => {
    setIsModalPhotoLoaded(false);
    setIsModalVideoLoaded(false);
    setSelectedPhoto(photo);
    setSelectedVideo(null);
  };

  const openVideoModal = (video: Video) => {
    setIsModalPhotoLoaded(false);
    setIsModalVideoLoaded(false);
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
    setIsModalPhotoLoaded(false);
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
            (() => {
              const isPhotoLoaded = loadedPhotoIds.has(photo.id);

              return (
                <div
                  key={photo.id}
                  className="group relative aspect-[4/5] overflow-hidden cursor-pointer opacity-0 animate-scale-in"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                  onClick={() => openPhotoModal(photo)}
                  aria-busy={!isPhotoLoaded}
                >
                  {!isPhotoLoaded && <MediaSkeleton className="absolute inset-0" />}
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                      isPhotoLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    onLoad={() => markPhotoLoaded(photo.id)}
                    onLoadingComplete={() => markPhotoLoaded(photo.id)}
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
              );
            })()
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ArchiveLink
            href="https://www.flickr.com/photos/mohammedabdurrahman"
            label="See More Photos on Flickr"
          />
        </div>

        <div className="mt-20 mb-10 text-center">
          <h3 className="font-display text-3xl font-light text-foreground">
            Videography
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold">
            Motion Stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            (() => {
              const isVideoLoaded = loadedVideoIds.has(video.id);
              const isYouTubeVideo = video.provider === "youtube";

              return (
                <article key={video.id} className="group">
                  <button
                    type="button"
                    onClick={() => openVideoModal(video)}
                    className="block w-full text-left"
                    aria-label={`Play ${video.title}`}
                  >
                    <div
                      className="relative aspect-video overflow-hidden border border-border bg-charcoal shadow-soft transition-colors duration-300 group-hover:border-gold/60"
                      aria-busy={!isVideoLoaded}
                    >
                      {!isVideoLoaded && (
                        <MediaSkeleton className="absolute inset-0" />
                      )}
                      {isYouTubeVideo ? (
                        <Image
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                            isVideoLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          loading="lazy"
                          onLoad={() => markVideoLoaded(video.id)}
                          onLoadingComplete={() => markVideoLoaded(video.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--gold)/0.24),transparent_34%),linear-gradient(135deg,hsl(var(--charcoal-light)),hsl(var(--background)))]">
                          <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                            <span className="border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold">
                              Facebook Video
                            </span>
                          </div>
                          <div className="absolute inset-x-6 bottom-6">
                            <p className="font-display text-2xl font-light text-foreground">
                              The Untrained Eye
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
                              Watch Video
                            </p>
                          </div>
                        </div>
                      )}
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-background/35 transition-all duration-300 group-hover:bg-background/55 ${
                          isYouTubeVideo && !isVideoLoaded
                            ? "opacity-0"
                            : "opacity-100"
                        }`}
                      >
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
              );
            })()
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ArchiveLink
            href="https://www.facebook.com/theUntrainedEye247"
            label="See More Videos on Facebook"
          />
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
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: `${selectedPhoto.src.width} / ${selectedPhoto.src.height}`,
                      width: `min(90vw, calc((100vh - 11rem) * ${
                        selectedPhoto.src.width / selectedPhoto.src.height
                      }), 72rem)`,
                    }}
                    aria-busy={!isModalPhotoLoaded}
                  >
                    {!isModalPhotoLoaded && (
                      <MediaSkeleton className="absolute inset-0" />
                    )}
                    <Image
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      className={`object-contain transition-opacity duration-500 ${
                        isModalPhotoLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      fill
                      placeholder="blur"
                      sizes="90vw"
                      onLoad={() => setIsModalPhotoLoaded(true)}
                      onLoadingComplete={() => setIsModalPhotoLoaded(true)}
                    />
                  </div>
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
                <div
                  className="relative aspect-video w-full overflow-hidden border border-border bg-charcoal shadow-soft"
                  aria-busy={!isModalVideoLoaded}
                >
                  {!isModalVideoLoaded && (
                    <MediaSkeleton className="absolute inset-0" />
                  )}
                  <iframe
                    key={selectedVideo.id}
                    src={getVideoEmbedUrl(selectedVideo)}
                    title={selectedVideo.title}
                    className={`h-full w-full transition-opacity duration-500 ${
                      isModalVideoLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => setIsModalVideoLoaded(true)}
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
