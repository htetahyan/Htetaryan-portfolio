"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animatePageIn } from "@/animations/pageIntro";

export default function Template({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            animatePageIn();
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="template-wrapper">
            {/* Premium Intro Overlay */}
            <div
                className="intro-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                style={{ backgroundColor: "#0a0a0a" }}
            >
                {/* Centered Content */}
                <div className="relative flex flex-col items-center gap-8">
                    {/* Name */}
                    <p
                        className="intro-name text-xl md:text-2xl font-light tracking-[0.3em] text-white/60 uppercase"
                        style={{ opacity: 0 }}
                    >
                        Htet Ar Yan
                    </p>

                    {/* Progress Line */}
                    <div className="w-48 md:w-64 h-px bg-white/10 overflow-hidden">
                        <div
                            className="intro-line h-full bg-white origin-left"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>

                    {/* Counter */}
                    <p
                        className="intro-counter text-6xl md:text-8xl font-serif text-white/90"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                        0
                    </p>
                </div>

                {/* Corner Decoration */}
                <p className="absolute bottom-8 right-8 text-xs text-white/30 tracking-wider">
                    PORTFOLIO 2026
                </p>
            </div>

            {/* Page Content - hidden until intro completes */}
            <div id="page-content" style={{ visibility: "hidden", opacity: 0 }}>
                {children}
            </div>
        </div>
    );
}
