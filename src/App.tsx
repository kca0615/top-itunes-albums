// src/App.tsx
// Main App component that fetches album data, manages search and filter state,
// and conditionally renders either a single-column layout (with a modal on mobile)
// or a two-column layout (desktop) when an album is selected.

import React, { useState, useEffect, useMemo } from 'react';
import AlbumList from './components/AlbumList';
import SearchBar from './components/SearchBar';
import AlbumDetails from './components/AlbumDetails';
import Modal from './components/Modal';
import { fetchTopAlbums } from './api/albums';
import { ITunesEntry, Album } from './api/types';

// Define the FilterOption type.
type FilterOption = 'title' | 'artist' | 'latest';

// Helper function that maps an ITunesEntry (from the RSS feed) to our Album type.
// It selects the largest image from the "im:image" array and parses the release date.
const mapEntryToAlbum = (entry: ITunesEntry): Album => {
  const images = entry["im:image"];
  const largestImage = images[images.length - 1].label;
  // Parse release date string to a Date object; if not available, default to Unix epoch.
  const releaseDateStr = entry["im:releaseDate"]?.label || "";
  const releaseDate = releaseDateStr ? new Date(releaseDateStr) : new Date(0);
  return {
    id: entry.id.attributes["im:id"],
    title: entry["im:name"].label,
    artist: entry["im:artist"].label,
    image: largestImage,
    albumUrl: entry.link.attributes.href,
    releaseDate, 
  };
};

// Custom hook to track the current window width for responsive layout decisions.
const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

const App: React.FC = () => {
  // State to store the list of fetched albums.
  const [albums, setAlbums] = useState<Album[]>([]);
  // State to store the user's search query.
  const [searchQuery, setSearchQuery] = useState<string>('');
  // State for the selected filter option: 'title', 'artist', or 'latest'.
  const [filter, setFilter] = useState<FilterOption>('title');
  // State to store the currently selected album (if any).
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  // Get the current window width to decide between mobile and desktop layouts.
  const windowWidth = useWindowWidth();
  // Define mobile view as viewport widths below 480px.
  const isMobile = windowWidth < 480;

  // Fetch album data on initial mount.
  useEffect(() => {
    const getAlbums = async () => {
      try {
        // Fetch the top albums from the iTunes RSS feed.
        const data = await fetchTopAlbums();
        // Map the feed entries (typed as ITunesEntry) to our custom Album type.
        const mappedAlbums: Album[] = (data.feed.entry as ITunesEntry[]).map(mapEntryToAlbum);
        setAlbums(mappedAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    getAlbums();
  }, []);

  // useMemo for efficient filtering: recompute only when albums, searchQuery, or filter changes.
  const filteredAlbums = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // If no search query is provided...
    if (!query) {
      // For 'latest', sort all albums by release date descending.
      if (filter === 'latest') {
        return [...albums].sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
      }
      // Otherwise, return all albums unfiltered.
      return albums;
    }

    // Otherwise, filter based on the selected filter.
    let filtered = albums;
    if (filter === 'title') {
      filtered = albums.filter(album => album.title.toLowerCase().includes(query));
    } else if (filter === 'artist') {
      filtered = albums.filter(album => album.artist.toLowerCase().includes(query));
    } else if (filter === 'latest') {
      // For 'latest', first filter by title or artist,
      // then sort the result by release date descending.
      filtered = albums
        .filter(album =>
          album.title.toLowerCase().includes(query) ||
          album.artist.toLowerCase().includes(query)
        )
        .sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
    }
    return filtered;
  }, [albums, searchQuery, filter]);

  return (
    <div className="app-container">
      <header>
        {/* Pass search, filter, and update callbacks to the SearchBar component */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />
      </header>
      {isMobile ? (
        // Mobile View: Always use single-column layout.
        // If an album is selected, display its details in a full-screen modal.
        <main className="content-container single-column">
          <AlbumList
            albums={filteredAlbums}
            itemsPerPage={10}
            onAlbumClick={setSelectedAlbum}
          />
          {selectedAlbum && (
            <Modal onClose={() => setSelectedAlbum(null)}>
              <AlbumDetails album={selectedAlbum} />
            </Modal>
          )}
        </main>
      ) : (
        // Desktop View:
        // If an album is selected, render a two-column layout.
        // Otherwise, render a single-column layout.
        selectedAlbum ? (
          <main className="content-container two-column">
            <div className="left-column">
              <AlbumList
                albums={filteredAlbums}
                itemsPerPage={10}
                onAlbumClick={setSelectedAlbum}
              />
            </div>
            <div className="right-column">
              <AlbumDetails album={selectedAlbum} />
            </div>
          </main>
        ) : (
          <main className="content-container single-column">
            <AlbumList
              albums={filteredAlbums}
              itemsPerPage={10}
              onAlbumClick={setSelectedAlbum}
            />
          </main>
        )
      )}
      <footer>
        <p>&copy; 2025 Music World. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
