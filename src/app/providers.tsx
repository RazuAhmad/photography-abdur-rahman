"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
};

export default Providers;
