"use client";

import { useRef, ReactNode, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionBgProps {
    children: ReactNode;
    bgColor?: string;
    className?: string;
}

export default function SectionBg({
    children,
    bgColor = "var(--bg-dark)",
    className = "",
}: SectionBgProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(
        () => {
            if (!sectionRef.current || !isMounted) return;

            const body = document.body;
            if (!body) return;

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => {
                    gsap.to(body, {
                        backgroundColor: bgColor,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
                onEnterBack: () => {
                    gsap.to(body, {
                        backgroundColor: bgColor,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
            });
        },
        { scope: sectionRef, dependencies: [bgColor, isMounted] }
    );

    return (
        <section ref={sectionRef} className={`section ${className}`}>
            {children}
        </section>
    );
}
