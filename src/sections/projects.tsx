"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, miniProjects } from "@/lib/data";
import { Reveal, Stagger, StaggerChild } from "@/components/reveal";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import styles from "./projects.module.css";

export function ProjectsSection() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <section className={styles.projects} id="work">
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <Reveal direction="left">
                        <span className={styles.sectionNum}>03</span>
                        <h2 className={styles.sectionTitle}>Selected<br />Work</h2>
                    </Reveal>
                    <Reveal delay={0.2} direction="right">
                        <p className={styles.headerSub}>
                            A curated selection of engineering projects across systems, IoT, robotics, AI, and security.
                        </p>
                    </Reveal>
                </div>

                {/* Accent line */}
                <Reveal>
                    <div className={styles.accentLine} />
                </Reveal>

                {/* Main projects — full-width expandable rows */}
                <div className={styles.projectList}>
                    {projects.map((project, i) => (
                        <Reveal key={project.id} delay={0.05 * i}>
                            <motion.div
                                className={`${styles.projectRow} ${expanded === project.id ? styles.projectActive : ""}`}
                                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                                layout
                            >
                                <div className={styles.rowMain}>
                                    <div className={styles.rowLeft}>
                                        <span className={styles.projectId}>{project.id}</span>
                                        <div>
                                            <h3 className={styles.projectTitle}>{project.title}</h3>
                                            <span className={styles.projectSub}>{project.subtitle}</span>
                                        </div>
                                    </div>
                                    <div className={styles.rowRight}>
                                        <span className={styles.projectCat}>{project.category}</span>
                                        <span className={styles.projectYear}>{project.year}</span>
                                        <motion.div
                                            animate={{ rotate: expanded === project.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={18} className={styles.chevron} />
                                        </motion.div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expanded === project.id && (
                                        <motion.div
                                            className={styles.expandedContent}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className={styles.expandedInner}>
                                                <div className={styles.expandedLeft}>
                                                    {project.description.map((desc, di) => (
                                                        <motion.p
                                                            key={di}
                                                            className={styles.descLine}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: di * 0.1, duration: 0.4 }}
                                                        >
                                                            <span className={styles.descDot} />
                                                            {desc}
                                                        </motion.p>
                                                    ))}
                                                </div>
                                                <div className={styles.expandedRight}>
                                                    <span className={styles.techLabel}>Tech Stack</span>
                                                    <div className={styles.techGrid}>
                                                        {project.tech.map((t) => (
                                                            <span key={t} className={styles.techTag}>{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>

                {/* Mini projects */}
                <Reveal delay={0.3}>
                    <div className={styles.miniHeader}>
                        <div className={styles.miniLine} />
                        <span className={styles.miniLabel}>Other Notable Projects</span>
                        <div className={styles.miniLine} />
                    </div>
                </Reveal>

                <Stagger className={styles.miniGrid} stagger={0.06} delay={0.4}>
                    {miniProjects.map((mp) => (
                        <StaggerChild key={mp.title}>
                            <motion.div
                                className={styles.miniCard}
                                whileHover={{ y: -3, borderColor: "rgba(129, 140, 248, 0.15)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className={styles.miniTop}>
                                    <h4 className={styles.miniTitle}>{mp.title}</h4>
                                    <span className={styles.miniTech}>{mp.tech}</span>
                                </div>
                                <p className={styles.miniDesc}>{mp.desc}</p>
                            </motion.div>
                        </StaggerChild>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
