import Footer from '@/components/Footer';
import fs from 'fs/promises';
import Head from 'next/head';
import path from 'path';
import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import crate from '../css/Crate.module.css';
import player from '../css/Player.module.css';

const ACTIVE_OFFSET = 2;
const MAX_RENDER_DIST = 30;
const SCROLL_SENSITIVITY = 0.0025;
const EASING = 0.08;

const lerp = (start, end, factor) => start + (end - start) * factor;

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
    const targetScrollPos = useRef(-ACTIVE_OFFSET);

    const rafRef = useRef(null);

    const [showDetail, setShowDetail] = useState(false);
    const [filterGenre, setFilterGenre] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    const interactionZoneRef = useRef(null);

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
        const animate = () => {
            setScrollPos((currentPos) => {
                const diff = targetScrollPos.current - currentPos;

                if (Math.abs(diff) < 0.001) {
                    return currentPos;
                }

                return lerp(currentPos, targetScrollPos.current, EASING);
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const handleCrateScroll = (e) => {
            if (showDetail) return;

            if (!interactionZoneRef.current?.contains(e.target)) {
                return;
            }

            e.preventDefault();

            targetScrollPos.current += e.deltaY * SCROLL_SENSITIVITY;
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

    const handleAlbumClick = (i, isActive, e) => {
        e.stopPropagation();
        if (isActive) {
            setShowDetail(true);
        } else {
            targetScrollPos.current = i - ACTIVE_OFFSET;
        }
    };

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

            <Header style={{ zIndex: 2900, position: 'sticky', top: 0 }} />

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
                                            targetScrollPos.current = -ACTIVE_OFFSET;
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

                                    const distFromActive = Math.abs(dist - ACTIVE_OFFSET);

                                    let activeFactor = 0;
                                    if (distFromActive < 1) {
                                        activeFactor = 1 - distFromActive;
                                        activeFactor = activeFactor * activeFactor * (3 - 2 * activeFactor);
                                    }

                                    yTrans -= 80 * activeFactor;
                                    zTrans += 20 * activeFactor;
                                    brightness += 0.2 * activeFactor;
                                    zIndex += Math.round(activeFactor * 500);

                                    const isClickable = distFromActive < 0.1;

                                    return (
                                        <div
                                            key={`${review.id}-${i}`}
                                            className={crate['album-card-3d']}
                                            style={{
                                                zIndex: zIndex,
                                                opacity: opacity,
                                                filter: `brightness(${brightness})`,
                                                transform: `translate3d(0, ${yTrans}px, ${zTrans}px)`,
                                                borderColor: activeFactor > 0.8 ? '#f4b942' : 'rgba(255,255,255,0.05)',
                                                willChange: 'transform',
                                                visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                                                cursor: 'pointer',
                                                pointerEvents: 'auto',
                                                transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                                            }}
                                            onClick={(e) => handleAlbumClick(i, isClickable, e)}
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
                                            <span className={player['tag']}>{clickableAlbum.genre}</span>
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

            <Footer
                style={{
                    position: 'relative',
                    zIndex: 2000,
                    marginTop: 0
                }}
            />
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
