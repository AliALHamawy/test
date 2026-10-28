import * as React from "react";
import { cn } from "@/lib/utils";

interface HotspotProps {
  x: number;
  y: number;
  title: string;
  description: string;
  visible: boolean;
}

export function Hotspot({ x, y, title, description, visible }: HotspotProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none",
        visible ? "opacity-100 translate-y-0 transition-all duration-500" : "opacity-0 translate-y-4 transition-all duration-500"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-primary ring-2 ring-background ring-offset-2 shadow-lg" />
        <div className="absolute -top-10 -left-1/2 w-48 transform -translate-x-1/2">
          <div className="absolute inset-0 border-b border-border opacity-0 animate-pin-left opacity-100" />
        </div>
        <div className="z-10 mt-2 max-w-xs rounded-xl border border-border bg-card p-4 shadow-xl text-sm">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
