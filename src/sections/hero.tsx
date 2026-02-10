"use client";

import React, { Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "./hero.module.css";

const HeroCanvas = dynamic(
    () => import("@/components/hero-canvas").then((m) => m.HeroCanvas),
    { ssr: false }
);

export function HeroSection() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const y = useSpring(useTransform(scrollY, [0, 600], [0, 80]), { damping: 40, stiffness: 100 });
    const scale = useTransform(scrollY, [0, 600], [1, 0.95]);

    return (
        <section className={styles.hero} id="hero">
            <Suspense fallback={null}>
                <HeroCanvas />
            </Suspense>

            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />

            {/* Vertical side text */}
            <div className={styles.sideText}>Portfolio &apos;26</div>

            <motion.div className={styles.content} style={{ opacity, y, scale }}>
                {/* Overline */}
                <motion.div
                    className={styles.overline}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.overlineDot} />
                    <span className={styles.overlineText}>Tech Innovator · Systems Developer · Co-Founder</span>
                </motion.div>

                {/* Title */}
                <h1 className={styles.title}>
                    <motion.span
                        className={styles.titleLine}
                        initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Abhishek
                    </motion.span>
                    <motion.span
                        className={`${styles.titleLine} ${styles.titleStroke}`}
                        initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                        animate={{ opacity: 0.5, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                        A S
                    </motion.span>
                </h1>

                {/* Tagline */}
                <motion.p
                    className={styles.tagline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                    Building operating systems, intelligent robots, and security
                    infrastructure — from <span className={styles.accentText}>bare metal</span> up.
                </motion.p>

                {/* Info bar */}
                <motion.div
                    className={styles.infoBar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                >
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Location</span>
                        <span className={styles.infoValue}>Kerala, India</span>
                    </div>
                    <div className={styles.infoDivider} />
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Focus</span>
                        <span className={styles.infoValue}>OS · Robotics · AI</span>
                    </div>
                    <div className={styles.infoDivider} />
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Status</span>
                        <span className={styles.infoValue}>
                            <span className={styles.statusDot} />
                            Open to Collaborate
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                className={styles.scrollCue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
            >
                <motion.div
                    className={styles.scrollLine}
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
