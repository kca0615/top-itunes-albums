// src/components/AlbumDetails.tsx
// This component displays detailed information for a selected album.
// It is used to render album details either in the right column (desktop) or in a full-screen modal (mobile).

import React from 'react';
import { Album } from '../api/types';

// Define the props expected by the AlbumDetails component.
interface AlbumDetailsProps {
  album: Album; // The album object to display details for.
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album }) => {
  return (
    // The container is marked as a "region" for accessibility,
    // with an aria-label that describes its content.
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
      
      {/* Container for the album cover image */}
      <div className="album-details-image-container">
        {/* Album cover image with an alt attribute for accessibility */}
        <img
          src={album.image}
          alt={`${album.title} cover`}
          className="album-details-image"
        />
      </div>
      
      {/* Link to view the album on iTunes.
          Opens in a new tab, with rel="noopener noreferrer" for security. */}
      <p>
        <a href={album.albumUrl} target="_blank" rel="noopener noreferrer">
          View on iTunes
        </a>
      </p>
    </div>
  );
};

export default AlbumDetails;
