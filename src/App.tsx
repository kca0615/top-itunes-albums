import React, { useState, useEffect, useMemo } from 'react';
import AlbumList from './components/AlbumList';
import SearchBar from './components/SearchBar';
import AlbumDetails from './components/AlbumDetails';
import Modal from './components/Modal';
import { fetchTopAlbums } from './api/albums';
import { ITunesEntry, Album, FilterOption } from './api/types';
import { Analytics } from '@vercel/analytics/react';

// Helper function to map an ITunesEntry to our Album type.
const mapEntryToAlbum = (entry: ITunesEntry): Album => {
  const images = entry["im:image"];
  const largestImage = images[images.length - 1].label;
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
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<FilterOption>('title');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480;

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const data = await fetchTopAlbums();
        const mappedAlbums: Album[] = (data.feed.entry as ITunesEntry[]).map(mapEntryToAlbum);
        setAlbums(mappedAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    getAlbums();
  }, []);

  // Refactored filtering and sorting logic.
  const filteredAlbums = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    // Start by filtering albums based on the query
    let filtered = albums.filter(album => {
      if (!query) return true;
      return (
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query)
      );
    });

    // Apply sorting after filtering
    switch (filter) {
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return filtered.sort((a, b) => a.artist.localeCompare(b.artist));
      case 'latest':
        return filtered.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
      default:
        return filtered;
    }
  }, [albums, searchQuery, filter]);

  return (
    <div className="app-container">
      <header>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />
      </header>

      {isMobile ? (
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
      ) : selectedAlbum ? (
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
      )}

      <footer>
        <p>&copy; 2025 Music World. All rights reserved.</p>
      </footer>

      <Analytics />
    </div>
  );
};

export default App;
