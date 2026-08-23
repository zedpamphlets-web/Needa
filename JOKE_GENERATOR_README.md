# Joke Generator Feature

A random joke generator using the **JokeAPI** external service.

## Features

✨ **Key Features:**
- Fetch random jokes from multiple categories
- Support for 7 different joke categories
- Two types of jokes: Single-liner and Two-part
- Share jokes with friends
- Loading states and error handling
- TypeScript support for type safety
- Clean, modern UI with Expo Router

## Categories

The joke generator supports the following categories:
- **Any** - Mix of all categories
- **Miscellaneous** - Variety of jokes
- **Programming** - Developer jokes
- **Knock-Knock** - Classic knock-knock jokes
- **General** - General humor
- **Spooky** - Halloween-themed jokes
- **Dark** - Dark humor

## Architecture

### Files Structure

```
src/
├── services/
│   └── jokeService.ts      # API calls and data processing
├── hooks/
│   └── useJoke.ts          # Custom React hook for joke state
├── types/
│   └── index.ts            # TypeScript type definitions
app/
└── (tabs)/
    └── jokes.tsx           # Jokes screen component
```

### jokeService.ts

Provides the following functions:

```typescript
// Fetch a single random joke
getRandomJoke(category?: string): Promise<ProcessedJoke>

// Fetch multiple jokes
getMultipleJokes(count?: number, category?: string): Promise<ProcessedJoke[]>

// Get available categories
getAvailableCategories(): string[]

// Get available blacklist flags
getAvailableFlags(): string[]
```

### useJoke Hook

Custom React hook that manages joke state and fetching:

```typescript
const { 
  joke,              // Current joke object
  loading,           // Loading state
  error,             // Error message if any
  fetchJoke,         // Fetch single joke
  fetchMultiple,     // Fetch multiple jokes
  clearJoke,         // Clear current joke
  categories         // Available categories
} = useJoke();
```

## Usage

### Basic Usage

```typescript
import { useJoke } from '../src/hooks/useJoke';

function MyComponent() {
  const { joke, loading, error, fetchJoke } = useJoke();

  return (
    <View>
      {joke && <Text>{joke.text}</Text>}
      <TouchableOpacity onPress={() => fetchJoke('Programming')}>
        <Text>Get Joke</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Advanced Usage

```typescript
import { getRandomJoke, getMultipleJokes } from '../src/services/jokeService';

// Fetch a programming joke
const joke = await getRandomJoke('Programming');

// Fetch multiple jokes
const jokes = await getMultipleJokes(5, 'Dark');
```

## API Integration

### JokeAPI

- **Base URL:** `https://v2.jokeapi.dev/joke`
- **Documentation:** https://jokeapi.dev/
- **Rate Limit:** Generous (no authentication required)
- **No API Key:** Free to use

### Request Format

```
GET https://v2.jokeapi.dev/joke/Programming
```

### Response Format

```json
{
  "error": false,
  "category": "Programming",
  "type": "single",
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  }
}
```

## Error Handling

The service includes comprehensive error handling:

- Network errors
- API errors
- Invalid responses
- Timeout handling (recommended: 10 seconds)

## Performance Optimizations

1. **Debouncing:** Prevents rapid consecutive requests
2. **Rate Limiting:** Delays between multiple requests
3. **Caching:** Consider implementing for frequently used categories
4. **Lazy Loading:** Jokes loaded on-demand

## Testing

### Manual Testing

```bash
# Start the app
npm start

# Navigate to Jokes tab
# Test each category
# Test share functionality
# Test error states (disable network)
```

### Unit Testing Example

```typescript
import { getRandomJoke } from '../src/services/jokeService';

describe('jokeService', () => {
  it('should fetch a joke', async () => {
    const joke = await getRandomJoke('Programming');
    expect(joke).toHaveProperty('text');
    expect(joke.category).toBe('Programming');
  });
});
```

## Future Enhancements

- [ ] Favorite jokes list
- [ ] Jokes history
- [ ] Custom filtering options
- [ ] Offline support with caching
- [ ] Dark mode support
- [ ] Analytics tracking
- [ ] User ratings for jokes
- [ ] Search functionality

## Troubleshooting

### No jokes displaying
- Check internet connection
- Verify API endpoint is accessible
- Check browser console for errors

### Slow loading
- API might be slow
- Check network latency
- Consider implementing caching

### Category not working
- Ensure category name is exact
- Check available categories list
- Verify API documentation for current categories

## Dependencies

- React Native
- Expo
- TypeScript
- No additional npm packages required (uses native fetch)

## License

MIT - Free to use and modify

## Credits

- **API:** JokeAPI by Sv443 (https://jokeapi.dev/)
- **Built with:** Expo SDK57 + React Native
