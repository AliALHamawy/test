"use client";

import { useScrollStore } from "@/lib/store/scroll";
import { Hotspot } from "./Hotspot";

/**
 * Isolates the scroll subscription from the rest of the hero so that the
 * per-frame progress updates never re-render the <Canvas> tree.
 */
export function HeroHotspots() {
    const progress = useScrollStore((state) => state.progress);

    return (
        <div className="pointer-events-none absolute inset-0 z-20">
            <Hotspot
                x={45}
                y={30}
                title="48MP Pro Camera"
                description="Triple-lens system with cinematic mode for creators."
                visible={progress > 0.25 && progress < 0.55}
            />
            <Hotspot
                x={55}
                y={45}
                title="Outer Display"
                description="Seamless cover-screen canvas for quick actions."
                visible={progress > 0.45 && progress < 0.75}
            />
            <Hotspot
                x={50}
                y={40}
                title="Unfolding Hinge"
                description="Smooth dual-display mechanism for immersive inner screen."
                visible={progress > 0.65 && progress < 0.95}
            />
        </div>
    );
}
