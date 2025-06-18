import { cn } from "@/lib/utils";

interface ColorWheelProps {
  className?: string;
}

export default function ColorWheel({ className }: ColorWheelProps) {
  return (
    <div 
      className={cn("color-wheel rounded-full animate-spin-slow", className)}
      aria-label="Loading color analysis"
    />
  );
}
