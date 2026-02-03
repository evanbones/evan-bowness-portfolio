import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import cards from '../css/Card.module.css';
import layout from '../css/Layout.module.css';

export default function Projects() {
    return (
        <>
            <Head>
                <title>Projects - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div className={layout.container}>
                <header className={layout['page-header']}>
                    <h1>PROJECTS</h1>
                </header>

                <h2>PORTFOLIO WEBSITE</h2>
                <section className={cards['card']}>
                    <p className={cards['project-year']}>2025</p>
                    <p>
                        A simple and modern personal portfolio and music blog featuring interactive elements, smooth
                        animations, and a clean aesthetic. Built with Next.js and custom CSS.
                    </p>
                    <div className={cards['tags']}>
                        <span className={cards['tag']}>Next.js</span>
                        <span className={cards['tag']}>React</span>
                        <span className={cards['tag']}>TypeScript</span>
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

                <h2>iGIFup</h2>
                <section className={cards['card']}>
                    <p className={cards['project-year']}>2025</p>
                    <p>
                        An early 2000s-style e-commerce site for buying and selling retro GIFs, created for COSC 304 -
                        Introduction to Database Systems. Awarded top project of the year in the class, as well as being
                        named in the most unique projects of the year.
                    </p>
                    <div className={cards['tags']}>
                        <span className={cards['tag']}>SQL Server</span>
                        <span className={cards['tag']}>JSP</span>
                        <span className={cards['tag']}>Java</span>
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

                <h2>TUNE GUI</h2>
                <section className={cards['card']}>
                    <p className={cards['project-year']}>2025</p>
                    <p>
                        A PyQt5-based GUI for tuning ROS2 node parameters and editing params.yaml files in real-time.
                        Created as part of my work for the Okanagan Marine Robotics Club.
                    </p>
                    <div className={cards['tags']}>
                        <span className={cards['tag']}>Python</span>
                        <span className={cards['tag']}>ROS2</span>
                        <span className={cards['tag']}>PyQt5</span>
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

                <h2>DATASET SYSTEM FOR MOVIES</h2>
                <section className={cards['card']}>
                    <p className={cards['project-year']}>2023</p>
                    <p>
                        A full-stack movie recommendation website using Next.js and FastAPI. Created for COSC 310 -
                        Software Engineering. Features user authentication, movie ratings, and personalized
                        recommendations based on user preferences. Includes comprehensive CI/CD using GitHub Actions and
                        Docker, and a full test suite with PyTest.
                    </p>
                    <div className={cards['tags']}>
                        <span className={cards['tag']}>Next.js</span>
                        <span className={cards['tag']}>FastAPI</span>
                        <span className={cards['tag']}>TypeScript</span>
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

                <h2>MINECRAFT MODS</h2>
                <section className={cards['card']}>
                    <p className={cards['project-year']}>2021</p>
                    <p>
                        I develop and maintain numerous Minecraft mods using Java and (Neo)Forge/Fabric. I personally
                        have over 6 million CurseForge downloads, and I&apos;ve contributed to other mods with download
                        counts in the millions.
                    </p>
                    <div className={cards['tags']}>
                        <span className={cards['tag']}>Java</span>
                        <span className={cards['tag']}>Gradle</span>
                        <span className={cards['tag']}>Kotlin</span>
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

            <Footer />
        </>
    );
}

export function getStaticProps() {
    return { props: {} };
}
