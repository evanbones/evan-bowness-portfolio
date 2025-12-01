# Evan Bowness - Portfolio Website

A retro-futurist portfolio and music blog built with Next.js, featuring a 3D interactive vinyl crate.

![Project Status](https://img.shields.io/badge/status-active-success)
![Tech Stack](https://img.shields.io/badge/built%20with-Next.js%20%7C%20React%20%7C%20TypeScript-blue)

## About The Project

This portfolio is an exploration of web interactivity, combining my background in software engineering with my interest in music production and crate digging.

The centerpiece of the site is a 3D Virtual Crate, a custom-built React interface that simulates the experience of flipping through vinyl records. It serves as the navigation for my music blog, allowing users to scroll, select, and "play" albums to read reviews.

**[Link to Live Site](https://evanbowness.dev)**

## Key Features

- **3D Interactive Crate:** A custom physics-based scroll animation that renders DOM elements in 3D space using CSS transforms (no Canvas/WebGL overhead).
- **Vinyl Player Interface:** detailed "Now Playing" view with spinning vinyl animations and dynamic metadata.
- **Retro/Y2K Aesthetic:** Styled with raw CSS Modules to capture the grit of early 2000s web design and lo-fi culture.
- **Performance Optimized:** Virtualized rendering logic to handle infinite scrolling loops without performance drops.

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

## License

This project is licensed under the [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).
