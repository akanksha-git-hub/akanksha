import { useEffect, useState } from "react";

/**
 * Hook to check if a given media query matches the current window size.
 * @param {string} query - A valid CSS media query string, e.g., '(min-width: 1024px)'
 * @returns {boolean} - True if the query matches, false otherwise.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch(); // Initial check
    media.addEventListener("change", updateMatch);

    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
