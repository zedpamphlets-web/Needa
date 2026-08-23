import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="post/[id]" />
      <Stack.Screen name="shop/[id]" />
    </Stack>
  );
}
