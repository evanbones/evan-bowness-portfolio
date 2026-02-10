import Head from 'next/head';
import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import cards from '../css/Card.module.css';
import home from '../css/Home.module.css';

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AppLayout>
            <Head>
                <title>Evan Bowness - Developer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className={cards['header-widget']}>
                <h1>Evan Bowness</h1>
                <p>Full Stack Developer & Open Source Contributor</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <section className={cards['card']}>
                    <div className={cards['card-header']}>
                        <h2>About Me</h2>
                    </div>
                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                        <p style={{ padding: 0, marginBottom: '1rem' }}>
                            I&apos;m Evan, a developer based in Canada with a passion for system design and open source
                            software.
                        </p>
                        <p style={{ padding: 0 }}>
                            My background includes extensive work in the Minecraft modding community, alongside modern
                            web technologies like Next.js, FastAPI, and Python.
                        </p>
                    </div>
                </section>

                <section className={`${cards['card']} ${home['contact-section']}`}>
                    <div className={cards['card-header']}>
                        <h2 style={{ marginBottom: '1rem' }}>Quick Contact</h2>
                    </div>

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
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={home.input}
                            />
                        </div>
                        <div className={home['form-group']}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={home.input}
                            />
                        </div>
                        <div className={home['form-group']}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="How can I help you?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className={home.input}
                            />
                        </div>

                        <button type="submit" className={home['submit-btn']}>
                            Send Message
                        </button>

                        {status && <div className={home['success-message']}>{status}</div>}
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
