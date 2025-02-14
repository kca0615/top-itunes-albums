// src/components/AlbumDetails.tsx
// This component displays detailed information for a selected album.
// It shows a larger album image (316x316), the album title, artist,
// and includes a "Preview" button that opens the album's iTunes page.
// (The RSS feed does not include a short bio; to display one, you would need additional data.)
import React from 'react';
import { Album } from '../api/types';

interface AlbumDetailsProps {
  album: Album;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album }) => {
  // Generate a high resolution image URL by replacing the dimension substring with '300x300'.
  const highResImage = album.image.replace(/(\d+x\d+)/, '316x316');

  // Handle button click to open the album URL (preview)
  const handlePreviewClick = () => {
    window.open(album.albumUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="album-details"
      role="region"
      aria-label={`Details for ${album.title} by ${album.artist}`}
    >
      {/* Display album title */}
      <h2>{album.title}</h2>
      {/* Display artist name */}

      {/* Album cover image (high resolution) */}
      <div className="album-details-image-container">
        <img
          src={highResImage}
          alt={`${album.title} cover`}
          className="album-details-image"
        />
      </div>
      <h4>
        <strong>Artist:</strong> {album.artist}
      </h4>
      {/* "Preview" button that opens the album URL */}
      <button 
        
        onClick={handlePreviewClick}
        className="preview-button"
        aria-label="Preview album on iTunes"
      >
        Preview on iTunes
      </button>
    </div>
  );
};

export default AlbumDetails;
