"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    delay?: number;
    stagger?: number;
    scrub?: boolean;
    direction?: "up" | "down";
}

export default function RevealText({
    children,
    className = "",
    as: Component = "p",
    delay = 0,
    stagger = 0.08,
    scrub = false,
    direction = "up",
}: RevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Split text into words
    const words = children.split(" ");

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const wordInners = containerRef.current.querySelectorAll(".word-inner");

        // Set initial state immediately
        gsap.set(wordInners, {
            y: direction === "up" ? "110%" : "-110%",
        });

        const ctx = gsap.context(() => {
            gsap.to(wordInners, {
                y: "0%",
                duration: scrub ? 1 : 1.2,
                stagger: stagger,
                delay: delay,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    end: scrub ? "top 30%" : undefined,
                    scrub: scrub ? 1 : false,
                    toggleActions: scrub ? undefined : "play none none none",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [children, delay, stagger, scrub, direction]);

    return (
        <div ref={containerRef}>
            <Component className={className}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="inline-block overflow-hidden"
                        style={{ verticalAlign: "top" }}
                    >
                        <span
                            className="word-inner inline-block"
                            style={{ willChange: "transform" }}
                        >
                            {word}
                            {index < words.length - 1 && "\u00A0"}
                        </span>
                    </span>
                ))}
            </Component>
        </div>
    );
}
