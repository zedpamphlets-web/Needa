import { View, Text, StyleSheet } from 'react-native';

interface OfflineBannerProps {
  isVisible: boolean;
}

export default function OfflineBanner({ isVisible }: OfflineBannerProps) {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff6b6b',
    padding: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
