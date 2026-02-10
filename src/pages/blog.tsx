import AppLayout from '@/components/AppLayout';
import { Calendar, Check, ChevronDown, Search, Star } from 'lucide-react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from '../css/BlogList.module.css';
import cardStyles from '../css/Card.module.css';

type Review = {
    id: string;
    score: number;
    album: string;
    artist: string;
    genres: string[];
    media_links: { Spotify?: string };
    year: string;
    cover_url: string;
    review_text: string;
};

const getPageNumbers = (current: number, total: number) => {
    if (total <= 1) return [];
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        range.push(i);
    }
    if (current - delta > 2) range.unshift(-1);
    if (current + delta < total - 1) range.push(-1);

    range.unshift(1);
    if (total !== 1) range.push(total);

    return range;
};

export default function Blog() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [sortBy, setSortBy] = useState('latest');
    const [selectedScores, setSelectedScores] = useState<number[]>([]);

    const [activeReview, setActiveReview] = useState<Review | null>(null);

    const totalPages = Math.ceil(totalItems / pageSize);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({
            page: page.toString(),
            limit: pageSize.toString(),
            search: debouncedSearch,
            sort: sortBy,
            scores: selectedScores.join(',')
        });

        try {
            const res = await fetch(`/api/reviews?${params}`);
            const data = await res.json();
            setReviews(data.reviews);
            setTotalItems(data.total);
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, debouncedSearch, sortBy, selectedScores]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, sortBy, selectedScores, pageSize]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const toggleScore = (score: number) => {
        setSelectedScores((prev) => (prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]));
    };

    const Pagination = () => {
        if (totalPages <= 1) return null;
        const pages = getPageNumbers(page, totalPages);

        return (
            <div className={styles.pagination}>
                <button
                    className={styles.pageBtn}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    &lt;
                </button>
                {pages.map((p, idx) =>
                    p === -1 ? (
                        <span key={`sep-${idx}`} className={styles.pageSep}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={idx}
                            className={`${styles.pageBtn} ${page === p ? styles.active : ''}`}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    className={styles.pageBtn}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    return (
        <AppLayout>
            <Head>
                <title>The Collection - Evan Bowness</title>
            </Head>

            <div className={cardStyles['header-widget']}>
                <h1>The Collection</h1>
                <p>Database of {totalItems} albums reviewed.</p>
            </div>

            <div className={styles.container}>
                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <div className={styles.searchContainer}>
                            <div className={styles.inputWrapper}>
                                <Search className={styles.searchIcon} size={18} />
                                <input
                                    type="text"
                                    className={styles.sidebarSearchInput}
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {search && (
                                    <button className={styles.clearSearch} onClick={() => setSearch('')}>
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.filterWidget}>
                            <div className={styles.filterHeader}>
                                <span className={styles.filterTitle}>Score</span>
                            </div>
                            <div className={styles.filterList}>
                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
                                    <label key={score} className={styles.checkboxItem}>
                                        <input
                                            type="checkbox"
                                            checked={selectedScores.includes(score)}
                                            onChange={() => toggleScore(score)}
                                        />
                                        <div className={styles.customCheckbox}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <span className={styles.filterLabel}>{score}/10</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <main className={styles.mainContent}>
                        <div className={styles.controlsBar}>
                            <div className={styles.controlGroup}>
                                <div className={styles.dropdownWrapper}>
                                    <label>Sort by:</label>
                                    <div className={styles.selectContainer}>
                                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                            <option value="latest">Latest Added</option>
                                            <option value="score">Highest Score</option>
                                            <option value="year">Year (Newest)</option>
                                            <option value="oldest">Year (Oldest)</option>
                                        </select>
                                        <ChevronDown size={14} className={styles.selectArrow} />
                                    </div>
                                </div>

                                <div className={styles.dropdownWrapper}>
                                    <label>View:</label>
                                    <div className={styles.selectContainer}>
                                        <select
                                            value={pageSize}
                                            onChange={(e) => setPageSize(parseInt(e.target.value))}
                                        >
                                            <option value="12">12</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                        </select>
                                        <ChevronDown size={14} className={styles.selectArrow} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.paginationSimple}>
                                <Pagination />
                            </div>
                        </div>

                        {loading && reviews.length === 0 ? (
                            <div className={styles.loadingState}>
                                <div className={styles.spinner}></div>
                                Loading content...
                            </div>
                        ) : (
                            <div className={styles.listGrid}>
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className={styles.listItem}
                                        onClick={() => setActiveReview(review)}
                                    >
                                        <div className={styles.listCover}>
                                            <img src={review.cover_url} alt={review.album} loading="lazy" />
                                        </div>

                                        <div className={styles.listContent}>
                                            <div className={styles.listHeader}>
                                                <h2 className={styles.listTitle}>{review.album}</h2>
                                                <span className={styles.listArtist}>by {review.artist}</span>
                                            </div>

                                            <p className={styles.listDesc}>{review.review_text.substring(0, 140)}...</p>

                                            <div className={styles.listTags}>
                                                {review.genres.slice(0, 3).map((genre, i) => (
                                                    <span key={i} className={styles.listTag}>
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={styles.listStats}>
                                            <div className={styles.statItem} title="Score">
                                                <Star size={14} className={styles.statIcon} />
                                                <span>{review.score}</span>
                                            </div>
                                            <div className={styles.statItem} title="Year">
                                                <Calendar size={14} className={styles.statIcon} />
                                                <span>{review.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={styles.bottomPagination}>
                            <Pagination />
                        </div>
                    </main>
                </div>
            </div>

            {activeReview && (
                <div className={styles.overlay} onClick={() => setActiveReview(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Review Details</h3>
                            <button className={styles.closeBtn} onClick={() => setActiveReview(null)}>
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalSplit}>
                                <div className={styles.modalCoverWrapper}>
                                    <img
                                        src={activeReview.cover_url}
                                        alt={activeReview.album}
                                        className={styles.modalCover}
                                    />
                                    {activeReview.media_links?.Spotify && (
                                        <a
                                            href={activeReview.media_links.Spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.modalLinkBtn}
                                        >
                                            Open in Spotify
                                        </a>
                                    )}
                                </div>
                                <div className={styles.modalContent}>
                                    <h1 className={styles.modalTitle}>{activeReview.album}</h1>
                                    <div className={styles.modalSubtitle}>
                                        {activeReview.artist} • {activeReview.year}
                                    </div>
                                    <div className={styles.modalScore}>
                                        <span className={styles.scoreValue}>{activeReview.score}</span>
                                        <span className={styles.scoreMax}>/10</span>
                                    </div>
                                    <div className={styles.modalTags}>
                                        {activeReview.genres.map((g, i) => (
                                            <span key={i} className={cardStyles.tag}>
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={styles.modalText}>{activeReview.review_text}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
