// src/components/SearchBar.tsx
// SearchBar component that provides a left-aligned search input and a right-aligned filter button group.

import React, { useState } from 'react';

// Define the props expected by SearchBar.
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

type FilterOption = 'title' | 'artist' | 'latest';

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  // Local state to keep track of the selected filter.
  const [filter, setFilter] = useState<FilterOption>('title');

  // Handler function to update the filter state.
  // You could also pass this value up to a parent if needed.
  const handleFilterChange = (newFilter: FilterOption) => {
    setFilter(newFilter);
    // TODO: Optionally notify parent component about the filter change.
  };

  return (
    // Container using flexbox to align the search input to the left and filters to the right.
    <div
      className="search-bar-container"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
      }}
    >
      {/* Left: Search input */}
      <input
        type="text"
        placeholder="Enter artist or album"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        aria-label="Enter artist or album"
        style={{ flex: 1, marginRight: '1rem' }}



      />
      
      {/* Right: Filter button group */}
      <div
        className="filter-button-group"
        style={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <button
          onClick={() => handleFilterChange('title')}
          className={`filter-button ${filter === 'title' ? 'active' : ''}`}
          aria-label="Title"
        >
          Title
        </button>
        <button
          onClick={() => handleFilterChange('artist')}
          className={`filter-button ${filter === 'artist' ? 'active' : ''}`}
          aria-label="Artist"
        >
          Artist
        </button>
        <button
          onClick={() => handleFilterChange('latest')}
          className={`filter-button ${filter === 'latest' ? 'active' : ''}`}
          aria-label="Latest"
        >
          Latest
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
