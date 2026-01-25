import fs from 'fs/promises';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import { useEffect, useMemo, useRef, useState } from 'react';
import crate from '../css/Crate.module.css';
import layout from '../css/Layout.module.css';
import player from '../css/Player.module.css';

const ACTIVE_OFFSET = 2;
const MAX_RENDER_DIST = 30;

function useAnimatedText(text) {
    const [display, setDisplay] = useState(text);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (text !== display) {
            setIsFadingOut(true);
            const timer = setTimeout(() => {
                setDisplay(text);
                setIsFadingOut(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [text, display]);

    return { display, isFadingOut };
}

export default function Blog({ reviews = [] }) {
    const [scrollPos, setScrollPos] = useState(-ACTIVE_OFFSET);
    const [showDetail, setShowDetail] = useState(false);
    const [filterGenre, setFilterGenre] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    const interactionZoneRef = useRef<HTMLDivElement>(null);
    const scrollAccumulator = useRef(0);

    const processedReviews = useMemo(() => {
        let data = [...reviews];

        if (filterGenre !== 'All') {
            data = data.filter((r) => r.genre === filterGenre);
        }

        data.sort((a, b) => {
            if (sortBy === 'score') return b.score - a.score;
            if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        const MIN_LOOP_SIZE = 45;
        if (data.length > 0 && data.length < MIN_LOOP_SIZE) {
            const copiesNeeded = Math.ceil(MIN_LOOP_SIZE / data.length);
            let paddedData = [];
            for (let i = 0; i < copiesNeeded; i++) {
                paddedData = [...paddedData, ...data];
            }
            data = paddedData;
        }

        return data;
    }, [filterGenre, sortBy, reviews]);

    const total = processedReviews.length;

    let activeIndex = (Math.round(scrollPos) + ACTIVE_OFFSET) % total;
    if (activeIndex < 0) activeIndex += total;
    const clickableAlbum = processedReviews[activeIndex];

    const activeArtist = clickableAlbum?.artist || '';
    const { display: animatedArtistText, isFadingOut } = useAnimatedText(activeArtist);

    useEffect(() => {
        const handleCrateScroll = (e) => {
            if (showDetail) return;

            if (!interactionZoneRef.current?.contains(e.target)) {
                return;
            }

            e.preventDefault();

            scrollAccumulator.current += e.deltaY;
            const SNAP_THRESHOLD = 100;

            if (scrollAccumulator.current > SNAP_THRESHOLD) {
                setScrollPos((prev) => prev + 1);
                scrollAccumulator.current = 0;
            } else if (scrollAccumulator.current < -SNAP_THRESHOLD) {
                setScrollPos((prev) => prev - 1);
                scrollAccumulator.current = 0;
            }
        };

        const element = interactionZoneRef.current;
        if (element) {
            element.addEventListener('wheel', handleCrateScroll, { passive: false });
        }

        return () => {
            if (element) {
                element.removeEventListener('wheel', handleCrateScroll);
            }
        };
    }, [showDetail]);

    return (
        <>
            <Head>
                <title>Music Blog - Evan Bowness</title>
            </Head>

            <style jsx global>{`
                .crate-container {
                    position: relative;
                    width: 100%;
                    min-height: 90vh;
                    background: var(--dark-brown);
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    overflow: hidden;
                }

                .floating-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Impact', 'Arial Black', sans-serif;
                    font-size: 15vw;
                    text-transform: uppercase;
                    color: #f5f0e8;
                    opacity: 0.08;
                    letter-spacing: -0.05em;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 0;
                    transition: opacity 0.2s ease-in-out;
                }

                .floating-text.fading-out {
                    opacity: 0;
                }

                .back-btn {
                    color: var(--cream);
                    background: transparent;
                    border: 2px solid var(--burnt-orange);
                    padding: 0.8rem 1.5rem;
                    font-size: 1rem;
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .back-btn:hover {
                    background: var(--burnt-orange);
                }
            `}</style>

            <nav className={layout['nav-bar']} style={{ zIndex: 2900, position: 'sticky', top: 0 }}>
                <div className={layout['nav-left']}>
                    <Link href="/" className={layout['home-link']}>
                        HOME
                    </Link>
                </div>
                <div className={layout['nav-right']}>
                    <Link href="/info">INFO</Link>
                    <Link href="/projects">PROJECTS</Link>
                    <Link href="/blog">BLOG</Link>
                    <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
            </nav>

            <div className="crate-container">
                {!showDetail && (
                    <>
                        <div className={`floating-text ${isFadingOut ? 'fading-out' : ''}`}>{animatedArtistText}</div>

                        <header className={crate['crate-header']} style={{ top: '5rem' }}>
                            <div className={crate.controls}>
                                <div className={crate['control-group']}>
                                    <label>GENRE SELECTOR</label>
                                    <select
                                        value={filterGenre}
                                        onChange={(e) => {
                                            setFilterGenre(e.target.value);
                                            setScrollPos(-ACTIVE_OFFSET);
                                        }}
                                    >
                                        <option value="All">ALL RECORDS</option>
                                        <option value="Shoegaze">SHOEGAZE</option>
                                        <option value="Post-Punk">POST-PUNK</option>
                                        <option value="Electronic">ELECTRONIC</option>
                                        <option value="Hip Hop">HIP HOP</option>
                                        <option value="Trip Hop">TRIP HOP</option>
                                        <option value="Psychedelic">PSYCHEDELIC</option>
                                        <option value="Alt Rock">ALT ROCK</option>
                                        <option value="New Wave">NEW WAVE</option>
                                    </select>
                                </div>
                            </div>
                        </header>
                    </>
                )}

                <div
                    className={crate['crate-display']}
                    ref={interactionZoneRef}
                    style={{
                        position: 'sticky',
                        top: 0,
                        height: '90vh',
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: '0rem'
                    }}
                >
                    {!showDetail && (
                        <div
                            className={crate['crate-scene']}
                            style={{ transform: 'translateY(-120px) rotateX(-10deg)' }}
                        >
                            <div
                                className={crate['crate-structure']}
                                style={{ top: 'auto', bottom: 0, transform: 'translate(-50%, 0)' }}
                            >
                                <div className={`${crate['crate-side']} ${crate.front} ${crate['crate-texture']}`}>
                                    <div className={`${crate['crate-sticker']} ${crate.s1}`}>FRESH FINDS</div>
                                    <div className={`${crate['crate-sticker']} ${crate.s2}`}>STAFF PICK</div>
                                    <div className={crate.barcode}>
                                        <span>CRATE 9</span>
                                        <span style={{ letterSpacing: '3px', display: 'block', marginTop: '2px' }}>
                                            ||| || ||
                                        </span>
                                    </div>
                                </div>
                                <div className={`${crate['crate-side']} ${crate.left} ${crate['crate-texture']}`}></div>
                                <div
                                    className={`${crate['crate-side']} ${crate.right} ${crate['crate-texture']}`}
                                ></div>
                            </div>

                            <div
                                className={crate['album-stack']}
                                style={{ top: 'auto', bottom: 0, transform: 'translate(-50%, 0)' }}
                            >
                                {processedReviews.map((review, i) => {
                                    let dist = i - scrollPos;

                                    while (dist > total / 2) dist -= total;
                                    while (dist < -total / 2) dist += total;

                                    if (dist < -4 || dist > MAX_RENDER_DIST) return null;

                                    let yTrans = 0;
                                    let zTrans = 0;
                                    let rotateX = 0;
                                    let zIndex = 0;
                                    let opacity = 1;
                                    let brightness = 1;

                                    if (dist >= 0) {
                                        const zStart = 300;
                                        const zSpacing = 120;
                                        zTrans = zStart - dist * zSpacing;
                                        yTrans = -60 - dist * 2;
                                        zIndex = 1000 - Math.floor(dist * 10);

                                        if (dist > 12) {
                                            opacity = Math.max(0, 1 - (dist - 12) / 8);
                                            brightness = Math.max(0.4, 1 - (dist - 12) / 8);
                                        }
                                    } else {
                                        const absDist = Math.abs(dist);
                                        zTrans = 300;
                                        yTrans = -60 + absDist * 350;
                                        zIndex = 900;
                                    }

                                    const distFromActive = dist - ACTIVE_OFFSET;
                                    const isActive = Math.abs(distFromActive) < 0.5 && dist >= 0;

                                    if (isActive) {
                                        yTrans -= 80;
                                        zTrans += 20;
                                        rotateX = 0;
                                        brightness = 1.2;
                                        zIndex = 1500;
                                    }

                                    return (
                                        <div
                                            key={`${review.id}-${i}`}
                                            className={crate['album-card-3d']}
                                            style={{
                                                zIndex: zIndex,
                                                opacity: opacity,
                                                filter: `brightness(${brightness})`,
                                                transform: `translate3d(0, ${yTrans}px, ${zTrans}px) rotateX(${rotateX}deg)`,
                                                borderColor: isActive ? '#f4b942' : 'rgba(255,255,255,0.05)',
                                                willChange: 'transform',
                                                visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                                                cursor: 'pointer',
                                                pointerEvents: 'auto',
                                                transition:
                                                    'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isActive) {
                                                    setShowDetail(true);
                                                } else {
                                                    setScrollPos(i - ACTIVE_OFFSET);
                                                }
                                            }}
                                        >
                                            <div className={crate.vinyl_sleeve}>
                                                <img src={review.coverUrl} alt={review.album} loading="lazy" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {showDetail && clickableAlbum && (
                        <div className={player['player-overlay']}>
                            <div className={player['player-view']}>
                                <button className="back-btn" onClick={() => setShowDetail(false)}>
                                    ← BACK TO CRATE
                                </button>
                                <div className={player['player-content']}>
                                    <div className={player['player-visual-container']}>
                                        <div className={player['cover-wrapper']}>
                                            <img
                                                src={clickableAlbum.coverUrl}
                                                alt="Cover"
                                                className={player['player-cover']}
                                            />
                                        </div>
                                        <div className={`${player['vinyl-record']} ${player.spinning}`}>
                                            <div className={player['vinyl-grooves']}></div>
                                            <div className={player['vinyl-label']}></div>
                                        </div>
                                    </div>
                                    <div className="player-info">
                                        <div className={player['info-header']}>
                                            <span className={player['genre-tag']}>{clickableAlbum.genre}</span>
                                            <h2>{clickableAlbum.album}</h2>
                                            <h3>{clickableAlbum.artist}</h3>
                                        </div>
                                        <div className={player['review-body']}>
                                            <p>&quot;{clickableAlbum.reviewText}&quot;</p>
                                        </div>
                                        <div className="score-block">
                                            <div className={player['score-number']}>
                                                {clickableAlbum.score}
                                                <span>/10</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer
                className={layout.footer}
                style={{
                    position: 'relative',
                    zIndex: 2000,
                    marginTop: 0
                }}
            >
                <div className={layout['footer-content']}>
                    <div className={layout['footer-links']}>
                        <Link href="/info">Info</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/blog">Blog</Link>
                        <a href="https://github.com/evanbones" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                    <p className={layout.copyright}>© 2025 Evan Bowness.</p>
                </div>
            </footer>
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
