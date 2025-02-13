// src/components/AlbumList.tsx
// This component displays a list of albums in a scrollable grid with infinite scroll and manual pagination.
// When a user clicks a pagination button, the album grid scrolls to the top so that the new page's content is visible.

import React, { useState, useRef, useEffect } from 'react';
import AlbumCard from './AlbumCard';
import Pagination from './Pagination';
import { Album } from '../api/types';

// Define the props expected by AlbumList:
// - albums: the complete array of Album objects.
// - itemsPerPage: the number of albums to show per "page" or batch.
// - onAlbumClick: a callback function invoked when an album is clicked.
interface AlbumListProps {
  albums: Album[];
  itemsPerPage: number;
  onAlbumClick: (album: Album) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, itemsPerPage, onAlbumClick }) => {
  // currentPage tracks the number of pages (or batches) currently loaded.
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // sentinelRef is used to reference a tiny element at the bottom of the album grid.
  // When this element enters the viewport, infinite scrolling is triggered.
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  // containerRef references the scrollable container for the album grid.
  // This is used to control the scroll position when the user uses manual pagination.
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the subset of albums to display: all albums from index 0 up to (currentPage * itemsPerPage).
  const displayedAlbums = albums.slice(0, currentPage * itemsPerPage);

  // paginate is called when a user clicks a manual pagination button.
  // It updates the currentPage state and scrolls the album grid container to the top.
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // useEffect sets up an IntersectionObserver to implement infinite scrolling.
  // When the sentinel element at the bottom of the album grid becomes visible,
  // and if there are more albums to load, currentPage is incremented automatically.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the sentinel element is intersecting and if more albums exist.
        if (entries[0].isIntersecting && currentPage * itemsPerPage < albums.length) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: '200px', // Start loading earlier (200px before the sentinel is in view)
        threshold: 0.1,       // Trigger when 10% of the sentinel is visible
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Cleanup the observer when the component unmounts or dependencies change.
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [currentPage, itemsPerPage, albums.length]);

  return (
    // album-list-wrapper: A container that holds both the scrollable album grid and the pagination controls.
    <div className="album-list-wrapper">
      {/* album-list-container: This is the scrollable area that displays the album grid.
          The containerRef is attached here so that we can programmatically control its scroll position. */}
      <div className="album-list-container" ref={containerRef}>
        <div className="album-grid">
          {/* Map through the displayed albums and render an AlbumCard for each one.
              The onClick callback is passed to each AlbumCard to handle selection. */}
          {displayedAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} onClick={() => onAlbumClick(album)} />
          ))}
          {/* Sentinel element: A tiny element used to trigger infinite scrolling when it becomes visible. */}
          <div ref={sentinelRef} style={{ height: '1px' }} />
        </div>
      </div>
      {/* Pagination-wrapper: Contains manual pagination controls that are rendered outside of the scrollable container.
          This ensures that when a user clicks a pagination button, the scroll position is adjusted accordingly. */}
      <div className="pagination-wrapper">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={albums.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default AlbumList;
