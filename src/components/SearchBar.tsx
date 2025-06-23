// src/components/SearchBar.tsx
// SearchBar component that displays a search input (with an integrated clear button),
// an H2 title ("Top Albums"), and a filter button group ("Title", "Artist", "Latest").
// On desktop, these elements are arranged horizontally; on mobile, they stack vertically.

import React from 'react';
import { FilterOption, SearchBarProps } from '../api/types';

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
  return (
    <div className="search-filter-container">
      {/* Search form container */}
      <div className="search-form-wrapper">
        <form
          className="search-form"
          onSubmit={(e) => e.preventDefault()} // Prevent form submission
        >
          <label className="search-input-label">
            <input
              type="text"
              placeholder="Enter artist or album"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Enter artist or album"
            />
            {/* Clear button inside the input field, shown only when text exists */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="clear-button"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </label>
        </form>
      </div>

      {/* H2 Title */}
      <h2 className="search-header-title">Top Albums!!</h2>

      {/* Filter button group */}
      <div className="filter-button-group">
        <button
          onClick={() => setFilter('title')}
          className={`filter-button ${filter === 'title' ? 'active' : ''}`}
          aria-label="Filter by Title"
        >
          Title
        </button>
        <button
          onClick={() => setFilter('artist')}
          className={`filter-button ${filter === 'artist' ? 'active' : ''}`}
          aria-label="Filter by Artist"
        >
          Artist
        </button>
        <button
          onClick={() => setFilter('latest')}
          className={`filter-button ${filter === 'latest' ? 'active' : ''}`}
          aria-label="Filter by Latest"
        >
          Latest
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
