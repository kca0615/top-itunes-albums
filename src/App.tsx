// src/App.tsx
// Main App component that fetches album data, manages search and filter state,
// and conditionally renders either a single-column layout with the album grid or:
// - a full-screen modal for album details on mobile,
// - a two-column layout on desktop when an album is selected,
// or displays "No results found" when appropriate.

import React, { useState, useEffect, useMemo } from 'react';
import AlbumList from './components/AlbumList';
import SearchBar from './components/SearchBar';
import AlbumDetails from './components/AlbumDetails';
import Modal from './components/Modal';
import { fetchTopAlbums } from './api/albums';
import { ITunesEntry, Album, FilterOption } from './api/types';

// Helper function to map an ITunesEntry to our Album type.
// It selects the largest available image and parses the release date into a Date object.
const mapEntryToAlbum = (entry: ITunesEntry): Album => {
  const images = entry["im:image"];
  const largestImage = images[images.length - 1].label;
  // Parse the release date; default to Unix epoch if not available.
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

// Custom hook to track window width for responsive layout decisions.
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
  // State to store all fetched albums.
  const [albums, setAlbums] = useState<Album[]>([]);
  // State for the search query.
  const [searchQuery, setSearchQuery] = useState<string>('');
  // State for the selected filter option: 'title', 'artist', or 'latest'.
  const [filter, setFilter] = useState<FilterOption>('title');
  // State for the currently selected album (if any).
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  // Get the current window width to determine mobile vs. desktop view.
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480;

  // Fetch album data on initial mount.
  useEffect(() => {
    const getAlbums = async () => {
      try {
        // Fetch top albums from the iTunes RSS feed.
        const data = await fetchTopAlbums();
        // Map the feed entries (typed as ITunesEntry) to Album type.
        const mappedAlbums: Album[] = (data.feed.entry as ITunesEntry[]).map(mapEntryToAlbum);
        setAlbums(mappedAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    getAlbums();
  }, []);

  // useMemo to efficiently compute filteredAlbums.
  // The filtering logic applies based on the selected filter:
  // - 'title': filter by album title and sort alphabetically.
  // - 'artist': filter by artist name and sort alphabetically.
  // - 'latest': if no search query, sort all albums by release date (newest first);
  //   otherwise, filter by title or artist and then sort by release date descending.
  const filteredAlbums = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let filtered = albums;

    if (query) {
      if (filter === 'title') {
        filtered = albums.filter(album => album.title.toLowerCase().includes(query));
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter === 'artist') {
        filtered = albums.filter(album => album.artist.toLowerCase().includes(query));
        filtered = [...filtered].sort((a, b) => a.artist.localeCompare(b.artist));
      } else if (filter === 'latest') {
        filtered = albums
          .filter(album =>
            album.title.toLowerCase().includes(query) ||
            album.artist.toLowerCase().includes(query)
          )
          .sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
      }
    } else {
      if (filter === 'title') {
        filtered = [...albums].sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter === 'artist') {
        filtered = [...albums].sort((a, b) => a.artist.localeCompare(b.artist));
      } else if (filter === 'latest') {
        filtered = [...albums].sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
      }
    }
    return filtered;
  }, [albums, searchQuery, filter]);

  return (
    <div className="app-container">
      <header>
        {/* Pass search query, filter state, and corresponding setters to SearchBar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />
      </header>
      {isMobile ? (
        // Mobile View: Always display a single-column layout.
        // If an album is selected, display album details in a full-screen modal.
        <main className="content-container single-column">
          {filteredAlbums.length > 0 ? (
            <AlbumList
              albums={filteredAlbums}
              itemsPerPage={10}
              onAlbumClick={setSelectedAlbum}
            />
          ) : (
            <p className="no-results">No results found.</p>
          )}
          {selectedAlbum && (
            <Modal onClose={() => setSelectedAlbum(null)}>
              <AlbumDetails album={selectedAlbum} />
            </Modal>
          )}
        </main>
      ) : (
        // Desktop View:
        // If an album is selected, show a two-column layout (album grid on left, details on right);
        // otherwise, display the album grid in a single-column layout.
        selectedAlbum ? (
          <main className="content-container two-column">
            <div className="album-grid-container">
              {filteredAlbums.length > 0 ? (
                <AlbumList
                  albums={filteredAlbums}
                  itemsPerPage={10}
                  onAlbumClick={setSelectedAlbum}
                />
              ) : (
                <p className="no-results">No results found.</p>
              )}
            </div>
            <div className="album-detail-container">
              <AlbumDetails album={selectedAlbum} />
            </div>
          </main>
        ) : (
          <main className="content-container single-column">
            {filteredAlbums.length > 0 ? (
              <AlbumList
                albums={filteredAlbums}
                itemsPerPage={10}
                onAlbumClick={setSelectedAlbum}
              />
            ) : (
              <p className="no-results">No results found.</p>
            )}
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
