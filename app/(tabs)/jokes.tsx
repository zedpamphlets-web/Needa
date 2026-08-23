import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Share,
  Alert,
} from 'react-native';
import { useJoke } from '../src/hooks/useJoke';

export default function JokesScreen() {
  const { joke, loading, error, fetchJoke, categories } = useJoke();
  const [selectedCategory, setSelectedCategory] = useState('Any');

  // Fetch a joke on component mount
  useEffect(() => {
    fetchJoke(selectedCategory);
  }, []);

  const handleFetchJoke = async () => {
    await fetchJoke(selectedCategory);
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    await fetchJoke(category);
  };

  const handleShareJoke = async () => {
    if (!joke) return;

    try {
      await Share.share({
        message: `Check out this joke:\n\n${joke.text}\n\n#JokeOfTheDay`,
        title: 'Funny Joke',
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to share joke');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>😂 Joke Generator</Text>
        <Text style={styles.subtitle}>Get random jokes instantly</Text>
      </View>

      {/* Category Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryChange(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Joke Display */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Fetching a funny joke...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ Oops!</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {joke && !loading && (
        <View style={styles.jokeContainer}>
          <View style={styles.jokeCard}>
            <Text style={styles.categoryTag}>{joke.category}</Text>
            <Text style={styles.jokeText}>{joke.text}</Text>
            {joke.type === 'twopart' && (
              <View style={styles.jokeTypeIndicator}>
                <Text style={styles.jokeTypeText}>Two-part joke</Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleFetchJoke}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>Get Another Joke</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleShareJoke}
            >
              <Text style={styles.secondaryButtonText}>Share Joke</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Initial State */}
      {!joke && !loading && !error && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>👋 Tap "Get Another Joke" to start</Text>
        </View>
      )}

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About This Feature</Text>
        <Text style={styles.infoText}>
          This joke generator uses the JokeAPI to fetch random jokes. Select a category, tap the button, and enjoy!
        </Text>
        <Text style={styles.apiCredit}>API: JokeAPI by Sv443</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e8e8e8',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#c62828',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#d32f2f',
    lineHeight: 20,
  },
  jokeContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  jokeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  jokeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontWeight: '500',
  },
  jokeTypeIndicator: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  jokeTypeText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  infoSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  apiCredit: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
