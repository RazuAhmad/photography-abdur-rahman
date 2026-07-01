import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MediaSkeletonProps {
  className?: string;
}

const MediaSkeleton = ({ className }: MediaSkeletonProps) => (
  <Skeleton
    aria-hidden="true"
    className={cn("media-skeleton rounded-none bg-charcoal-light/70", className)}
  />
);

export default MediaSkeleton;
