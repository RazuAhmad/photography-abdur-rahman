/**
 * Utility functions for image optimization
 */

// Function to create a tiny, blurred placeholder image
export const createPlaceholderImage = (
  src: string,
  width: number = 20,
  height: number = 20
): string => {
  // In a real implementation, this would generate a tiny base64 image
  // For now, we'll return a simple SVG placeholder
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23cccccc'/%3E%3C/svg%3E`;
};

// Function to generate responsive image srcset
export const generateSrcSet = (src: string, widths: number[]): string => {
  return widths
    .map((width) => {
      // In a real implementation, this would generate different sized images
      // For now, we'll just use the same image with different width descriptors
      return `${src} ${width}w`;
    })
    .join(", ");
};

// Function to get appropriate image sizes based on container
export const getResponsiveSizes = (isFullWidth: boolean = false): string => {
  if (isFullWidth) {
    return "(min-width: 1024px) 100vw, (min-width: 768px) 100vw, 100vw";
  }

  return "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
};

// Function to preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
  });
};

// Function to get image dimensions (in a real app, this would be done server-side)
export const getImageDimensions = async (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};
