"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
    { name: "GitHub", href: "https://github.com/htetahyan" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/htet-ar-yan-705121389/" },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100083336276167" },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Content elements
            const label = contentRef.current?.querySelector(".label");
            const heading = contentRef.current?.querySelector(".heading");
            const subtitle = contentRef.current?.querySelector(".subtitle");
            const button = contentRef.current?.querySelector(".cta-button");

            // Animate content - play once, stay visible
            if (label && heading && subtitle && button) {
                gsap.fromTo(
                    [label, heading, subtitle, button],
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none", // Play once, don't reverse
                        },
                    }
                );
            }

            // Footer animation
            const footerLine = footerRef.current?.querySelector(".footer-line");
            const footerContent = footerRef.current?.querySelector(".footer-content");

            if (footerLine) {
                gsap.fromTo(
                    footerLine,
                    { scaleX: 0, transformOrigin: "left center" },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 95%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            if (footerContent) {
                gsap.fromTo(
                    footerContent,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 95%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28 min-h-[80vh] flex flex-col justify-center">
            <div className="container flex-1 flex flex-col justify-center">
                <div ref={contentRef} className="space-y-8 max-w-4xl">
                    {/* Label */}
                    <p className="label text-label text-[var(--accent)]">GET IN TOUCH</p>

                    {/* Heading */}
                    <h2 className="heading text-display">Let&apos;s work together</h2>

                    {/* Subtitle */}
                    <p className="subtitle text-subhead max-w-xl">
                        I&apos;m currently open to new opportunities. Whether you have a
                        project in mind or just want to chat, feel free to reach out.
                    </p>

                    {/* Email Button */}
                    <div className="cta-button">
                        <MagneticButton href="mailto:htetahyan@gmail.com" className="text-lg">
                            htetahyan@gmail.com
                        </MagneticButton>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div ref={footerRef} className="mt-auto">
                <div className="footer-line h-px bg-[var(--text-muted)]/20" />
                <div className="footer-content py-6">
                    <div className="container">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <p className="text-sm text-[var(--text-muted)]">
                                © {new Date().getFullYear()} Htet Ar Yan. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
