"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right" | "none";
    once?: boolean;
}

export function Reveal({
    children,
    className,
    delay = 0,
    direction = "up",
    once = true,
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-60px" });

    const offsets = {
        up: { y: 40, x: 0 },
        left: { y: 0, x: -40 },
        right: { y: 0, x: 40 },
        none: { y: 0, x: 0 },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                y: offsets[direction].y,
                x: offsets[direction].x,
                filter: "blur(6px)",
            }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
                    : {}
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

interface StaggerProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
}

export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChild({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
