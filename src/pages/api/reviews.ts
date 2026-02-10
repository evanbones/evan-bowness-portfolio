import type { NextApiRequest, NextApiResponse } from 'next';
import reviewsData from '../../data/reviews.json';

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    let { page = '1', limit = '12', search = '', sort = 'latest', scores = '', genres = '' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const selectedScores = scores ? (scores as string).split(',').map(Number) : [];
    const selectedGenres = genres ? (genres as string).split(',').map((g) => g.trim().toLowerCase()) : [];

    let filtered = reviewsData.filter((r: Review) => {
        const matchesSearch =
            search === '' ||
            r.album.toLowerCase().includes((search as string).toLowerCase()) ||
            r.artist.toLowerCase().includes((search as string).toLowerCase()) ||
            r.genres.some((g) => g.toLowerCase().includes((search as string).toLowerCase()));

        const matchesScore = selectedScores.length > 0 ? selectedScores.includes(r.score) : true;

        const matchesGenre =
            selectedGenres.length > 0 ? r.genres.some((g) => selectedGenres.includes(g.toLowerCase())) : true;

        return matchesSearch && matchesScore && matchesGenre;
    });

    filtered.sort((a: Review, b: Review) => {
        if (sort === 'score') return b.score - a.score;
        if (sort === 'oldest') return parseInt(a.year) - parseInt(b.year);
        if (sort === 'year') return parseInt(b.year) - parseInt(a.year);
        return parseInt(b.id) - parseInt(a.id);
    });

    const total = filtered.length;
    const start = (pageNum - 1) * limitNum;
    const paginatedReviews = filtered.slice(start, start + limitNum);

    res.status(200).json({
        reviews: paginatedReviews,
        total,
        hasMore: start + limitNum < total
    });
}
