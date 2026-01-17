"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
}

export default function FadeIn({
    children,
    className = "",
    delay = 0,
    duration = 1,
    y = 60,
    stagger = 0,
}: FadeInProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const targets = stagger
            ? containerRef.current.children
            : containerRef.current;

        // Set initial state immediately
        gsap.set(targets, {
            y: y,
            opacity: 0,
        });

        const ctx = gsap.context(() => {
            gsap.to(targets, {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                stagger: stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [delay, duration, y, stagger]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
