// src/components/AlbumDetails.tsx
// This component displays detailed information for a selected album.
// It modifies the album image URL to display a larger, high-resolution image (632x632)
// by replacing the dimension substring in the original URL.

import React from 'react';
import { Album } from '../api/types';

// Define the props expected by AlbumDetails.
// - album: The Album object containing details such as title, artist, image URL, etc.
interface AlbumDetailsProps {
  album: Album;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album }) => {
  // Generate a high resolution image URL by replacing the dimension substring in the URL.
  // This assumes the original image URL includes a dimension pattern (e.g., "170x170").
  const highResImage = album.image.replace(/(\d+x\d+)/, '300x300');

  return (
    // The container is designated as a region for accessibility purposes,
    // with an ARIA label that describes the content.
    <div
      className="album-details"
      role="region"
      aria-label={`Details for ${album.title} by ${album.artist}`}
    >
      {/* Display the album title */}
      <h2>{album.title}</h2>
      {/* Display the album artist */}
      <p>
        <strong>Artist:</strong> {album.artist}
      </p>
      {/* Container for the album image */}
      <div className="album-details-image-container">
        {/* Display the high resolution album cover image */}
        <img
          src={highResImage}
          alt={`${album.title} cover`}
          className="album-details-image"
        />
      </div>
      {/* Link to view the album on iTunes, opens in a new tab */}
      <p>
        <a href={album.albumUrl} target="_blank" rel="noopener noreferrer">
          View on iTunes
        </a>
      </p>
    </div>
  );
};

export default AlbumDetails;
