import Link from 'next/link';
import layout from '../css/Layout.module.css';

interface FooterProps {
    style?: React.CSSProperties;
}

export default function Footer({ style }: FooterProps) {
    return (
        <footer className={layout.footer} style={style}>
            <div className={layout['footer-content']}>
                <div className={layout['footer-links']}>
                    <Link href="/info">Info</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/blog">Blog</Link>
                    <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
                <p className={layout.copyright}>© 2025 Evan Bowness. All rights reserved.</p>
            </div>
        </footer>
    );
}
