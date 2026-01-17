"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface LightboxProps {
    images: string[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    projectTitle: string;
    onGoTo: (index: number) => void;
}

export default function Lightbox({
    images,
    currentIndex,
    isOpen,
    onClose,
    onPrev,
    onNext,
    projectTitle,
    onGoTo,
}: LightboxProps) {
    const scrollPositionRef = useRef(0);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    onPrev();
                    break;
                case "ArrowRight":
                    onNext();
                    break;
            }
        },
        [isOpen, onClose, onPrev, onNext]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown as any);
        return () => window.removeEventListener("keydown", handleKeyDown as any);
    }, [handleKeyDown]);

    // Lock body scroll when open - simpler approach
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY;

            // Just set overflow hidden - no position changes
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            // Restore scroll
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const lightboxContent = (
        <div
            ref={overlayRef}
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                animation: "fadeIn 0.3s ease-out",
            }}
        >
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

            {/* Close Button */}
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    width: "3rem",
                    height: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 10,
                    transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
                aria-label="Close lightbox"
            >
                <svg
                    style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image Counter */}
            <div
                style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                }}
            >
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3.5rem",
                    height: "3.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
                aria-label="Previous image"
            >
                <svg style={{ width: "1.5rem", height: "1.5rem", color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3.5rem",
                    height: "3.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
                aria-label="Next image"
            >
                <svg style={{ width: "1.5rem", height: "1.5rem", color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Image Container */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    width: "85vw",
                    height: "70vh",
                    maxWidth: "1400px",
                    animation: "scaleIn 0.4s ease-out",
                }}
            >
                <Image
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${projectTitle} - Image ${currentIndex + 1}`}
                    fill
                    style={{
                        objectFit: "contain",
                        transition: "opacity 0.3s ease",
                    }}
                    priority
                />
            </div>

            {/* Thumbnail Navigation */}
            <div
                style={{
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                }}
            >
                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            onGoTo(i);
                        }}
                        style={{
                            width: "4rem",
                            height: "2.5rem",
                            borderRadius: "0.375rem",
                            overflow: "hidden",
                            border: i === currentIndex ? "2px solid white" : "2px solid transparent",
                            opacity: i === currentIndex ? 1 : 0.5,
                            cursor: "pointer",
                            padding: 0,
                            background: "none",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Thumbnail ${i + 1}`}
                            width={64}
                            height={40}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                    </button>
                ))}
            </div>

            {/* Project Title */}
            <div
                style={{
                    position: "absolute",
                    bottom: "5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.875rem",
                }}
            >
                {projectTitle}
            </div>
        </div>
    );

    // Use portal to render at document body level
    if (typeof window !== "undefined") {
        return createPortal(lightboxContent, document.body);
    }

    return null;
}
