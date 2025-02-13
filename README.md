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


## Overview

This project displays the top 100 albums from the iTunes API. It provides a user-friendly interface with pagination and a search bar to filter albums by title or artist. The design is responsive and optimized for both desktop and mobile devices using the latest CSS techniques such as CSS variables, Flexbox, and CSS Grid. Smooth CSS animations are applied to album cards for an enhanced user experience.

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Features

- **Data Fetching:** Retrieves top album data from the iTunes API.
- **Responsive Design:** Uses a mobile-first approach with CSS Grid and Flexbox.
- **Modular Components:** Organized into reusable components like `AlbumList`, `AlbumCard`, `Pagination`, and `SearchBar`.
- **Type Safety:** Developed using TypeScript with clearly defined interfaces.
- **Pagination:** Displays albums in pages (10 per page) with navigable controls.
- **Search Functionality:** Filter albums by name or artist.
- **CSS Animations:** Smooth hover effects on album cards.
- **Deployment Ready:** Easily deployable using Vercel.

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>


## Installation

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/top-itunes-albums.git
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

    top-albums-landing-page/
    ├── index.html               # The main HTML file
    ├── package.json             # Project dependencies and scripts
    ├── tsconfig.json            # TypeScript configuration
    ├── vite.config.ts           # Vite configuration file
    └── src/
        ├── main.tsx             # Entry point for React
        ├── App.tsx              # Main App component for data fetching and state management
        ├── components/          # Reusable React components
        │   ├── AlbumCard.tsx    # Displays individual album details
        │   ├── AlbumList.tsx    # Handles the album grid and pagination
        │   ├── Pagination.tsx   # Renders pagination controls
        │   └── SearchBar.tsx    # Search bar for filtering albums
        └── styles/
            └── index.css        # Global CSS styles using modern CSS techniques

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

- Used Vercel

<div style="width:100%;display:inline-block;text-align:right;"><a href="#table-of-contents">[top]</a></div>