import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import styles from '../css/Footer.module.css';

interface FooterProps {
    style?: React.CSSProperties;
}

export default function Footer({ style }: FooterProps) {
    return (
        <footer className={styles.footer} style={style}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.brand}>
                        EVAN<span className={styles.brandDot}>.</span>DEV
                    </div>
                    <p className={styles.tagline}>
                        © {new Date().getFullYear()} Evan Bowness.<br></br>
                    </p>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}>Explore</h3>
                    <div className={styles.links}>
                        <Link href="/" className={styles.link}>
                            Home
                        </Link>
                        <Link href="/projects" className={styles.link}>
                            Projects
                        </Link>
                        <Link href="/blog" className={styles.link}>
                            Blog
                        </Link>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}>Connect</h3>
                    <div className={styles.links}>
                        <a
                            href="https://github.com/evanbones"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            <Github size={18} /> GitHub
                            <ArrowUpRight size={14} className={styles.arrow} />
                        </a>
                        {/* TODO: Add more social links */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
