"use client";

import React from "react";
import { motion } from "framer-motion";
import { awards } from "@/lib/data";
import { Reveal, Stagger, StaggerChild } from "@/components/reveal";
import { Award, Trophy, Star, Zap, Medal, Flame, Shield, Sparkles, Crown } from "lucide-react";
import styles from "./awards.module.css";

const icons = [Trophy, Star, Crown, Zap, Medal, Award, Flame, Shield, Sparkles];

export function AwardsSection() {
    return (
        <section className={styles.awards} id="awards">
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.headerRow}>
                    <Reveal direction="left">
                        <div>
                            <span className={styles.sectionNum}>04</span>
                            <h2 className={styles.sectionTitle}>Awards &<br />Recognition</h2>
                            <div className={styles.labelLine} />
                        </div>
                    </Reveal>
                    <Reveal delay={0.2} direction="right">
                        <p className={styles.headerSub}>
                            Achievements across hackathons, competitions, and innovation programs at state and national level.
                        </p>
                    </Reveal>
                </div>

                {/* Awards grid */}
                <Stagger className={styles.grid} stagger={0.06}>
                    {awards.map((award, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <StaggerChild key={i}>
                                <motion.div
                                    className={styles.card}
                                    whileHover={{
                                        y: -5,
                                        borderColor: "rgba(129, 140, 248, 0.2)",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <div className={styles.cardTop}>
                                        <div className={styles.iconWrap}>
                                            <Icon size={20} />
                                        </div>
                                        <span className={styles.yearBadge}>{award.year}</span>
                                    </div>
                                    <h3 className={styles.awardTitle}>{award.title}</h3>
                                    <p className={styles.awardOrg}>{award.org}</p>
                                </motion.div>
                            </StaggerChild>
                        );
                    })}
                </Stagger>
            </div>
        </section>
    );
}
