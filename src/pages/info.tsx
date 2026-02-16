import AppLayout from '@/components/AppLayout';
import { Briefcase, Code, Coffee, Terminal, User } from 'lucide-react';
import Head from 'next/head';
import cards from '../css/Card.module.css';
import layout from '../css/Layout.module.css';

export default function Info() {
    return (
        <AppLayout>
            <Head>
                <title>Info - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className={cards['header-widget']}>
                <h1>About Me</h1>
                <p>More about who I am and what I do.</p>
            </div>

            <div className={layout.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                <section className={cards['card']}>
                    <div className={cards['card-header']}>
                        <h2>
                            <User className="text-brand" size={24} /> Who I Am
                        </h2>
                    </div>
                    <p>
                        Hey there! I&apos;m Evan, a junior developer passionate about building creative projects that
                        push my skills. I love working with modern frameworks and learning new technologies, while still
                        improving my design knowledge and fundamentals.
                    </p>
                </section>

                <section className={cards['card']}>
                    <div className={cards['card-header']}>
                        <h2>
                            <Code className="text-brand" size={24} /> What I Do
                        </h2>
                    </div>
                    <p>
                        I&apos;m currently working towards finishing my degree in Computer Science at the University of
                        British Columbia. My main learning focuses are full-stack development with React, Next.js,
                        TypeScript, database management software, and FastAPI.
                    </p>
                </section>

                <section className={cards['card']}>
                    <div className={cards['card-header']}>
                        <h2>
                            <Terminal className="text-brand" size={24} /> Tech Stack
                        </h2>
                    </div>
                    <p>
                        I enjoy working with most web technologies, but I&apos;m most comfortable with React, Next.js,
                        and TypeScript on the frontend, and with Node.js, Python/FastAPI, or SQL databases for the
                        backend.
                    </p>
                </section>

                <section className={cards['card']} style={{ gridColumn: '1 / -1' }}>
                    <div className={cards['card-header']}>
                        <h2>
                            <Briefcase className="text-brand" size={24} /> Experience
                        </h2>
                    </div>
                    <div className={cards.timeline}>
                        <div className={cards['timeline-item']}>
                            <h3>Okanagan Marine Robotics Sub-Team Member</h3>
                            <div style={{ marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
                                2025 - Present
                            </div>
                            <p>Writing software as part of the integration team in the UBCO Marine Robotics Club.</p>
                        </div>
                        <div className={cards['timeline-item']}>
                            <h3>Junior Developer</h3>
                            <div style={{ marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
                                2024 - Present
                            </div>
                            <p>
                                Creating Python automations and helping to develop a VB.NET inventory management
                                application for Valhalla Pure Outfitters.
                            </p>
                        </div>
                        <div className={cards['timeline-item']}>
                            <h3>University Student</h3>
                            <div style={{ marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>2023 - 2028</div>
                            <p>
                                Currently taking Computer Science (BSc) with a Minor in Mathematics at the University of
                                British Columbia.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={cards['card']} style={{ gridColumn: '1 / -1' }}>
                    <div className={cards['card-header']}>
                        <h2>
                            <Coffee className="text-brand" size={24} /> When I&apos;m Not Coding
                        </h2>
                    </div>
                    <p>
                        You&apos;ll usually find me discovering new music, reading a book, drinking coffee, watching
                        movies, hiking, playing games, or producing music.
                    </p>
                </section>
            </div>
        </AppLayout>
    );
}

export function getStaticProps() {
    return { props: {} };
}
