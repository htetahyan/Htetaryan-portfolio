"use client";

import gsap from "gsap";

export function animatePageIn() {
    const overlay = document.querySelector(".intro-overlay");
    const counter = document.querySelector(".intro-counter");
    const name = document.querySelector(".intro-name");
    const line = document.querySelector(".intro-line");
    const content = document.getElementById("page-content");

    if (!overlay) return;

    const tl = gsap.timeline();

    // Counter animation (0 to 100)
    if (counter) {
        tl.to(counter, {
            innerHTML: 100,
            duration: 2,
            ease: "power2.inOut",
            snap: { innerHTML: 1 },
            onUpdate: function () {
                const val = Math.round(Number(counter.textContent) || 0);
                counter.textContent = val.toString();
            },
        });
    }

    // Line grows
    if (line) {
        tl.to(
            line,
            {
                scaleX: 1,
                duration: 2,
                ease: "power2.inOut",
            },
            0
        );
    }

    // Name fades in
    if (name) {
        tl.fromTo(
            name,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.3
        );
    }

    // Pause at the end
    tl.to({}, { duration: 0.3 });

    // Reveal animation - slide up the overlay
    tl.to(overlay, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
    });

    // Show content
    tl.add(() => {
        if (content) {
            gsap.set(content, { visibility: "visible", opacity: 1 });
        }
    }, "-=0.5");

    // Cleanup
    tl.set(overlay, { display: "none" });
}
