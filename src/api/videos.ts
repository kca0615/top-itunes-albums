// src/api/playlists.ts
// This module defines API calls related to top videos from the iTunes RSS feed.

import { baseApi } from "./baseApi";
import { TopVideoResponse } from "./types";

// Base URL for the iTunes top music videos RSS feed.
// This endpoint returns a JSON feed containing the top 100 music videos.
const ITUNES_TOP_VIDEOS_URL = "https://itunes.apple.com/us/rss/topmusicvideos/limit=100/json";

/**
 * Searches for top videos based on a provided search term.
 *
 * @param term - The search term (video name) used to filter the top videos feed.
 * @returns A Promise that resolves to a TopVideoResponse containing the feed data.
 *
 * The function appends the search term as a query parameter to the base URL,
 * then uses the baseApi function to make a GET request. The response is typed
 * as TopVideoResponse to ensure that the structure of the returned data matches
 * our expectations.
 */
export const searchTopVideos = async (term: string): Promise<TopVideoResponse> => {
  // Construct the full URL by appending the encoded search term.
  const url = `${ITUNES_TOP_VIDEOS_URL}&term=${encodeURIComponent(term)}`;
  // Use baseApi to perform the fetch and return the response as a TopVideoResponse.
  return baseApi<TopVideoResponse>(url);
};
