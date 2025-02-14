# Top Albums Landing Page

A modern, responsive landing page that fetches and displays the top albums from the iTunes API. Built with **React**, **TypeScript**, and **Vite**, this project demonstrates best practices in front-end development including dynamic data handling, modular component architecture, responsive design, and engaging CSS animations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)


## Overview

This project displays the top 100 albums from the iTunes API. It provides a user-friendly interface with pagination and a search bar to filter albums by title or artist. The design is responsive and optimized for both desktop and mobile devices using the latest CSS techniques such as CSS variables, Flexbox, and CSS Grid. Smooth CSS animations are applied to album cards for an enhanced user experience.

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Features

- **Data Fetching:** Retrieves top album data from the iTunes API.
- **Responsive Design:** Uses a mobile-first approach with CSS Grid and Flexbox.
- **Modular Components:** Organized into reusable components like `AlbumList`, `AlbumCard`, `Pagination`, and `SearchBar`.
- **Decoupled API Services:**  Each API service imports a shared base API function, defines its unique endpoint, and exports a function that fetches and returns typed data, ensuring a clean separation of concerns and maintainability.
- **Type Safety:** Developed using TypeScript with clearly defined interfaces.
- **Pagination:** Displays albums in pages (10 per page) with navigable controls.
- **Inifinite Scrolling:** Loads more albums automatically as the user scrolls.
- **Search Functionality:** Search top 100 albums by name or artist.
- **Filter/Sort Functionality:** Filter and Sort top 100 albums by title, artist, or newest release date.
- **CSS Animations:** Smooth hover effects on album cards.
- **Deployment Ready:** Easily deployable using Vercel.
- **Future Enhancements:** Placeholder API modules (e.g., videos.ts and songs.ts) created for later component development.

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Installation

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/kca0615/top-itunes-albums
    ```

2. **Navigate into the project directory:**

    ```bash
    cd top-itunes-albums
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Usage

1. **Start the development server:**

    ```bash
    npm run dev
    ```
2. **Open your browser:**

    Visit http://localhost:5173 (or the URL provided in your terminal) to view the application.

3. **Build for production:**

    ```bash
    npm run build
    ```

4. **Preview the production build:**

    ```bash
    npm run preview
    ```
<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>

## File Structure

The project is structured as follows:
```graphql
top-itunes-albums/
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── api/
    │   ├── baseApi.ts         // Generic API helper function
    │   ├── albums.ts          // Fetches top albums from iTunes RSS feed
    │   ├── songs.ts           // Fetches top songs (or artist-related data) - future enhancements
    │   ├── videos.ts          // Fetches top videos (or playlists) data - future enchancements
    │   └── types.ts           // Type definitions (ITunesEntry, Album, SearchBarProps, FilterOption, etc.)
    ├── components/
    │   ├── AlbumCard.tsx      // Displays an individual album card
    │   ├── AlbumDetails.tsx   // Displays detailed album information and preview button
    │   ├── AlbumList.tsx      // Renders the album grid with infinite scroll and pagination
    │   ├── Modal.tsx          // Full-screen modal component for mobile album details
    │   ├── Pagination.tsx     // Pagination controls component
    │   └── SearchBar.tsx      // Search input with clear button and filter button group (Title, Artist, Latest)
    └── styles/
        └── index.css          // Global styles, layout, responsive rules, etc.
```

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>

## Technologies Used

  - React: For building the user interface.
  - TypeScript: For static type checking and improved code reliability.
  - Vite: For fast development and build tooling.
  - CSS (Flexbox & Grid): For responsive layouts.
  - Modern CSS Techniques: CSS variables, transitions, and animations.
  - Git: Code versioning.
  - Vercel: For deployment and builds

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Deployment

- The project is configured with Vite and React, making it easy to deploy on Vercel. Vercel offers fast global delivery, automated builds, and scalability, ensuring a high-performance deployment environment.

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Future Enhancements

- Extended API Integration: Although the current implementation focuses on top albums, placeholder API modules (e.g., videos.ts and songs.ts) have been set up to decouple API calls. With additional time, these can be expanded—for example, to create a carousel of featured songs using the songs API.

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>