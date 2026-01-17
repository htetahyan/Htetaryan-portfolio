"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const headingWords = headingRef.current?.querySelectorAll(".word");
        const paragraphWords = paragraphRef.current?.querySelectorAll(".word");
        const stats = statsRef.current?.querySelectorAll(".stat");

        // Set initial states
        gsap.set(headingWords || [], { opacity: 0.15 });
        gsap.set(paragraphWords || [], { opacity: 0.1 });
        gsap.set(stats || [], { y: 40, opacity: 0 });
        gsap.set(imageRef.current, { clipPath: "inset(0 100% 0 0)" });

        const ctx = gsap.context(() => {
            // Heading - word by word opacity on scroll
            const headingTl = gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 0.8,
                },
            });

            headingTl.to(headingWords || [], {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
            });

            // Paragraph - word by word
            const paraTl = gsap.timeline({
                scrollTrigger: {
                    trigger: paragraphRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 0.8,
                },
            });

            paraTl.to(paragraphWords || [], {
                opacity: 1,
                stagger: 0.02,
                ease: "none",
            });

            // Stats
            const statsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 0.5,
                },
            });

            statsTl.to(stats || [], {
                y: 0,
                opacity: 1,
                stagger: 0.1,
            });

            // Image reveal
            const imageTl = gsap.timeline({
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 75%",
                    end: "top 25%",
                    scrub: 0.6,
                },
            });

            imageTl.to(imageRef.current, {
                clipPath: "inset(0 0% 0 0)",
                ease: "power2.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const heading = "I create digital experiences that connect brands with their audience through thoughtful design";
    const paragraph =
        "As a full-stack developer based in Myanmar, I specialize in building modern web applications that are both beautiful and functional. I believe in clean code, intuitive interfaces, and experiences that leave a lasting impression. Currently open to new opportunities and exciting projects.";

    const stats = [
        { number: "3+", label: "Years Experience" },
        { number: "20+", label: "Projects Completed" },
        { number: "100%", label: "Client Satisfaction" },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 relative overflow-hidden"
        >
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left - Content */}
                    <div className="lg:col-span-7 space-y-16">
                        {/* Label */}
                        <p className="text-label text-[var(--accent)]">About</p>

                        {/* Heading - Word by word reveal */}
                        <h2
                            ref={headingRef}
                            className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.3] text-[var(--text-primary)]"
                        >
                            {heading.split(" ").map((word, i) => (
                                <span key={i} className="word inline-block mr-[0.3em]">
                                    {word}
                                </span>
                            ))}
                        </h2>

                        {/* Paragraph - Word by word */}
                        <div
                            ref={paragraphRef}
                            className="text-lg leading-relaxed text-[var(--text-secondary)]"
                        >
                            {paragraph.split(" ").map((word, i) => (
                                <span key={i} className="word inline-block mr-[0.25em]">
                                    {word}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--text-muted)]/20">
                            {stats.map((stat) => (
                                <div key={stat.label} className="stat">
                                    <p className="text-4xl md:text-5xl font-serif text-[var(--text-primary)]">
                                        {stat.number}
                                    </p>
                                    <p className="text-sm text-[var(--text-muted)] mt-2">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Decorative Element */}
                    <div className="lg:col-span-5 relative">
                        <div
                            ref={imageRef}
                            className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-[var(--accent)]/10 via-purple-500/5 to-[var(--bg-surface)] border border-[var(--text-muted)]/10"
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center space-y-6 opacity-30">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-600 blur-xl" />
                                    <p className="text-[10px] text-[var(--text-muted)] tracking-[0.3em] uppercase italic">
                                        Creative Space
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative */}
                        <div className="absolute -z-10 top-8 -right-8 w-full h-full border border-[var(--text-muted)]/10 rounded-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
