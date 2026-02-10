"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { Reveal } from "@/components/reveal";
import { Send, CheckCircle2, ArrowUpRight, Mail, Phone, Linkedin } from "lucide-react";
import styles from "./contact.module.css";

export function ContactSection() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [focused, setFocused] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 1200));
        setStatus("sent");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                {/* Full-width header */}
                <Reveal>
                    <div className={styles.header}>
                        <span className={styles.sectionNum}>05</span>
                        <h2 className={styles.sectionTitle}>Get In Touch</h2>
                        <p className={styles.headerSub}>Open to collaborations, internships, and innovative engineering projects.</p>
                    </div>
                </Reveal>

                <div className={styles.grid}>
                    {/* Contact info cards */}
                    <Reveal direction="left" className={styles.infoCol}>
                        <motion.a
                            href={`mailto:${siteConfig.email}`}
                            className={styles.contactCard}
                            whileHover={{ borderColor: "rgba(129, 140, 248, 0.2)", y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Mail size={18} className={styles.contactIcon} />
                            <div>
                                <span className={styles.contactLabel}>Email</span>
                                <span className={styles.contactValue}>{siteConfig.email}</span>
                            </div>
                            <ArrowUpRight size={14} className={styles.contactArrow} />
                        </motion.a>

                        <motion.a
                            href={`tel:${siteConfig.phone}`}
                            className={styles.contactCard}
                            whileHover={{ borderColor: "rgba(129, 140, 248, 0.2)", y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Phone size={18} className={styles.contactIcon} />
                            <div>
                                <span className={styles.contactLabel}>Phone</span>
                                <span className={styles.contactValue}>{siteConfig.phone}</span>
                            </div>
                            <ArrowUpRight size={14} className={styles.contactArrow} />
                        </motion.a>

                        <motion.a
                            href={siteConfig.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactCard}
                            whileHover={{ borderColor: "rgba(129, 140, 248, 0.2)", y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Linkedin size={18} className={styles.contactIcon} />
                            <div>
                                <span className={styles.contactLabel}>LinkedIn</span>
                                <span className={styles.contactValue}>abhishekas7</span>
                            </div>
                            <ArrowUpRight size={14} className={styles.contactArrow} />
                        </motion.a>
                    </Reveal>

                    {/* Form */}
                    <Reveal delay={0.2} className={styles.formCol}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <motion.div
                                className={`${styles.field} ${focused === "name" ? styles.fieldFocused : ""}`}
                                animate={focused === "name" ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <label htmlFor="name" className={styles.label}>Name</label>
                                <input id="name" type="text" className={styles.input}
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                className={`${styles.field} ${focused === "email" ? styles.fieldFocused : ""}`}
                                animate={focused === "email" ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <input id="email" type="email" className={styles.input}
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                className={`${styles.field} ${focused === "message" ? styles.fieldFocused : ""}`}
                                animate={focused === "message" ? { scale: 1.005 } : { scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <label htmlFor="message" className={styles.label}>Message</label>
                                <textarea id="message" className={styles.textarea} rows={5}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                                    required
                                />
                            </motion.div>

                            <motion.button type="submit" className={styles.submitBtn}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                disabled={status === "sending"}
                            >
                                <AnimatePresence mode="wait">
                                    {status === "sent" ? (
                                        <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.btnInner}>
                                            <CheckCircle2 size={16} /> Sent
                                        </motion.span>
                                    ) : status === "sending" ? (
                                        <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sending...</motion.span>
                                    ) : (
                                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.btnInner}>
                                            <Send size={16} /> Send Message
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
