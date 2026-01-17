"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface RevealImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    parallax?: boolean;
    delay?: number;
}

export default function RevealImage({
    src,
    alt,
    width,
    height,
    className = "",
    parallax = true,
    delay = 0,
}: RevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                },
            });

            // Container clip reveal
            tl.fromTo(
                containerRef.current,
                {
                    clipPath: "inset(100% 0 0 0)",
                },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                    delay: delay,
                    ease: "power4.inOut",
                }
            );

            // Scale down the inner image
            tl.fromTo(
                containerRef.current.querySelector("img"),
                {
                    scale: 1.3,
                },
                {
                    scale: 1,
                    duration: 1.4,
                    ease: "power3.out",
                },
                "<0.1"
            );

            // Parallax effect on scroll
            if (parallax && imageRef.current) {
                gsap.to(imageRef.current, {
                    y: "-15%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        },
        { scope: containerRef, dependencies: [parallax, delay] }
    );

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <Image
                ref={imageRef as React.RefObject<HTMLImageElement>}
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-full object-cover will-change-transform"
            />
        </div>
    );
}
