"use client";

import React from "react";
import { motion } from "framer-motion";
import { bio, traits } from "@/lib/data";
import { Reveal, Stagger, StaggerChild } from "@/components/reveal";
import styles from "./about.module.css";

export function AboutSection() {
    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                {/* Top row — section label + pull quote */}
                <div className={styles.topRow}>
                    <Reveal direction="left">
                        <div className={styles.labelBlock}>
                            <span className={styles.sectionNum}>01</span>
                            <h2 className={styles.sectionTitle}>About</h2>
                            <div className={styles.labelLine} />
                        </div>
                    </Reveal>

                    <Reveal delay={0.2} direction="right">
                        <blockquote className={styles.pullQuote}>
                            &ldquo;I believe in understanding technology from its foundation up — building from <span className={styles.accentText}>bare metal</span> rather than abstractions.&rdquo;
                        </blockquote>
                    </Reveal>
                </div>

                {/* Bio grid */}
                <div className={styles.bioGrid}>
                    {bio.map((paragraph, i) => (
                        <Reveal key={i} delay={0.1 + i * 0.12}>
                            <p className={styles.paragraph}>{paragraph}</p>
                        </Reveal>
                    ))}
                </div>

                {/* Divider with dot */}
                <Reveal>
                    <div className={styles.dotDivider}>
                        <div className={styles.divLine} />
                        <div className={styles.divDot} />
                        <div className={styles.divLine} />
                    </div>
                </Reveal>

                {/* Traits + Stats side by side */}
                <div className={styles.bottomRow}>
                    <Stagger className={styles.traits} stagger={0.05} delay={0.3}>
                        {traits.map((trait) => (
                            <StaggerChild key={trait}>
                                <motion.span
                                    className={styles.trait}
                                    whileHover={{
                                        borderColor: "rgba(129, 140, 248, 0.3)",
                                        color: "#818CF8",
                                        y: -2,
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    {trait}
                                </motion.span>
                            </StaggerChild>
                        ))}
                    </Stagger>

                    <Reveal delay={0.5} direction="right">
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>17</span>
                                <span className={styles.statLabel}>Years Old</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>9+</span>
                                <span className={styles.statLabel}>Projects Built</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>10+</span>
                                <span className={styles.statLabel}>Awards</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
