"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Reveal, Stagger, StaggerChild } from "@/components/reveal";
import styles from "./skills.module.css";

export function SkillsSection() {
    return (
        <section className={styles.skills} id="skills">
            <div className={styles.container}>
                {/* Center-aligned header */}
                <Reveal>
                    <div className={styles.header}>
                        <span className={styles.sectionNum}>02</span>
                        <h2 className={styles.sectionTitle}>Technical Arsenal</h2>
                        <p className={styles.headerSub}>
                            Tools, languages, and frameworks I use to build from the ground up.
                        </p>
                    </div>
                </Reveal>

                {/* Masonry-style grid — 2 columns, alternating card sizes */}
                <div className={styles.masonryGrid}>
                    <div className={styles.column}>
                        {skillGroups.filter((_, i) => i % 2 === 0).map((group, gi) => (
                            <Reveal key={group.title} delay={0.1 + gi * 0.1}>
                                <motion.div
                                    className={styles.card}
                                    whileHover={{ borderColor: "rgba(129, 140, 248, 0.15)", y: -3 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardAccent} />
                                        <h3 className={styles.cardTitle}>{group.title}</h3>
                                        <span className={styles.cardCount}>{group.items.length}</span>
                                    </div>
                                    <div className={styles.tagCloud}>
                                        {group.items.map((item) => (
                                            <motion.span
                                                key={item}
                                                className={styles.tag}
                                                whileHover={{ borderColor: "rgba(129, 140, 248, 0.4)", color: "#818CF8" }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>

                    <div className={styles.column}>
                        {skillGroups.filter((_, i) => i % 2 !== 0).map((group, gi) => (
                            <Reveal key={group.title} delay={0.15 + gi * 0.1}>
                                <motion.div
                                    className={styles.card}
                                    whileHover={{ borderColor: "rgba(129, 140, 248, 0.15)", y: -3 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardAccent} />
                                        <h3 className={styles.cardTitle}>{group.title}</h3>
                                        <span className={styles.cardCount}>{group.items.length}</span>
                                    </div>
                                    <div className={styles.tagCloud}>
                                        {group.items.map((item) => (
                                            <motion.span
                                                key={item}
                                                className={styles.tag}
                                                whileHover={{ borderColor: "rgba(129, 140, 248, 0.4)", color: "#818CF8" }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
