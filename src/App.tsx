// src/App.tsx
// Main App component that fetches album data, manages search filtering,
// and conditionally renders a single-column layout (with a modal on mobile)
// or a two-column layout (on larger viewports) when an album is selected.
import React, { useState, useEffect } from 'react';
import AlbumList from './components/AlbumList';
import SearchBar from './components/SearchBar';
import AlbumDetails from './components/AlbumDetails';
import Modal from './components/Modal';
import { fetchTopAlbums } from './api/albums';
import { ITunesEntry, Album } from './api/types';

// Helper function to map an ITunesEntry to your Album type.
// Selects the largest image available from the "im:image" array.
const mapEntryToAlbum = (entry: ITunesEntry): Album => {
  const images = entry["im:image"];
  const largestImage = images[images.length - 1].label;
  return {
    id: entry.id.attributes["im:id"],
    title: entry["im:name"].label,
    artist: entry["im:artist"].label,
    image: largestImage,
    albumUrl: entry.link.attributes.href,
  };
};

// Custom hook to track window width
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
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // selectedAlbum is null when no album is selected.
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  // Get current window width and determine if we are in mobile view.
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 575;

  useEffect(() => {
    const getAlbums = async () => {
      try {
        // Fetch top albums from the API.
        const data = await fetchTopAlbums();
        // Map the API's feed.entry array to our Album type.
        const mappedAlbums: Album[] = (data.feed.entry as ITunesEntry[]).map(mapEntryToAlbum);
        setAlbums(mappedAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    getAlbums();
  }, []);

  // Filter the albums based on search query (case-insensitive search by title or artist).
  const filteredAlbums = albums.filter(
    album =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        {/* Header contains only the SearchBar (heading removed as per previous refactor) */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
      {isMobile ? (
        // Mobile view: Always single-column layout (album grid)
        <main className="content-container single-column">
          <AlbumList 
            albums={filteredAlbums} 
            itemsPerPage={10} 
            onAlbumClick={setSelectedAlbum} 
          />
          {/* Display album details in a full-screen modal when an album is selected */}
          {selectedAlbum && (
            <Modal onClose={() => setSelectedAlbum(null)}>
              <AlbumDetails album={selectedAlbum} />
            </Modal>
          )}
        </main>
      ) : (
        // Desktop view: If an album is selected, show two columns; else, single column.
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
