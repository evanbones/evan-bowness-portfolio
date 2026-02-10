require('dotenv').config();
const fs = require('fs');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');

const CSV_FILENAME = 'rym_import.csv';
const REVIEWS_PATH = path.join(__dirname, '../src/data/reviews.json');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

function parseCSVLine(text) {
    const pattern = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
    const matches = text.match(pattern);
    if (!matches) return [];
    return matches.map((val) => val.replace(/^"|"$/g, ''));
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function importRym() {
    try {
        const csvPath = path.join(process.cwd(), CSV_FILENAME);
        if (!fs.existsSync(csvPath)) {
            console.error(`Error: Could not find '${CSV_FILENAME}' in project root.`);
            process.exit(1);
        }

        console.log(`Reading ${CSV_FILENAME}...`);
        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        const lines = csvContent.split('\n').filter((line) => line.trim() !== '');

        if (lines[0].includes('RYM Album')) lines.shift();

        console.log('Authenticating with Spotify...');
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);

        let reviews = [];
        try {
            if (fs.existsSync(REVIEWS_PATH)) {
                const fileContent = fs.readFileSync(REVIEWS_PATH, 'utf-8');
                reviews = JSON.parse(fileContent);
            }
        } catch (e) {
            console.warn('Could not read existing reviews, starting fresh.');
        }

        let currentMaxId = reviews.reduce((max, r) => Math.max(max, parseInt(r.id) || 0), 0);
        let addedCount = 0;
        let skippedCount = 0;

        console.log(`Found ${lines.length} items to process...`);

        for (const line of lines) {
            const cols = parseCSVLine(line);

            const artistName = cols[2];
            const albumTitle = cols[5];
            const rating = cols[7];

            if (!artistName || !albumTitle) continue;

            const exists = reviews.some(
                (r) =>
                    r.album.toLowerCase() === albumTitle.toLowerCase() &&
                    r.artist.toLowerCase() === artistName.toLowerCase()
            );

            if (exists) {
                console.log(`Skipping (Duplicate): ${albumTitle}`);
                skippedCount++;
                continue;
            }

            console.log(`Fetching: ${albumTitle} by ${artistName}...`);

            try {
                const searchData = await spotifyApi.searchAlbums(`artist:${artistName} album:${albumTitle}`);
                const album = searchData.body.albums.items[0];

                if (!album) {
                    console.log(`   > Not found on Spotify. Skipping.`);
                    continue;
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

                currentMaxId++;
                const newId = currentMaxId.toString();

                const newReview = {
                    id: newId,
                    score: parseInt(rating) || 0,
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
                addedCount++;

                await delay(200);
            } catch (err) {
                console.error(`   > Error fetching data for ${albumTitle}: ${err.message}`);
            }
        }

        fs.writeFileSync(REVIEWS_PATH, JSON.stringify(reviews, null, 4));
        console.log('\n------------------------------------------------');
        console.log(`Done! Added: ${addedCount}, Skipped: ${skippedCount}`);
        console.log(`Updated ${REVIEWS_PATH}`);
    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

importRym();
