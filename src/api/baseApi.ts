// src/api/baseApi.ts

/**
 * Base API helper function.
 *
 * This generic function wraps the native fetch API call with basic error handling.
 * It accepts a URL and an optional configuration object (options) for the request,
 * then returns a Promise that resolves to a JSON object of type T.
 *
 * @template T - The type that the JSON response is expected to conform to.
 * @param url - The URL endpoint to fetch data from.
 * @param options - Optional configuration for the fetch request.
 * @returns A Promise that resolves to a parsed JSON object of type T.
 */
export const baseApi = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    // Initiate the fetch request with the provided URL and options.
    const response = await fetch(url, options);
    
    // Check if the response status indicates success (status code in the range 200-299).
    if (!response.ok) {
      // If the response is not OK, throw an error with the HTTP status.
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse and return the JSON from the response.
    return await response.json();
  } catch (error: unknown) {
    // Check if the error is an instance of the Error class.
    if (error instanceof Error) {
      // Log the error message to the console for debugging.
      console.error(error.message);
    }
    // Rethrow the error so that calling code can handle it as needed.
    throw error;
  }
};
