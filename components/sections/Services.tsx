"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Service {
    number: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        number: "01",
        title: "Frontend Development",
        description:
            "Building responsive, performant user interfaces with React, Next.js, and modern CSS.",
    },
    {
        number: "02",
        title: "Backend Development",
        description:
            "Designing scalable APIs and server architectures with Node.js, Express, and PostgreSQL.",
    },
    {
        number: "03",
        title: "E-Commerce Solutions",
        description:
            "End-to-end e-commerce development including payment integration and optimized checkout.",
    },
    {
        number: "04",
        title: "Landing Pages",
        description:
            "High-converting landing pages with stunning visuals and micro-animations.",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const headerLabel = headerRef.current?.querySelector(".label");
        const headerHeading = headerRef.current?.querySelector(".heading");

        // Set initial states immediately
        if (headerLabel) gsap.set(headerLabel, { y: 40, opacity: 0 });
        if (headerHeading) gsap.set(headerHeading, { y: 40, opacity: 0 });

        itemsRef.current.forEach((item) => {
            if (!item) return;
            const line = item.querySelector(".service-line");
            const content = item.querySelector(".service-content");
            if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
            if (content) gsap.set(content, { y: 30, opacity: 0 });
        });

        const ctx = gsap.context(() => {
            // Header animation
            if (headerLabel && headerHeading) {
                ScrollTrigger.create({
                    trigger: headerRef.current,
                    start: "top 85%",
                    onEnter: () => {
                        gsap.to(headerLabel, {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                        });
                        gsap.to(headerHeading, {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            delay: 0.1,
                            ease: "power3.out",
                        });
                    },
                    once: true,
                });
            }

            // Service items animation
            itemsRef.current.forEach((item) => {
                if (!item) return;

                const line = item.querySelector(".service-line");
                const content = item.querySelector(".service-content");

                ScrollTrigger.create({
                    trigger: item,
                    start: "top 88%",
                    onEnter: () => {
                        if (line) {
                            gsap.to(line, {
                                scaleX: 1,
                                duration: 0.6,
                                ease: "power2.out",
                            });
                        }
                        if (content) {
                            gsap.to(content, {
                                y: 0,
                                opacity: 1,
                                duration: 0.6,
                                delay: 0.1,
                                ease: "power3.out",
                            });
                        }
                    },
                    once: true,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28">
            <div className="container">
                <div className="space-y-12">
                    {/* Header */}
                    <div ref={headerRef} className="space-y-4">
                        <p className="label text-label text-[var(--accent)]">WHAT I DO</p>
                        <h2 className="heading text-headline">Services</h2>
                    </div>

                    {/* Services List */}
                    <div className="space-y-0">
                        {services.map((service, index) => (
                            <div
                                key={service.number}
                                ref={(el) => {
                                    itemsRef.current[index] = el;
                                }}
                                className="group py-6"
                            >
                                <div className="service-line h-px bg-[var(--text-muted)]/30 mb-6" />
                                <div className="service-content grid grid-cols-12 gap-4 items-start">
                                    <span className="col-span-2 md:col-span-1 text-sm font-mono text-[var(--accent)] group-hover:text-[var(--text-primary)] transition-colors">
                                        {service.number}
                                    </span>
                                    <h3 className="col-span-10 md:col-span-4 text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="col-span-12 md:col-span-7 text-body">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
