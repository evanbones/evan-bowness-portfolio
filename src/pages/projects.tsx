import AppLayout from '@/components/AppLayout';
import ImageCarousel from '@/components/ImageCarousel';
import { ExternalLink, Github } from 'lucide-react';
import Head from 'next/head';
import cards from '../css/Card.module.css';
import layout from '../css/Layout.module.css';

const getHashColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 60%)`;
};

export default function Projects() {
    const renderTag = (tag: string) => (
        <span
            key={tag}
            className={cards.tag}
            style={{
                color: getHashColor(tag),
                borderColor: getHashColor(tag) + '40',
                backgroundColor: getHashColor(tag) + '10'
            }}
        >
            {tag}
        </span>
    );

    return (
        <AppLayout>
            <Head>
                <title>Projects - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className={cards['header-widget']}>
                <h1>Projects</h1>
                <p>A collection of my work in web development, robotics, and software engineering.</p>
            </div>

            <div className={layout.grid}>
                <section className={cards['card']}>
                    <ImageCarousel
                        images={['/images/portfolio-1.png', '/images/portfolio-2.png', '/images/portfolio-3.png']}
                    />
                    <div className={cards['card-header']}>
                        <h2>Portfolio Website</h2>
                        <span className={cards['project-year']}>2026</span>
                    </div>
                    <p>
                        A simple and modern personal portfolio and music blog featuring interactive elements, smooth
                        animations, and a clean aesthetic. Built with Next.js and custom CSS.
                    </p>
                    <div className={cards['tags']}>
                        {['Next.js', 'React', 'TypeScript', 'CSS Modules'].map(renderTag)}
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/evanbones/evan-bowness-portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            <Github size={18} /> Code
                        </a>
                        <a href="https://evanbowness.dev/" className={cards['project-link']}>
                            <ExternalLink size={18} /> Live Demo
                        </a>
                    </div>
                </section>

                <section className={cards['card']}>
                    <ImageCarousel images={['/images/igifup-1.png', '/images/igifup-2.png']} />
                    <div className={cards['card-header']}>
                        <h2>iGIFup</h2>
                        <span className={cards['project-year']}>2025</span>
                    </div>
                    <p>
                        An early 2000s-style e-commerce site for buying and selling retro GIFs. Awarded top project of
                        the year in the class, as well as being named in the most unique projects of the year.
                    </p>
                    <div className={cards['tags']}>{['SQL Server', 'JSP', 'Java', 'HTML/CSS'].map(renderTag)}</div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/evanbones/iGIFup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            <Github size={18} /> Code
                        </a>
                        <a href="https://igifup.azurewebsites.net/" className={cards['project-link']}>
                            <ExternalLink size={18} /> Live Demo
                        </a>
                    </div>
                </section>

                <section className={cards['card']}>
                    <ImageCarousel images={['/images/tune-gui-1.jpg', '/images/tune-gui-2.jpg']} />
                    <div className={cards['card-header']}>
                        <h2>Tune GUI</h2>
                        <span className={cards['project-year']}>2025</span>
                    </div>
                    <p>
                        A PyQt5-based GUI for tuning ROS2 node parameters and editing params.yaml files in real-time.
                        Created as part of my work for the Okanagan Marine Robotics Club.
                    </p>
                    <div className={cards['tags']}>{['Python', 'ROS2', 'PyQt5', 'Robotics'].map(renderTag)}</div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/Okanagan-Marine-Robotics/tune_gui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            <Github size={18} /> Code
                        </a>
                    </div>
                </section>

                <section className={cards['card']}>
                    <ImageCarousel images={['/images/movie-dataset-1.png', '/images/movie-dataset-2.png']} />
                    <div className={cards['card-header']}>
                        <h2>Movie Dataset</h2>
                        <span className={cards['project-year']}>2025</span>
                    </div>
                    <p>
                        A full-stack movie recommendation website using Next.js and FastAPI. Features user
                        authentication, movie ratings, and personalized recommendations based on user preferences.
                    </p>
                    <div className={cards['tags']}>
                        {['Next.js', 'FastAPI', 'TypeScript', 'Machine Learning'].map(renderTag)}
                    </div>
                    <div className={cards['project-links']}>
                        <a
                            href="https://github.com/Null-Pointers-2/COSC-310-Project-2025"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cards['project-link']}
                        >
                            <Github size={18} /> Code
                        </a>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
