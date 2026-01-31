import fs from 'fs/promises';
import Head from 'next/head';
import path from 'path';
import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../css/BlogList.module.css';
import layout from '../css/Layout.module.css';

export default function Blog({ reviews = [] }) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'latest' | 'score'>('latest');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const processedReviews = useMemo(() => {
        let data = [...reviews];

        if (search.trim()) {
            const lower = search.toLowerCase();
            data = data.filter(
                (r) =>
                    r.artist.toLowerCase().includes(lower) ||
                    r.album.toLowerCase().includes(lower) ||
                    r.genre.toLowerCase().includes(lower)
            );
        }

        if (sortBy === 'score') {
            data.sort((a, b) => b.score - a.score);
        } else {
            data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return data;
    }, [search, sortBy, reviews]);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <>
            <Head>
                <title>Music Blog - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div className={layout.container}>
                <header className={layout['page-header']}>
                    <h1>THE COLLECTION</h1>
                </header>

                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Search artists, albums, or genres..."
                        className={styles.searchBar}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className={styles.filterBar}>
                        <button
                            className={`${styles.filterBtn} ${sortBy === 'latest' ? styles.active : ''}`}
                            onClick={() => setSortBy('latest')}
                        >
                            Latest Reviews
                        </button>
                        <button
                            className={`${styles.filterBtn} ${sortBy === 'score' ? styles.active : ''}`}
                            onClick={() => setSortBy('score')}
                        >
                            Top Scores
                        </button>
                    </div>
                </div>

                <div className={styles.list}>
                    {processedReviews.length === 0 && (
                        <p style={{ textAlign: 'center', opacity: 0.5 }}>No albums found.</p>
                    )}

                    {processedReviews.map((review) => (
                        <div key={review.id} className={styles.item} onClick={() => toggleExpand(review.id)}>
                            <div className={styles.itemHeader}>
                                <img src={review.coverUrl} alt={review.album} className={styles.cover} loading="lazy" />

                                <div className={styles.info}>
                                    <div className={styles.mainInfo}>
                                        <span>{review.artist}</span>
                                        <span className={styles.separator}>—</span>
                                        <span style={{ color: '#fff' }}>{review.album}</span>
                                    </div>
                                    <div className={styles.subInfo}>{review.genre}</div>
                                </div>

                                <div className={styles.year}>{review.date.split('-')[0]}</div>

                                <div className={styles.scoreBadge}>{review.score}/10</div>
                            </div>

                            {expandedId === review.id && (
                                <div className={styles.expandedContent}>
                                    <p className={styles.reviewText}>&quot;{review.reviewText}&quot;</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'reviews.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const reviews = JSON.parse(jsonData);

    return {
        props: {
            reviews
        }
    };
}
