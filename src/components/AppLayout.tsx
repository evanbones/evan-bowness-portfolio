import { BookOpen, Code, Github, Home, Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../css/AppLayout.module.css';
import Footer from './Footer';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [router.pathname]);

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: User, label: 'Info', path: '/info' },
        { icon: Code, label: 'Projects', path: '/projects' },
        { icon: BookOpen, label: 'Blog', path: '/blog' }
    ];

    return (
        <div className={styles.appContainer}>
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <div className={styles.brandDot}></div>
                    <span className={styles.brandName}>EVAN.DEV</span>
                </div>

                <div className={styles.navLinks}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            >
                                <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                                <span className={styles.navLabel}>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className={styles.navRight}>
                    <a
                        href="https://github.com/evanbones"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        title="GitHub"
                    >
                        <Github size={24} />
                    </a>

                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.mobileNavItem} ${isActive ? styles.active : ''}`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}

            <main className={styles.mainContent}>
                <div className={styles.scrollContainer}>
                    <div className={styles.contentWrapper}>{children}</div>
                    <Footer />
                </div>
            </main>
        </div>
    );
}
