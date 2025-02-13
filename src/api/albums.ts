// src/api/albums.ts
// This module defines API calls related to albums from the iTunes RSS feed.
// In this file, we fetch the top albums and return the data typed as an ITunesResponse.

import { baseApi } from "./baseApi"; // Import the base API helper function.
import { ITunesResponse } from "./types"; // Import the interface that defines the structure of the API response.

// Base URL for the top albums RSS feed from iTunes.
// This URL returns a JSON feed containing the top 100 albums.
const ITUNES_TOP_ALBUMS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

/**
 * fetchTopAlbums
 *
 * Fetches the top albums from the iTunes RSS feed and returns the response typed
 * as an ITunesResponse.
 *
 * @returns {Promise<ITunesResponse>} - A promise that resolves to an object conforming to the ITunesResponse interface.
 *
 * The function uses the baseApi helper function to perform the HTTP GET request to the iTunes
 * endpoint. By specifying ITunesResponse as the generic type, we ensure that the returned data
 * matches our expected structure.
 */
export const fetchTopAlbums = async (): Promise<ITunesResponse> => {
  // Call the baseApi function with the ITUNES_TOP_ALBUMS_URL and return the result.
  return baseApi<ITunesResponse>(ITUNES_TOP_ALBUMS_URL);
};
