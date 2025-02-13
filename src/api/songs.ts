// src/api/songs.ts
// This module contains API calls related to top songs from the iTunes RSS feed.
// The function defined below searches for songs by a given search term.

import { baseApi } from "./baseApi";
import { TopSongsResponse } from "./types";

// Base URL for the iTunes top songs RSS feed.
// The endpoint returns a JSON feed containing the top 10 songs.
const ITUNES_TOP_SONGS_URL =
  "https://itunes.apple.com/us/rss/topsongs/limit=10/json";

/**
 * Searches for top songs based on a provided search term.
 *
 * @param term - The search term (song name) used to filter the top songs feed.
 * @returns A Promise that resolves to a TopSongsResponse object containing the feed data.
 *
 * The function constructs the URL by appending the URL-encoded search term to the base URL.
 * It then uses the baseApi function to perform the fetch request, ensuring that the returned data
 * conforms to the TopSongsResponse interface.
 */
export const searchTopSongs = async (term: string): Promise<TopSongsResponse> => {
  // Construct the full URL with the encoded search term.
  const url = `${ITUNES_TOP_SONGS_URL}&term=${encodeURIComponent(term)}`;
  
  // Call baseApi with the constructed URL and return the result.
  return baseApi<TopSongsResponse>(url);
};
