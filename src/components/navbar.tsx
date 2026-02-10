"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import styles from "./navbar.module.css";

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(latest > prev && latest > 150);
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
            animate={{ y: hidden ? "-100%" : "0%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.inner}>
                <a href="#" className={styles.logo}>
                    <span className={styles.logoMark}>A</span>
                    <span className={styles.logoText}>bhishek</span>
                </a>

                <div className={styles.links}>
                    {siteConfig.navLinks.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className={styles.link}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                            whileHover={{ color: "#818CF8" }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                <motion.a
                    href="#contact"
                    className={styles.cta}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    Let&apos;s Talk
                </motion.a>
            </div>
        </motion.nav>
    );
}
