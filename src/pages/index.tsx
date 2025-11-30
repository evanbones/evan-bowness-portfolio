import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import home from '/src/css/Home.module.css';
import layout from '/src/css/Layout.module.css';
import cards from '/src/css/VinylCard.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent!');
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
        <title>Evan Bowness - Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className={layout['nav-bar']}>
        <div className={layout['nav-left']}>
          <Link href="/" className={layout['home-link']}>HOME</Link>
        </div>
        <div className={layout['nav-right']}>
          <Link href="/info">INFO</Link>
          <Link href="/projects">PROJECTS</Link>
          <Link href="/blog">BLOG</Link>
          <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </nav>

      <div className={layout.container}>
        {/* Hero Section */}
        <header className={home.hero}>
          <h1>EVAN BOWNESS</h1>
          <p className={home.subtitle}>Developer & Creator</p>
          <div className={cards['genre-tags']}>
            <span className={cards['genre-tag']}>Full-Stack</span>
            <span className={cards['genre-tag']}>React</span>
            <span className={cards['genre-tag']}>Next.js</span>
            <span className={cards['genre-tag']}>TypeScript</span>
          </div>
        </header>

        {/* Welcome Section */}
        <section className={cards['vinyl-card']}>
          <h2>WELCOME</h2>
          <p>
            Developer. Creator. Problem solver. Building modern web experiences
            with a touch of nostalgia.
          </p>
          <p>
            Check out my work, read my thoughts, or drop me a line below.
          </p>
        </section>

        {/* Contact Section */}
        <section className={`${cards['vinyl-card']} ${home['contact-section']}`}>
          <h2>GET IN TOUCH</h2>
          <p>Have a project in mind? Let's work together!</p>
          <form onSubmit={handleSubmit} className={home['contact-form']}>
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
            <button type="submit" className={home['submit-btn']}>SEND MESSAGE</button>
          </form>
          <p className={home['contact-email']}>
            Or email me directly at: <a href="mailto:bownessevan@gmail.com">bownessevan@gmail.com</a>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className={layout.footer}>
        <div className={layout['footer-content']}>
          <div className={layout['footer-links']}>
            <Link href="/info">Info</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <p className={layout.copyright}>© 2025 Evan Bowness. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}