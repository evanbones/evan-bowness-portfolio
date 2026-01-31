# Evan Bowness - Portfolio Website

A clean, neo-brutalist portfolio built with Next.js, featuring a Spotify API-integrated music review blog.

![Project Status](https://img.shields.io/badge/status-active-success)
![Tech Stack](https://img.shields.io/badge/built%20with-Next.js%20%7C%20React%20%7C%20TypeScript-blue)

## About

The centerpiece of the site is a live-updating, data-driven music blog, powered by the Spotify API. There's also details on me and some of my personal projects.

**[Link to Live Site](https://evanbowness.dev)**

## Tech Stack

**Frontend**

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** CSS Modules

**Deployment**

- **Hosting:** Netlify

## Getting Started

To run this project locally:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/evanbones/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Spotify API Integration

After creating a new Spotify app, create a .env file with the following:

```
SPOTIFY_CLIENT_ID=your client ID
SPOTIFY_CLIENT_SECRET=your Spotify app secret
```

Then, to start a new review, run:

```bash
npm run review "Radiohead" "In Rainbows"
```

This will automatically populate `src/data/reviews.json` with the album's cover art, year, genres, and Spotify link. You can then open the JSON file and simply fill in the `score` and `review_text` fields.

## License

This project is licensed under the [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).
