// src/components/SearchBar.tsx
// SearchBar component that provides a left-aligned search input with an integrated clear button
// and a right-aligned filter button group acting as tabs ("Title", "Artist", "Latest").
// This version uses a semantic <form> and <label> to wrap the input and clear button.

import React from 'react';
import { FilterOption, SearchBarProps } from '../api/types';

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
  return (
    // The container aligns the search form and the filter button group side by side.
    <div className="search-filter-container">
      {/* The search form wraps the input and clear button, using a label for semantic association */}
      <form
        className="search-form"
        onSubmit={(e) => e.preventDefault()} // Prevent default form submission behavior.
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
          {/* The clear button is positioned inside the label so it appears inside the search input.
              It is only rendered when there is text in the input. */}
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
      {/* The filter button group is placed on the right side */}
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
