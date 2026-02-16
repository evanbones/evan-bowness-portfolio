import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import styles from '../css/Carousel.module.css';

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const next = useCallback(() => setCurrentIndex((i) => (i + 1) % images.length), [images.length]);
    const prev = useCallback(() => setCurrentIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

    useEffect(() => {
        if (!isFullscreen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isFullscreen, next, prev]);

    if (!images || images.length === 0) return null;

    const renderControls = () => {
        if (images.length <= 1) return null;
        return (
            <>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        prev();
                    }}
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    aria-label="Previous image"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        next();
                    }}
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    aria-label="Next image"
                >
                    <ChevronRight size={20} />
                </button>
                <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                        />
                    ))}
                </div>
            </>
        );
    };

    return (
        <>
            <div className={styles.carouselContainer} onClick={() => setIsFullscreen(true)}>
                <img src={images[currentIndex]} alt={`Project showcase ${currentIndex + 1}`} className={styles.image} />
                {renderControls()}
            </div>

            {isFullscreen && (
                <div className={styles.fullscreenOverlay} onClick={() => setIsFullscreen(false)}>
                    <button className={styles.closeBtn} onClick={() => setIsFullscreen(false)}>
                        <X size={24} />
                    </button>
                    <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[currentIndex]}
                            alt={`Project showcase ${currentIndex + 1} fullscreen`}
                            className={styles.fullscreenImage}
                        />
                        {renderControls()}
                    </div>
                </div>
            )}
        </>
    );
}
