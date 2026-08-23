// Joke API Service
// Uses JokeAPI (https://jokeapi.dev/) for fetching random jokes

interface JokeResponse {
  error: boolean;
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
}

interface ProcessedJoke {
  id: string;
  text: string;
  category: string;
  type: 'single' | 'twopart';
  setup?: string;
  delivery?: string;
}

const JOKE_API_BASE = 'https://v2.jokeapi.dev/joke';

/**
 * Fetch a random joke from JokeAPI
 * @param category - Joke category (Any, Miscellaneous, Programming, Knock-Knock, General, Spooky, Dark)
 * @param excludeFlags - Flags to exclude (nsfw, religious, political, racist, sexist, explicit)
 * @returns Promise containing the processed joke
 */
export async function getRandomJoke(
  category: string = 'Any',
  excludeFlags: string[] = []
): Promise<ProcessedJoke> {
  try {
    // Build query parameters
    const flags = excludeFlags.length > 0 ? `?blacklistFlags=${excludeFlags.join(',')}` : '';
    const url = `${JOKE_API_BASE}/${category}${flags}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch joke: ${response.statusText}`);
    }

    const data: JokeResponse = await response.json();

    if (data.error) {
      throw new Error('Joke API returned an error');
    }

    // Process the joke data
    const processedJoke: ProcessedJoke = {
      id: generateJokeId(),
      text: data.type === 'single' ? data.joke || '' : `${data.setup}\n${data.delivery}`,
      category: data.category,
      type: data.type as 'single' | 'twopart',
      ...(data.type === 'twopart' && { setup: data.setup, delivery: data.delivery }),
    };

    return processedJoke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
}

/**
 * Fetch multiple random jokes
 * @param count - Number of jokes to fetch
 * @param category - Joke category
 * @returns Promise containing an array of jokes
 */
export async function getMultipleJokes(
  count: number = 5,
  category: string = 'Any'
): Promise<ProcessedJoke[]> {
  const jokes: ProcessedJoke[] = [];

  for (let i = 0; i < count; i++) {
    try {
      const joke = await getRandomJoke(category);
      jokes.push(joke);
      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to fetch joke ${i + 1}:`, error);
    }
  }

  return jokes;
}

/**
 * Get available joke categories
 * @returns Array of available categories
 */
export function getAvailableCategories(): string[] {
  return [
    'Any',
    'Miscellaneous',
    'Programming',
    'Knock-Knock',
    'General',
    'Spooky',
    'Dark',
  ];
}

/**
 * Get available blacklist flags
 * @returns Array of available flags
 */
export function getAvailableFlags(): string[] {
  return ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];
}

/**
 * Generate a unique ID for a joke
 * @returns Unique string ID
 */
function generateJokeId(): string {
  return `joke_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
