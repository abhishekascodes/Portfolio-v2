"use client";

import styles from "./marquee.module.css";

interface MarqueeProps {
    text: string;
    speed?: number;
    variant?: "default" | "outline" | "gold";
}

export function Marquee({ text, speed = 30, variant = "default" }: MarqueeProps) {
    const repeated = `${text} — `.repeat(10);

    return (
        <div className={`${styles.marquee} ${styles[variant]}`}>
            <div
                className={styles.track}
                style={{ animationDuration: `${speed}s` }}
            >
                <span className={styles.text}>{repeated}</span>
                <span className={styles.text} aria-hidden="true">{repeated}</span>
            </div>
        </div>
    );
}
