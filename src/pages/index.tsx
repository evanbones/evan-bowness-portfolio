import Head from 'next/head';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import cards from '../css/Card.module.css';
import home from '../css/Home.module.css';
import layout from '../css/Layout.module.css';

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const myForm = e.target as HTMLFormElement;
        const data = new FormData(myForm);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data as any).toString()
        })
            .then(() => {
                setFormData({ name: '', email: '', message: '' });
                setStatus('Message received! Thanks!');

                setTimeout(() => setStatus(''), 5000);
            })
            .catch((error) => setStatus('Error sending message. Please try again.'));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Head>
                <title>Evan Bowness - Junior Developer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div className={layout.container}>
                <header className={home.hero}>
                    <div className={cards['card']} style={{ display: 'inline-block', padding: '3rem 4rem' }}>
                        <h1>EVAN BOWNESS</h1>
                    </div>
                    <p className={home.subtitle} style={{ marginBottom: 0 }}>
                        Developer & Creator
                    </p>
                </header>
                <h2>WELCOME</h2>
                <section className={cards['card']}>
                    <p>
                        I&apos;m a full stack developer based in Canada with a focus on system design. My background
                        includes work in the Minecraft modding community, where I learned Java and how to use Git.
                        I&apos;ve also written software using VB.net, Python, FastAPI, and Next.js.
                    </p>
                    <p>Check out my work, read my thoughts, or get in touch below.</p>
                </section>

                <h2>GET IN TOUCH</h2>
                <section className={`${cards['card']} ${home['contact-section']}`}>
                    <p>Have a project in mind? Let&apos;s work together!</p>
                    <form
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        onSubmit={handleSubmit}
                        className={home['contact-form']}
                    >
                        <input type="hidden" name="form-name" value="contact" />

                        <div className={home['form-group']}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={home['form-group']}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={home['form-group']}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={home['submit-btn']}>
                            SEND MESSAGE
                        </button>

                        {status && <div className={home['success-message']}>{status}</div>}
                    </form>

                    <p className={home['contact-email']}>
                        Or email me directly at: <a href="mailto:bownessevan@gmail.com">bownessevan@gmail.com</a>
                    </p>
                </section>
            </div>

            <Footer />
        </>
    );
}
