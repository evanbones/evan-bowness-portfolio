import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import crate from '/src/css/Crate.module.css';
import layout from '/src/css/Layout.module.css';
import player from '/src/css/Player.module.css';

const MOCK_REVIEWS = [
  { id: '1', artist: 'Slowdive', album: 'Souvlaki', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/Slowdive_-_Souvlaki.jpg', score: 9.5, genre: 'Shoegaze', reviewText: "A defining moment in the genre.", date: '2024-11-01' },
  { id: '2', artist: 'Fat White Family', album: 'Serfs Up!', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Fat_White_Family_-_Serfs_Up%21.png', score: 8.0, genre: 'Post-Punk', reviewText: "Gritty, groovy, and unapologetically weird.", date: '2024-10-15' },
  { id: '3', artist: 'Tame Impala', album: 'Currents', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png', score: 9.0, genre: 'Psychedelic', reviewText: "Parker abandons the guitars for synths.", date: '2024-09-20' },
  { id: '4', artist: 'MF DOOM', album: 'Mm.. Food', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Mmfood.jpg', score: 10, genre: 'Hip Hop', reviewText: "Rhymes as dense as a fruit cake.", date: '2024-08-05' },
  { id: '5', artist: 'Radiohead', album: 'In Rainbows', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg', score: 10, genre: 'Alt Rock', reviewText: "Warm, intimate, and intricate.", date: '2024-07-22' },
  { id: '6', artist: 'Daft Punk', album: 'Discovery', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.png', score: 10, genre: 'Electronic', reviewText: "Pure french touch perfection.", date: '2001-03-12' },
  { id: '7', artist: 'Talking Heads', album: 'Remain in Light', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/2/26/Talking_Heads_-_Remain_in_Light.jpg', score: 10, genre: 'New Wave', reviewText: "Brian Eno production.", date: '1980-10-08' },
  { id: '8', artist: 'Portishead', album: 'Dummy', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Portishead_-_Dummy.png', score: 9.2, genre: 'Trip Hop', reviewText: "Haunting, cinematic.", date: '1994-08-22' },
  { id: '9', artist: 'Massive Attack', album: 'Mezzanine', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Massive_Attack_-_Mezzanine.png', score: 9.8, genre: 'Trip Hop', reviewText: "Dark, brooding, and bass-heavy.", date: '1998-04-20' },
  { id: '10', artist: 'Aphex Twin', album: 'Selected Ambient Works 85-92', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/8/82/Selected_Ambient_Works_85-92.png', score: 9.5, genre: 'Electronic', reviewText: "A milestone in ambient techno.", date: '1992-11-09' },
  { id: '11', artist: 'My Bloody Valentine', album: 'Loveless', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png', score: 10, genre: 'Shoegaze', reviewText: "Pink noise perfection.", date: '1991-11-04' },
  { id: '12', artist: 'Bjork', album: 'Post', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Bjork_Post.png', score: 9.0, genre: 'Electronic', reviewText: "Eclectic and electric.", date: '1995-06-13' },
];

export default function Blog() {
  const [scrollPos, setScrollPos] = useState(0); 
  const [showDetail, setShowDetail] = useState(false);
  const [filterGenre, setFilterGenre] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const crateRef = useRef<HTMLDivElement>(null);

  const processedReviews = useMemo(() => {
    let data = [...MOCK_REVIEWS];
    if (filterGenre !== 'All') data = data.filter(r => r.genre === filterGenre);
    data.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return data;
  }, [filterGenre, sortBy]);

  const total = processedReviews.length;

  const handleScroll = (e: WheelEvent) => {
    if (showDetail) return;
    e.preventDefault(); 
    setScrollPos((prev) => {
      let next = prev + (e.deltaY * 0.002); 
      if (next < 0) next += total;
      return next;
    });
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [showDetail, total]);

  const activeIndex = Math.round(scrollPos) % total;
  const currentAlbum = processedReviews[activeIndex];

  return (
    <>
      <Head><title>Crate Digging - Evan Bowness</title></Head>

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

      <div className="crate-container">
        
        {!showDetail && (
          <>
            <div className="floating-text-container">
               <h1 className="floating-text left">{currentAlbum?.artist}</h1>
               <h1 className="floating-text right">{currentAlbum?.album}</h1>
            </div>

            <header className={crate['crate-header']}>
              <div className={crate.controls}>
                <div className={crate['control-group']}>
                  <label>GENRE SELECTOR</label>
                  <select value={filterGenre} onChange={(e) => {setFilterGenre(e.target.value); setScrollPos(0);}}>
                    <option value="All">ALL RECORDS</option>
                    <option value="Shoegaze">SHOEGAZE</option>
                    <option value="Post-Punk">POST-PUNK</option>
                    <option value="Electronic">ELECTRONIC</option>
                    <option value="Hip Hop">HIP HOP</option>
                  </select>
                </div>
              </div>
            </header>
          </>
        )}

        <div className={crate['crate-display']} ref={crateRef}>
          
          {!showDetail && (
            <div className={crate['crate-scene']}>
               {/* 3D Box Structure */}
               <div className={crate['crate-structure']}>
                  <div className={`${crate['crate-side']} ${crate.front}`}>
                     <div className={crate['crate-texture']}></div>
                     <div className={`${crate['crate-sticker']} ${crate.s1}`}>FRESH FINDS</div>
                     <div className={`${crate['crate-sticker']} ${crate.s2}`}>STAFF PICK</div>
                     <div className={crate.barcode}>12039-123</div>
                  </div>
                  <div className={`${crate['crate-side']} ${crate.back}`}></div>
                  <div className={`${crate['crate-side']} ${crate.left}`}></div>
                  <div className={`${crate['crate-side']} ${crate.right}`}></div>
                  <div className={`${crate['crate-side']} ${crate.bottom}`}></div>
               </div>

               {/* Album Cards */}
               <div className={crate['album-stack']}>
                 {processedReviews.map((review, i) => {
                   let dist = i - (scrollPos % total);
                   if (dist > total / 2) dist -= total;
                   if (dist < -total / 2) dist += total;

                   if (dist < -3 || dist > 15) return null;

                   const zIndex = 500 - Math.round(dist * 10);
                   
                   let yTrans = 0; 
                   let rotateX = -5;
                   let zTrans = 0;

                   if (dist > 1.5) {
                      zTrans = (dist - 1.5) * -60; 
                      yTrans = 120; 
                   } else {
                      zTrans = (dist - 1.5) * -60;
                      yTrans = 120;
                   }

                   const liftCurve = Math.exp(-Math.pow(dist - 1.5, 2) * 3);
                   yTrans -= (liftCurve * 160);

                   if (dist < 1.0) {
                      const fallProgress = (1.0 - dist); 
                      yTrans += (fallProgress * 300); 
                      rotateX -= (fallProgress * 80); 
                      zTrans += (fallProgress * 150); 
                   }

                   const isActive = Math.abs(dist - 1.5) < 0.3;
                   const brightness = Math.max(0.2, 1 - ((dist - 1.5) * 0.15));

                   return (
                     <div 
                       key={review.id}
                       className={crate['album-card-3d']}
                       style={{
                         zIndex: zIndex,
                         transform: `translateY(${yTrans}px) translateZ(${zTrans}px) rotateX(${rotateX}deg)`,
                         filter: isActive ? 'brightness(1.2)' : `brightness(${brightness})`,
                         borderColor: isActive ? '#fff' : 'rgba(255,255,255,0.1)',
                         cursor: isActive ? 'pointer' : 'default'
                       }}
                       onClick={() => {
                          if (isActive) setShowDetail(true);
                       }}
                     >
                       <img src={review.coverUrl} alt={review.album} loading="lazy" />
                     </div>
                   );
                 })}
               </div>
            </div>
          )}

          {/* Player Overlay */}
          {showDetail && currentAlbum && (
            <div className={player['player-overlay']}>
              <div className={player['player-view']}>
                <button className="back-btn" onClick={() => setShowDetail(false)} style={{
                  color: 'var(--cream)', background: 'transparent', border: 'none', 
                  fontSize: '1.2rem', marginBottom: '1rem', cursor: 'pointer', fontFamily: 'monospace'
                }}>← BACK TO CRATE</button>
                <div className={player['player-content']}>
                  <div className={player['player-visual-container']}>
                      <div className={player['cover-wrapper']}>
                         <img src={currentAlbum.coverUrl} alt="Cover" className={player['player-cover']} />
                      </div>
                      <div className={`${player['vinyl-record']} ${player.spinning}`}>
                          <div className={player['vinyl-grooves']}></div>
                          <div className={player['vinyl-label']}></div>
                      </div>
                  </div>
                  <div className="player-info">
                    <div className={player['info-header']}>
                      <span className={player['genre-tag']}>{currentAlbum.genre}</span>
                      <h2>{currentAlbum.album}</h2>
                      <h3>{currentAlbum.artist}</h3>
                    </div>
                    <div className={player['review-body']}><p>"{currentAlbum.reviewText}"</p></div>
                    <div className="score-block"><div className={player['score-number']}>{currentAlbum.score}<span>/10</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}