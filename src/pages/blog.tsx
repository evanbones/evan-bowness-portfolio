import AppLayout from '@/components/AppLayout';
import { ChevronDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
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

const AVAILABLE_GENRES = [
    'Acid Rock',
    'Alternative Dance',
    'Alternative Hip Hop',
    'Alternative Metal',
    'Alternative R&B',
    'Alternative Rock',
    'Americana',
    'Ambient',
    'Ambient Jazz',
    'Anime',
    'Anti-folk',
    'AOR',
    'Art Pop',
    'Art Rock',
    'Avant-garde',
    'Baroque Pop',
    'Bebop',
    'Bedroom Pop',
    'Black Metal',
    'Bolero',
    'Britpop',
    'Chillwave',
    'Christmas',
    'Classic Rock',
    'Classic Soul',
    'Cloud Rap',
    'Comedy',
    'Contemporary Classical',
    'Cool Jazz',
    'Country Rock',
    'Darkwave',
    'Death Metal',
    'Deathcore',
    'Deathrock',
    'Djent',
    'Downtempo',
    'Dream Pop',
    'Drone',
    'Drone Metal',
    'East Coast Hip Hop',
    'Electro',
    'Electronic',
    'Electronica',
    'Emo',
    'Europop',
    'Experimental',
    'Experimental Hip Hop',
    'Experimental Jazz',
    'Folk',
    'Folk Pop',
    'Folk Punk',
    'Folk Rock',
    'Free Jazz',
    'French House',
    'Funk',
    'Funk Rock',
    'Garage Rock',
    'Glam Metal',
    'Glam Rock',
    'Gothic Metal',
    'Gothic Rock',
    'Grunge',
    'Hard Bop',
    'Hard Rock',
    'Hardcore',
    'Hardcore Hip Hop',
    'Hardcore Punk',
    'Heavy Metal',
    'Hip Hop',
    'Horrorcore',
    'Hyperpop',
    'IDM',
    'Indie',
    'Indie Folk',
    'Indie Rock',
    'Indie Soul',
    'Industrial',
    'Industrial Metal',
    'Industrial Rock',
    'J-rock',
    'Jangle Pop',
    'Japanese Indie',
    'Japanese VGM',
    'Jazz',
    'Jazz Funk',
    'Jazz Fusion',
    'Jazz Pop',
    'Jazz Rap',
    'Krautrock',
    'Latin Folk',
    'Latin Indie',
    'Lo-fi Indie',
    'Madchester',
    'Math Rock',
    'Mathcore',
    'Metal',
    'Metalcore',
    'Midwest Emo',
    'Minimalism',
    'Motown',
    'Musicals',
    'Neo Soul',
    'Neo-psychedelic',
    'Neoclassical',
    'Neofolk',
    'New Age',
    'New Jack Swing',
    'New Rave',
    'New Wave',
    'Noise Rock',
    'Northern Soul',
    'Nu Metal',
    'Old School Hip Hop',
    'Plunderphonics',
    'Polka',
    'Pop',
    'Pop Punk',
    'Post-grunge',
    'Post-hardcore',
    'Post-punk',
    'Post-rock',
    'Progressive Metal',
    'Progressive Rock',
    'Proto-punk',
    'Psychedelic Rock',
    'R&B',
    'Rap',
    'Rap Metal',
    'Rock',
    'Score',
    'Screamo',
    'Shibuya-kei',
    'Shoegaze',
    'Singer-songwriter',
    'Slowcore',
    'Sludge Metal',
    'Soft Rock',
    'Soul',
    'Soul Jazz',
    'Soundtrack',
    'Southern Gothic',
    'Southern Hip Hop',
    'Space Rock',
    'Spoken Word',
    'Stoner Metal',
    'Stoner Rock',
    'Synthpop',
    'Thrash Metal',
    'Trip Hop',
    'Vaporwave',
    'Vocal Jazz',
    'West Coast Hip Hop',
    'Yacht Rock'
];

const getPageNumbers = (current: number, total: number, delta = 2) => {
    if (total <= 1) return [];
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

const getHashColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 60%)`;
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
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [genreSearch, setGenreSearch] = useState('');
    const [paginationDelta, setPaginationDelta] = useState(2);

    const [activeReview, setActiveReview] = useState<Review | null>(null);

    const totalPages = Math.ceil(totalItems / pageSize);

    const filteredGenres = AVAILABLE_GENRES.filter((g) => g.toLowerCase().includes(genreSearch.toLowerCase()));

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({
            page: page.toString(),
            limit: pageSize.toString(),
            search: debouncedSearch,
            sort: sortBy,
            scores: selectedScores.join(','),
            genres: selectedGenres.join(',')
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
    }, [page, pageSize, debouncedSearch, sortBy, selectedScores, selectedGenres]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, sortBy, selectedScores, selectedGenres, pageSize]);

    useEffect(() => {
        const handleResize = () => {
            setPaginationDelta(window.innerWidth < 640 ? 1 : 2);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const toggleScore = (score: number) => {
        setSelectedScores((prev) => (prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]));
    };

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));
    };

    const clearAllFilters = () => {
        setSelectedScores([]);
        setSelectedGenres([]);
        setSearch('');
    };

    const changePage = (newPage: number, scrollToTop: boolean) => {
        setPage(newPage);
        if (scrollToTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getSortLabel = (val: string) => {
        switch (val) {
            case 'latest':
                return 'Latest Added';
            case 'score':
                return 'Highest Score';
            case 'year':
                return 'Year (Newest)';
            case 'oldest':
                return 'Year (Oldest)';
            default:
                return 'Latest Added';
        }
    };

    const Pagination = ({ isBottom = false }) => {
        if (totalPages <= 1) return null;
        const pages = getPageNumbers(page, totalPages, paginationDelta);

        return (
            <div className={styles.pagination}>
                <button
                    className={styles.pageBtn}
                    onClick={() => changePage(Math.max(1, page - 1), isBottom)}
                    disabled={page === 1}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={20} />
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
                            onClick={() => changePage(p, isBottom)}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    className={styles.pageBtn}
                    onClick={() => changePage(Math.min(totalPages, page + 1), isBottom)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                >
                    <ChevronRight size={20} />
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
                <p>{totalItems} albums currently visible</p>
            </div>

            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <div className={styles.filterWidget}>
                        <div className={styles.filterHeader}>
                            <span className={styles.filterTitle}>Score</span>
                        </div>
                        <div className={styles.filterList}>
                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
                                <div
                                    key={score}
                                    className={`${styles.filterItem} ${selectedScores.includes(score) ? styles.active : ''}`}
                                    onClick={() => toggleScore(score)}
                                >
                                    <span>{score}/10</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterWidget}>
                        <div className={styles.filterHeader}>
                            <span className={styles.filterTitle}>Genre</span>
                        </div>

                        <div className={styles.genreSearchWrapper}>
                            <Search size={14} className={styles.genreSearchIcon} />
                            <input
                                type="text"
                                placeholder="Find a genre..."
                                className={styles.genreSearchInput}
                                value={genreSearch}
                                onChange={(e) => setGenreSearch(e.target.value)}
                            />
                        </div>

                        <div className={styles.filterListScroll}>
                            {filteredGenres.map((genre) => (
                                <div
                                    key={genre}
                                    className={`${styles.filterItem} ${selectedGenres.includes(genre) ? styles.active : ''}`}
                                    onClick={() => toggleGenre(genre)}
                                >
                                    <span>{genre}</span>
                                </div>
                            ))}
                            {filteredGenres.length === 0 && <div className={styles.noResults}>No genres found</div>}
                        </div>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.controlsBar}>
                        <div className={styles.searchContainer}>
                            <div className={styles.inputWrapper}>
                                <Search className={styles.searchIcon} size={20} />
                                <input
                                    type="text"
                                    className={styles.sidebarSearchInput}
                                    placeholder="Search albums, artists..."
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

                        <div className={styles.controlsTopRow}>
                            <div className={styles.controlGroup}>
                                <div className={styles.dropdownWrapper}>
                                    <span className={styles.dropdownLabel}>Sort:</span>
                                    <span className={styles.dropdownValue}>{getSortLabel(sortBy)}</span>
                                    <ChevronDown size={14} className={styles.selectArrow} />
                                    <select
                                        className={styles.hiddenSelect}
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="latest">Latest Added</option>
                                        <option value="score">Highest Score</option>
                                        <option value="year">Year (Newest)</option>
                                        <option value="oldest">Year (Oldest)</option>
                                    </select>
                                </div>

                                <div className={styles.dropdownWrapper} style={{ minWidth: '120px' }}>
                                    <span className={styles.dropdownLabel}>View:</span>
                                    <span className={styles.dropdownValue}>{pageSize}</span>
                                    <ChevronDown size={14} className={styles.selectArrow} />
                                    <select
                                        className={styles.hiddenSelect}
                                        value={pageSize}
                                        onChange={(e) => setPageSize(parseInt(e.target.value))}
                                    >
                                        <option value="12">12</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                            <Pagination isBottom={false} />
                        </div>

                        {(selectedScores.length > 0 || selectedGenres.length > 0) && (
                            <div className={styles.activeFiltersSummary}>
                                <button className={styles.clearAllBtn} onClick={clearAllFilters}>
                                    Clear All
                                </button>
                                {selectedScores.map((score) => (
                                    <div
                                        key={`s-${score}`}
                                        className={styles.summaryPill}
                                        onClick={() => toggleScore(score)}
                                    >
                                        Score: {score} <X size={14} />
                                    </div>
                                ))}
                                {selectedGenres.map((genre) => (
                                    <div
                                        key={`g-${genre}`}
                                        className={styles.summaryPill}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre} <X size={14} />
                                    </div>
                                ))}
                            </div>
                        )}
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
                                    className={`${cardStyles.card} ${styles.blogCard}`}
                                    onClick={() => setActiveReview(review)}
                                >
                                    <div className={styles.cardImageContainer}>
                                        <img src={review.cover_url} alt={review.album} loading="lazy" />
                                        <div className={styles.cardOverlayScore}>
                                            <span className={review.score >= 9 ? styles.scoreHigh : ''}>
                                                {review.score}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <div className={styles.cardHeader}>
                                            <h2 className={styles.cardTitle}>{review.album}</h2>
                                            <span className={styles.cardArtist}>{review.artist}</span>
                                        </div>

                                        <div className={styles.cardFooter}>
                                            <div className={styles.cardTags}>
                                                {review.genres.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={cardStyles.tag}
                                                        style={{
                                                            color: getHashColor(tag),
                                                            borderColor: getHashColor(tag) + '40',
                                                            backgroundColor: getHashColor(tag) + '10'
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {review.genres.length > 2 && (
                                                    <span className={cardStyles.tag}>+{review.genres.length - 2}</span>
                                                )}
                                            </div>
                                            <span className={styles.cardYear}>{review.year}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.bottomPagination}>
                        <Pagination isBottom={true} />
                    </div>
                </main>
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
                                        {activeReview.genres.map((tag) => (
                                            <span
                                                key={tag}
                                                className={cardStyles.tag}
                                                style={{
                                                    color: getHashColor(tag),
                                                    borderColor: getHashColor(tag) + '40',
                                                    backgroundColor: getHashColor(tag) + '10'
                                                }}
                                            >
                                                {tag}
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
