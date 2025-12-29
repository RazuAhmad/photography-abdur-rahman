import { useState, useRef, useEffect } from "react";
import {
  createPlaceholderImage,
  getResponsiveSizes,
  generateSrcSet,
} from "@/utils/imageUtils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  isFullWidth?: boolean;
  srcSet?: string;
  widths?: number[];
}

const OptimizedImage = ({
  src,
  alt,
  className = "",
  placeholder,
  blurDataURL,
  priority = false,
  sizes,
  onLoad,
  isFullWidth = false,
  widths = [320, 640, 768, 1024, 1280, 1536],
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate placeholder if not provided
  const placeholderImage = blurDataURL || createPlaceholderImage(src);
  const responsiveSizes = sizes || getResponsiveSizes(isFullWidth);
  const responsiveSrcSet = generateSrcSet(src, widths);

  useEffect(() => {
    if (!imgRef.current) return;

    // If priority is true, load immediately
    if (priority) {
      imgRef.current.src = src;
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imgRef.current!.src = src;
            observer.unobserve(imgRef.current!);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before element comes into view
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder or blur effect */}
      <div
        className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${placeholderImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Loading skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        alt={alt}
        sizes={responsiveSizes}
        srcSet={responsiveSrcSet}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
      />

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Failed to load image
          </span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
