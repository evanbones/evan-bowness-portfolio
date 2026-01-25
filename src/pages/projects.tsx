import Head from 'next/head';
import Link from 'next/link';
import layout from '../css/Layout.module.css';
import cards from '../css/VinylCard.module.css';

export default function Projects() {
    return (
        <>
            <Head>
                <title>Projects - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Navigation */}
            <nav className={layout['nav-bar']}>
                <div className={layout['nav-left']}>
                    <Link href="/" className={layout['home-link']}>
                        HOME
                    </Link>
                </div>
                <div className={layout['nav-right']}>
                    <Link href="/info">INFO</Link>
                    <Link href="/projects">PROJECTS</Link>
                    <Link href="/blog">BLOG</Link>
                    <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
            </nav>

            <div className={layout.container}>
                <header className={layout['page-header']}>
                    <h1>PROJECTS</h1>
                </header>

                <section className={cards['vinyl-card']}>
                    <h2>PORTFOLIO WEBSITE</h2>
                    <p className={cards['project-year']}>2025</p>
                    <p>
                        A 70s-inspired personal portfolio and music blog featuring interactive elements, smooth
                        animations, and a retro aesthetic. Built with Next.js and custom CSS to create a vintage feel.
                    </p>
                    <div className={cards['genre-tags']}>
                        <span className={cards['genre-tag']}>Next.js</span>
                        <span className={cards['genre-tag']}>React</span>
                        <span className={cards['genre-tag']}>TypeScript</span>
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/evanbones/evan-bowness-portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            VIEW CODE
                        </a>
                        <a href="https://evanbowness.dev/" className={cards['project-link']}>
                            LIVE DEMO
                        </a>
                    </div>
                </section>

                <section className={cards['vinyl-card']}>
                    <h2>iGIFup</h2>
                    <p className={cards['project-year']}>2025</p>
                    <p>
                        An early 2000s-style e-commerce site for buying and selling retro GIFs, created for COSC 304 -
                        Introduction to Database Systems. Awarded top project of the year in the class, as well as being
                        named in the most unique projects of the year.
                    </p>
                    <div className={cards['genre-tags']}>
                        <span className={cards['genre-tag']}>SQL Server</span>
                        <span className={cards['genre-tag']}>JSP</span>
                        <span className={cards['genre-tag']}>Java</span>
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/evanbones/iGIFup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            VIEW CODE
                        </a>
                        <a href="https://igifup.azurewebsites.net/" className={cards['project-link']}>
                            LIVE DEMO
                        </a>
                    </div>
                </section>

                <section className={cards['vinyl-card']}>
                    <h2>TUNE GUI</h2>
                    <p className={cards['project-year']}>2025</p>
                    <p>
                        A PyQt5-based GUI for tuning ROS2 node parameters and editing params.yaml files in real-time.
                        Created as part of my work for the Okanagan Marine Robotics Club.
                    </p>
                    <div className={cards['genre-tags']}>
                        <span className={cards['genre-tag']}>Python</span>
                        <span className={cards['genre-tag']}>ROS2</span>
                        <span className={cards['genre-tag']}>PyQt5</span>
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/Okanagan-Marine-Robotics/tune_guis"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            VIEW CODE
                        </a>
                        <a
                            href="https://github.com/Okanagan-Marine-Robotics/tune_gui/blob/main/README.md"
                            className={cards['project-link']}
                        >
                            DOCUMENTATION
                        </a>
                    </div>
                </section>

                <section className={cards['vinyl-card']}>
                    <h2>DATASET SYSTEM FOR MOVIES</h2>
                    <p className={cards['project-year']}>2023</p>
                    <p>
                        A full-stack movie recommendation website using Next.js and FastAPI. Created for COSC 310 -
                        Software Engineering. Features user authentication, movie ratings, and personalized
                        recommendations based on user preferences. Comprehensive CI/CD using GitHub Actions and Docker,
                        and a full test suite with PyTest.
                    </p>
                    <div className={cards['genre-tags']}>
                        <span className={cards['genre-tag']}>Next.js</span>
                        <span className={cards['genre-tag']}>FastAPI</span>
                        <span className={cards['genre-tag']}>TypeScript</span>
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/Null-Pointers-2/COSC-310-Project-2025"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            VIEW CODE
                        </a>
                        <a
                            href="https://github.com/Null-Pointers-2/COSC-310-Project-2025/blob/main/README.md"
                            className={cards['project-link']}
                        >
                            DOCUMENTATION
                        </a>
                    </div>
                </section>

                <section className={cards['vinyl-card']}>
                    <h2>MINECRAFT MODS</h2>
                    <p className={cards['project-year']}>2021</p>
                    <p>
                        I develop and maintain numerous Minecraft mods using Java and (Neo)Forge/Fabric. My most popular
                        mod, Wolf Armor Compat, has over 3.8 million downloads on CurseForge, and I&apos;ve contributed
                        to other mods with download counts in the millions.
                    </p>
                    <div className={cards['genre-tags']}>
                        <span className={cards['genre-tag']}>Java</span>
                        <span className={cards['genre-tag']}>Gradle</span>
                        <span className={cards['genre-tag']}>Kotlin</span>
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://www.curseforge.com/members/evanbones/projects"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            CURSEFORGE
                        </a>
                        <a
                            href="https://modrinth.com/user/evanbones"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            MODRINTH
                        </a>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className={layout.footer}>
                <div className={layout['footer-content']}>
                    <div className={layout['footer-links']}>
                        <Link href="/info">Info</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/blog">Blog</Link>
                        <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                    <p className={layout.copyright}>© 2025 Evan Bowness.</p>
                </div>
            </footer>
        </>
    );
}

export function getStaticProps() {
    return { props: {} };
}
