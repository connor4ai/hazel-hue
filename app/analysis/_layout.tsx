import React from 'react';
import { Stack } from 'expo-router';

export default function AnalysisLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FDF6EE' },
        animation: 'slide_from_right',
        gestureEnabled: false, // Prevent back-swipe during analysis flow
      }}
    >
      <Stack.Screen name="onboard" />
      <Stack.Screen name="capture" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="processing" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
