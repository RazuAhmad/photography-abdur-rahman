import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
          404
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <Button variant="gold" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
