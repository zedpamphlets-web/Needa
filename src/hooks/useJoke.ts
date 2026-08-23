import { useState, useCallback } from 'react';
import { getRandomJoke, getMultipleJokes, getAvailableCategories, ProcessedJoke } from '../services/jokeService';

interface UseJokeResult {
  joke: ProcessedJoke | null;
  loading: boolean;
  error: string | null;
  fetchJoke: (category?: string) => Promise<void>;
  fetchMultiple: (count?: number, category?: string) => Promise<void>;
  clearJoke: () => void;
  categories: string[];
}

/**
 * Custom hook for managing joke fetching and state
 */
export function useJoke(): UseJokeResult {
  const [joke, setJoke] = useState<ProcessedJoke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = useCallback(async (category: string = 'Any') => {
    setLoading(true);
    setError(null);
    try {
      const newJoke = await getRandomJoke(category);
      setJoke(newJoke);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch joke');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMultiple = useCallback(async (count: number = 5, category: string = 'Any') => {
    setLoading(true);
    setError(null);
    try {
      const jokes = await getMultipleJokes(count, category);
      if (jokes.length > 0) {
        setJoke(jokes[0]); // Set the first joke as the current joke
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jokes');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearJoke = useCallback(() => {
    setJoke(null);
    setError(null);
  }, []);

  return {
    joke,
    loading,
    error,
    fetchJoke,
    fetchMultiple,
    clearJoke,
    categories: getAvailableCategories(),
  };
}
