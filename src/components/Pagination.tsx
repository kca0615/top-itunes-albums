// src/components/Pagination.tsx
// This component renders pagination controls that allow users to navigate
// through pages of items (such as albums). It calculates the total number of pages
// based on the total number of items and items per page, and then renders a button
// for each page along with "Previous" and "Next" buttons.

import React from 'react';

// Define the props expected by the Pagination component.
interface PaginationProps {
  // The number of items that should be displayed on each page.
  itemsPerPage: number;
  // The total number of items (e.g., total albums).
  totalItems: number;
  // The currently active page number.
  currentPage: number;
  // Callback function to update the current page when a button is clicked.
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  // Calculate the total number of pages required.
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // The nav element helps with accessibility by providing an ARIA label.
    <nav className="pagination-container" aria-label="Pagination">
      <ul className="pagination">
        {/* "Previous" button: decrements the current page.
            It is disabled if the current page is the first page. */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>

        {/* Render a button for each page number. The button for the current page
            has an additional "active" class and an aria-current attribute for accessibility. */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
              aria-label={`Page ${number}`}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}

        {/* "Next" button: increments the current page.
            It is disabled if the current page is the last page. */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="pagination-button"
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
