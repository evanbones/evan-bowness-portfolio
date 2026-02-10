import AppLayout from '@/components/AppLayout';
import fs from 'fs/promises';
import Head from 'next/head';
import path from 'path';
import { useEffect, useMemo, useState } from 'react';
import styles from '../css/BlogList.module.css';
import cardStyles from '../css/Card.module.css';

const getGenreColor = (genre: string) => {
    let hash = 0;
    for (let i = 0; i < genre.length; i++) {
        hash = genre.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 85%, 65%)`;
};

export default function Blog({ reviews = [] }) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'latest' | 'score'>('latest');
    const [activeReview, setActiveReview] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [limit, setLimit] = useState(12);

    const processedReviews = useMemo(() => {
        let data = [...reviews];
        if (search.trim()) {
            const lower = search.toLowerCase();
            data = data.filter(
                (r) =>
                    r.artist.toLowerCase().includes(lower) ||
                    r.album.toLowerCase().includes(lower) ||
                    r.genres.some((g: string) => g.toLowerCase().includes(lower))
            );
        }
        if (sortBy === 'score') {
            data.sort((a, b) => b.score - a.score);
        }
        return data;
    }, [search, sortBy, reviews]);

    useEffect(() => {
        setLimit(12);
    }, [search, sortBy]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setActiveReview(null);
            setIsClosing(false);
        }, 200);
    };

    const visibleReviews = processedReviews.slice(0, limit);

    return (
        <AppLayout>
            <Head>
                <title>The Collection - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {activeReview && (
                <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`} onClick={handleClose}>
                    <div className={styles.overlayContainer} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.overlayHeader}>
                            <button className={styles.closeBtn} onClick={handleClose}>
                                Close
                            </button>
                        </div>

                        <div className={styles.reviewContent}>
                            <img src={activeReview.cover_url} alt={activeReview.album} className={styles.largeCover} />

                            <div className={styles.reviewMeta}>
                                <h1 className={styles.reviewTitle}>{activeReview.album}</h1>
                                <div className={styles.reviewArtist}>{activeReview.artist}</div>
                                <div className={styles.tagRow}>
                                    {activeReview.genres.map((genre: string, i: number) => {
                                        const color = getGenreColor(genre);
                                        return (
                                            <span
                                                key={i}
                                                className={cardStyles.tag}
                                                style={{
                                                    color: '#fff',
                                                    backgroundColor: color,
                                                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                                }}
                                            >
                                                {genre}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className={styles.bigScore} style={{ color: 'var(--color-brand)' }}>
                                    {activeReview.score}/10
                                </div>
                            </div>
                        </div>

                        <div className={styles.reviewBody}>{activeReview.review_text}</div>
                    </div>
                </div>
            )}

            <div className={cardStyles['header-widget']}>
                <h1>The Collection</h1>
                <p>A personal archive of music reviews, ratings, and thoughts.</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <svg
                        className={styles.searchIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search albums, artists, or genres..."
                        className={styles.searchBar}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.filterBar}>
                    <button
                        className={`${styles.filterBtn} ${sortBy === 'latest' ? styles.active : ''}`}
                        onClick={() => setSortBy('latest')}
                    >
                        Latest
                    </button>
                    <button
                        className={`${styles.filterBtn} ${sortBy === 'score' ? styles.active : ''}`}
                        onClick={() => setSortBy('score')}
                    >
                        Top Rated
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                {visibleReviews.map((review) => (
                    <div key={review.id} className={styles.card} onClick={() => setActiveReview(review)}>
                        <img src={review.cover_url} alt={review.album} className={styles.cardCover} loading="lazy" />
                        <div className={styles.cardInfo}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{review.album}</h3>
                                <span className={styles.scoreBadge}>{review.score}</span>
                            </div>
                            <div className={styles.cardArtist}>{review.artist}</div>
                            <div className={styles.cardTags}>
                                {review.genres.slice(0, 3).map((g: string) => (
                                    <span
                                        key={g}
                                        className={styles.miniTag}
                                        style={{
                                            borderColor: getGenreColor(g),
                                            color: getGenreColor(g)
                                        }}
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {limit < processedReviews.length && (
                <div className={styles.loadMoreContainer}>
                    <button className={styles.loadMoreBtn} onClick={() => setLimit((l) => l + 12)}>
                        Load More
                    </button>
                </div>
            )}
        </AppLayout>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'reviews.json');
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const reviews = JSON.parse(jsonData);
        return { props: { reviews } };
    } catch (e) {
        return { props: { reviews: [] } };
    }
}
