// src/components/AlbumCard.tsx
// This component displays an individual album card, which shows the album cover, title, and artist.
// The card is interactive: it responds to click events and keyboard events (Enter/Space) for accessibility.

import React from 'react';
import { Album } from '../api/types';

// Define the props expected by the AlbumCard component.
interface AlbumCardProps {
  album: Album;         // The album data to display.
  onClick: () => void;  // Callback function to invoke when the album card is clicked.
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  // Generate higher-resolution image URLs by replacing the dimensions in the URL.
  // This assumes that the original URL contains a dimension substring like "170x170" that can be replaced.
  const image2x = album.image.replace(/(\d+x\d+)/, '200x200');
  const image3x = album.image.replace(/(\d+x\d+)/, '316x316');

  // Handle keyboard accessibility:
  // When the card is focused, pressing Enter or Space will trigger the onClick callback.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    // The outer div acts as a button for accessibility.
    // It has role="button", is focusable (tabIndex=0), and listens for both click and keydown events.
    <div
      className="album-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
      // The aria-label provides a clear, descriptive label for screen readers.
      aria-label={`View details for ${album.title} by ${album.artist}`}
    >
      {/* Album image container */}
      <div className="album-image-container">
        {/* The album cover image is provided with srcSet for higher resolution on devices with higher DPI.
            The alt attribute is set to describe the image for accessibility. */}
        <img
          src={album.image}
          srcSet={`${album.image} 1x, ${image2x} 2x, ${image3x} 3x`}
          alt={`${album.title} cover`}
          className="album-image"
          loading="lazy" // Lazy loading improves performance by delaying off-screen image loading.
        />
      </div>
      {/* Album info container */}
      <div className="album-info">
        {/* Display the album title */}
        <h3 className="album-title">{album.title}</h3>
        {/* Display the album artist */}
        <p className="album-artist">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
