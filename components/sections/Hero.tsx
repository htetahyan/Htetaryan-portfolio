"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const line1 = line1Ref.current?.querySelector(".line-inner") as HTMLElement | null;
        const line2 = line2Ref.current?.querySelector(".line-inner") as HTMLElement | null;
        const line3 = line3Ref.current?.querySelector(".line-inner") as HTMLElement | null;

        // Set initial states
        if (line1 && line2 && line3) {
            gsap.set([line1, line2, line3], { yPercent: 100 });
        }
        if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { y: 20, opacity: 0 });
        if (scrollRef.current) gsap.set(scrollRef.current, { opacity: 0 });

        const ctx = gsap.context(() => {
            // Entry animation
            const entryTl = gsap.timeline({ delay: 0.3 });

            if (line1) {
                entryTl.to(line1, {
                    yPercent: 0,
                    duration: 1.2,
                    ease: "power4.out",
                });
            }
            if (line2) {
                entryTl.to(
                    line2,
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: "power4.out",
                    },
                    "-=1"
                );
            }
            if (line3) {
                entryTl.to(
                    line3,
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: "power4.out",
                    },
                    "-=0.9"
                );
            }
            if (subtitleRef.current) {
                entryTl.to(
                    subtitleRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.6"
                );
            }
            if (ctaRef.current) {
                entryTl.to(
                    ctaRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
            }
            if (scrollRef.current) {
                entryTl.to(
                    scrollRef.current,
                    {
                        opacity: 1,
                        duration: 0.5,
                    },
                    "-=0.2"
                );
            }

            // Scroll indicator animation
            const scrollDot = scrollRef.current?.querySelector(".scroll-dot");
            if (scrollDot) {
                gsap.to(scrollDot, {
                    y: 24,
                    repeat: -1,
                    yoyo: true,
                    duration: 1.5,
                    ease: "power1.inOut",
                    delay: 2,
                });
            }

            // Parallax on scroll
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });

            scrollTl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
                yPercent: 20,
                opacity: 0.3,
                stagger: 0.02,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Main Content */}
            <div className="container relative z-10">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    {/* Main Typography - Mixed Serif/Sans */}
                    <h1 className="leading-[0.95]">
                        {/* Line 1 - Sans */}
                        <div ref={line1Ref} className="overflow-hidden">
                            <span className="line-inner block text-[clamp(2.5rem,8vw,7rem)] font-light tracking-tight text-[var(--text-primary)]">
                                Creative Developer
                            </span>
                        </div>

                        {/* Line 2 - Italic Serif + Small Image */}
                        <div ref={line2Ref} className="overflow-visible flex items-center justify-center gap-4 md:gap-8 translate-y-2">
                            <span className="line-inner block text-[clamp(3rem,10vw,9rem)] font-serif italic text-[var(--text-primary)]">
                                Htet Ar Yan
                            </span>

                            {/* Small Profile Image */}
                            <div className="relative group shrink-0">
                                <div className="absolute inset-0 bg-[var(--accent)] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-[var(--text-muted)]/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="/Htetaryan.png"
                                        alt="Htet Ar Yan"
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Line 3 - Sans with Accent */}
                        <div ref={line3Ref} className="overflow-hidden">
                            <span className="line-inner block text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.2em] text-[var(--text-secondary)]">
                                FULL-STACK • MYANMAR
                            </span>
                        </div>
                    </h1>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mx-auto"
                    >
                        Crafting beautiful digital experiences with clean code and thoughtful design
                    </p>

                    {/* CTA */}
                    <div ref={ctaRef} className="mb-24">
                        <button
                            type="button"
                            onClick={() => {
                                const projectsSection = document.getElementById("projects");
                                if (projectsSection) {
                                    // Use GSAP scrollTo for slower, smoother scroll
                                    gsap.to(window, {
                                        duration: 2,
                                        scrollTo: { y: projectsSection, offsetY: 0 },
                                        ease: "power3.inOut",
                                    });
                                }
                            }}
                            className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--text-muted)]/40 rounded-full text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group cursor-pointer"
                        >
                            <span className="text-sm tracking-wider uppercase">View Work</span>
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - positioned at bottom */}
            <div
                ref={scrollRef}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                        Scroll
                    </span>
                    <div className="w-px h-12 bg-[var(--text-muted)]/30 relative overflow-hidden">
                        <div className="scroll-dot absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[var(--accent)] to-transparent" />
                    </div>
                </div>
            </div>


        </section>
    );
}
