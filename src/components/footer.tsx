import styles from "./footer.module.css";
import { siteConfig } from "@/lib/config";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <span className={styles.copy}>© {siteConfig.year} {siteConfig.name}</span>
                <span className={styles.made}>Designed & Engineered with precision</span>
            </div>
        </footer>
    );
}
