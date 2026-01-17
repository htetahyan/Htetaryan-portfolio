"use client";

import { useRef, useState, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { projects, type Project } from "@/data/projects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function ProjectRow({
    project,
    isOpen,
    onToggle,
}: {
    project: Project;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % project.images.length);
    };

    const goToImage = (index: number) => {
        setLightboxIndex(index);
    };

    useLayoutEffect(() => {
        if (!contentRef.current || !innerRef.current) return;

        const content = contentRef.current;
        const inner = innerRef.current;

        if (isOpen) {
            const height = inner.offsetHeight;
            gsap.to(content, {
                height: height,
                duration: 0.7,
                ease: "power3.out",
            });
            gsap.to(inner, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.15,
                ease: "power3.out",
            });
        } else {
            gsap.to(inner, {
                opacity: 0,
                y: 30,
                duration: 0.35,
                ease: "power2.in",
            });
            gsap.to(content, {
                height: 0,
                duration: 0.5,
                delay: 0.1,
                ease: "power3.inOut",
            });
        }
    }, [isOpen]);

    return (
        <div
            className={`border-b border-[var(--text-muted)]/15 transition-colors duration-500 ${isOpen ? "bg-[var(--bg-surface)]/50" : ""
                }`}
        >
            {/* Header Row */}
            <button
                onClick={onToggle}
                className="w-full py-6 px-4 md:px-6 grid grid-cols-12 gap-4 items-center text-left hover:bg-[var(--bg-surface)]/30 transition-all duration-300 group rounded-lg"
            >
                {/* Index + Title */}
                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                    <span
                        className="text-xs font-mono transition-colors duration-300"
                        style={{ color: isOpen ? project.color : "var(--text-muted)" }}
                    >
                        {project.id}
                    </span>
                    <span
                        className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                            }`}
                    >
                        {project.title}
                    </span>
                </div>

                {/* Service */}
                <span className="hidden md:block col-span-3 text-sm text-[var(--text-muted)]">
                    {project.service}
                </span>

                {/* Client */}
                <span className="col-span-3 md:col-span-2 text-sm text-[var(--text-muted)] hidden sm:block">
                    {project.client}
                </span>

                {/* Year + Arrow */}
                <span className="col-span-6 sm:col-span-3 md:col-span-2 text-sm text-[var(--text-muted)] text-right flex items-center justify-end gap-3">
                    <span>{project.year}</span>
                    <span
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                        style={{
                            borderColor: isOpen ? project.color : "rgba(255,255,255,0.1)",
                            backgroundColor: isOpen ? project.color : "transparent",
                        }}
                    >
                        <svg
                            className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? "rotate-45 text-[var(--bg-dark)]" : "text-[var(--text-muted)]"
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </span>
                </span>
            </button>

            {/* Expandable Content */}
            <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
                <div ref={innerRef} className="px-4 md:px-6 pb-12 opacity-0 translate-y-8">
                    {/* Accent Line */}
                    <div
                        className="w-16 h-1 rounded-full mb-8"
                        style={{ backgroundColor: project.color }}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Description */}
                        <div className="lg:col-span-8 space-y-8">
                            <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-[1.4] text-[var(--text-primary)]">
                                {project.description}
                            </p>

                            {/* CTA */}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:gap-5"
                                    style={{
                                        backgroundColor: project.color,
                                        color: "#000",
                                    }}
                                >
                                    Visit Website
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* Roles */}
                        <div className="lg:col-span-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
                                Services Provided
                            </p>
                            <ul className="space-y-3">
                                {project.roles.map((role) => (
                                    <li key={role} className="flex items-center gap-3 text-[var(--text-secondary)]">
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: project.color }}
                                        />
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                        {project.images.map((src, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openLightbox(i)}
                                className="aspect-[16/10] rounded-xl overflow-hidden relative group/img cursor-zoom-in"
                            >
                                <Image
                                    src={src}
                                    alt={`${project.title} screenshot ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                        />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                images={project.images}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={closeLightbox}
                onPrev={prevImage}
                onNext={nextImage}
                onGoTo={goToImage}
                projectTitle={project.title}
            />
        </div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const headerLabel = headerRef.current?.querySelector(".label");
            const headerHeading = headerRef.current?.querySelector(".heading");
            const tableHeader = sectionRef.current?.querySelector(".table-header");

            if (headerLabel && headerHeading) {
                gsap.fromTo(
                    [headerLabel, headerHeading],
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            if (tableHeader) {
                gsap.fromTo(
                    tableHeader,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: tableHeader,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28" id="projects">
            <div className="container">
                {/* Header */}
                <div ref={headerRef} className="mb-16">
                    <p className="label text-label text-[var(--accent)]">SELECTED WORK</p>
                    <h2 className="heading text-headline mt-4">Featured Projects</h2>
                </div>

                {/* Table Header */}
                <div className="table-header grid grid-cols-12 gap-4 px-4 md:px-6 py-4 border-b border-[var(--text-muted)]/20 text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    <span className="col-span-6 md:col-span-5">Project</span>
                    <span className="hidden md:block col-span-3">Service</span>
                    <span className="hidden sm:block col-span-3 md:col-span-2">Client</span>
                    <span className="col-span-6 sm:col-span-3 md:col-span-2 text-right">Year</span>
                </div>

                {/* Project Rows */}
                <div className="divide-y-0">
                    {projects.map((project, index) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
