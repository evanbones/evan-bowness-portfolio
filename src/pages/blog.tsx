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
    const [activeReview, setActiveReview] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const processedReviews = useMemo(() => {
        let data = [...reviews];

        if (search.trim()) {
            const lower = search.toLowerCase();
            data = data.filter(
                (r) =>
                    r.artist.toLowerCase().includes(lower) ||
                    r.album.toLowerCase().includes(lower) ||
                    r.genres.some((g) => g.toLowerCase().includes(lower))
            );
        }

        if (sortBy === 'score') {
            data.sort((a, b) => b.score - a.score);
        }

        return data;
    }, [search, sortBy, reviews]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setActiveReview(null);
            setIsClosing(false);
        }, 200);
    };

    return (
        <>
            <Head>
                <title>Music Blog - Evan Bowness</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {activeReview && (
                <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}>
                    <div className={styles.overlayContainer}>
                        <button className={styles.closeBtn} onClick={handleClose}>
                            ← BACK TO LIST
                        </button>

                        <div className={styles.reviewHeader}>
                            <img src={activeReview.cover_url} alt={activeReview.album} className={styles.largeCover} />
                            <h1 className={styles.reviewTitle}>{activeReview.album}</h1>
                            <div className={styles.reviewArtist}>{activeReview.artist}</div>

                            <div className={styles.subInfo} style={{ justifyContent: 'center' }}>
                                {activeReview.genres.map((genre, i) => (
                                    <span key={i} className={styles.genreTag}>
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            <div className={styles.bigScore}>{activeReview.score}/10</div>
                        </div>

                        <div className={styles.reviewBody}>{activeReview.review_text}</div>

                        {activeReview.media_links && (
                            <div className={styles.links}>
                                {Object.entries(activeReview.media_links).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkBtn}
                                    >
                                        Listen on {platform}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!activeReview && (
                <>
                    <Header />

                    <div className={layout.container}>
                        <header className={layout['page-header']}>
                            <h1>THE COLLECTION</h1>
                        </header>

                        <div className={styles.controls}>
                            <input
                                type="text"
                                placeholder="Search artist, album, or genre..."
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
                                <div key={review.id} className={styles.item} onClick={() => setActiveReview(review)}>
                                    <img
                                        src={review.cover_url}
                                        alt={review.album}
                                        className={styles.cover}
                                        loading="lazy"
                                    />

                                    <div className={styles.info}>
                                        <div className={styles.mainInfo}>
                                            <span>{review.artist}</span>
                                            <span className={styles.separator}>—</span>
                                            <span style={{ color: '#fff' }}>{review.album}</span>
                                        </div>
                                        <div className={styles.subInfo}>
                                            {review.genres.slice(0, 3).map((g) => (
                                                <span key={g} className={styles.genreTag}>
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.year}>{review.year}</div>

                                    <div className={styles.scoreBadge}>{review.score}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Footer />
                </>
            )}
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
