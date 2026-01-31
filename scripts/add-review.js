require('dotenv').config();
const fs = require('fs');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const args = process.argv.slice(2);
const queryArtist = args[0];
const queryAlbum = args[1];

if (!queryArtist || !queryAlbum) {
    console.error('Usage: node scripts/add-review.js "Artist Name" "Album Name"');
    process.exit(1);
}

async function fetchAndWriteReview() {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);

        console.log(`Searching for "${queryAlbum}" by "${queryArtist}"...`);
        const searchData = await spotifyApi.searchAlbums(`artist:${queryArtist} album:${queryAlbum}`);
        const album = searchData.body.albums.items[0];

        if (!album) {
            console.error('Album not found on Spotify. Check spelling.');
            return;
        }

        const albumDetails = await spotifyApi.getAlbum(album.id);
        const artistDetails = await spotifyApi.getArtist(album.artists[0].id);

        const year = albumDetails.body.release_date.substring(0, 4);
        const genres = artistDetails.body.genres.slice(0, 3).map((g) =>
            g
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')
        );

        const reviewPath = path.join(__dirname, '../src/data/reviews.json');
        const fileContent = fs.readFileSync(reviewPath, 'utf-8');
        const reviews = JSON.parse(fileContent);

        const maxId = reviews.reduce((max, r) => Math.max(max, parseInt(r.id)), 0);
        const newId = (maxId + 1).toString();

        const newReview = {
            id: newId,
            score: 0,
            album: albumDetails.body.name,
            artist: albumDetails.body.artists[0].name,
            genres: genres.length > 0 ? genres : ['Genre TBD'],
            media_links: {
                Spotify: albumDetails.body.external_urls.spotify
            },
            year: year,
            cover_url: albumDetails.body.images[0]?.url || '',
            review_text: 'TODO: Write review here...'
        };

        reviews.unshift(newReview);
        fs.writeFileSync(reviewPath, JSON.stringify(reviews, null, 4));

        console.log(`Success! Added "${newReview.album}" to reviews.json.`);
    } catch (err) {
        console.error('Error:', err);
    }
}

fetchAndWriteReview();
