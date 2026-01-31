import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import cards from '../css/Card.module.css';
import layout from '../css/Layout.module.css';

export default function Info() {
    return (
        <>
            <Head>
                <title>Info - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div className={layout.container}>
                <header className={layout['page-header']}>
                    <h1>ABOUT ME</h1>
                </header>

                <h2>WHO I AM</h2>
                <section className={cards['card']}>
                    <p>
                        Hey there! I&apos;m Evan, a junior developer passionate about building creative projects that
                        push my skills.
                    </p>
                    <p>
                        I love working with modern frameworks and learning new technologies, while still improving my
                        design knowledge and fundamentals.
                    </p>
                </section>
                <h2>WHAT I DO</h2>

                <section className={cards['card']}>
                    <p>
                        I&apos;m currently working towards finishing my degree in Computer Science at the University of
                        British Columbia. My main learning focuses are full-stack development with React, Next.js,
                        TypeScript, database management software, and FastAPI.
                    </p>
                </section>

                <h2>EXPERIENCE</h2>
                <section className={cards['card']}>
                    <div className={cards.timeline}>
                        <div className={cards['timeline-item']}>
                            <h3>Okanagan Marine Robotics Sub-Team Member</h3>
                            <p className={cards['timeline-date']}>2025 - Present</p>
                            <p>Writing software as part of the integration team in the UBCO Marine Robotics Club.</p>
                        </div>
                        <div className={cards['timeline-item']}>
                            <h3>Junior Developer</h3>
                            <p className={cards['timeline-date']}>2024 - Present</p>
                            <p>
                                Creating Python automations and helping to develop a VB.NET inventory management
                                application for Valhalla Pure Outfitters.
                            </p>
                        </div>
                        <div className={cards['timeline-item']}>
                            <h3>University Student</h3>
                            <p className={cards['timeline-date']}>2023 - 2028</p>
                            <p>
                                Currently taking Computer Science (BSc) with a Minor in Mathematics at the University of
                                British Columbia.
                            </p>
                        </div>
                        <div className={cards['timeline-item']}>
                            <h3>Game Modder</h3>
                            <p className={cards['timeline-date']}>2021 - Present</p>
                            <p>Developing and maintaining multiple Minecraft mods using Java and (Neo)Forge/Fabric.</p>
                        </div>
                    </div>
                </section>

                <h2>WHEN I&apos;M NOT CODING</h2>
                <section className={cards['card']}>
                    <p>
                        You&apos;ll usually find me discovering new music, reading a book, drinking coffee, watching
                        movies, hiking, playing games, or producing music.
                    </p>
                </section>
            </div>

            <Footer />
        </>
    );
}

export function getStaticProps() {
    return { props: {} };
}
