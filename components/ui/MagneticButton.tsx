"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className = "",
    href,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!buttonRef.current || !textRef.current) return;

        const button = buttonRef.current;
        const text = textRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(text, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(text, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)",
            });
        };

        button.addEventListener("mousemove", handleMouseMove as any);
        button.addEventListener("mouseleave", handleMouseLeave as any);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove as any);
            button.removeEventListener("mouseleave", handleMouseLeave as any);
        };
    }, []);

    const baseClasses = `magnetic-btn ${className}`;

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={baseClasses}
            >
                <span ref={textRef}>{children}</span>
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            className={baseClasses}
        >
            <span ref={textRef}>{children}</span>
        </button>
    );
}
