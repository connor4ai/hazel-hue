import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function CaptureScreen() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const continueToCheckout = () => {
    // TODO: Store photo URI in Zustand/context, pass to checkout
    router.push('/analysis/checkout');
  };

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <HandLetterHeading
            title={photo ? 'Looking Great' : 'Your Photo'}
            subtitle={photo ? 'Ready for your color analysis' : 'Take or upload a selfie'}
          />

          <View style={styles.photoArea}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.preview} />
            ) : (
              <View style={styles.placeholder}>
                <Typography variant="body" color={colors.gray400} align="center">
                  Your selfie will appear here
                </Typography>
              </View>
            )}
          </View>

          <View style={styles.actions}>
            {photo ? (
              <>
                <Button size="lg" onPress={continueToCheckout}>
                  Continue
                </Button>
                <Button variant="ghost" size="md" onPress={() => setPhoto(null)}>
                  Retake Photo
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" onPress={takePhoto}>
                  Take Selfie
                </Button>
                <Button variant="secondary" size="md" onPress={pickPhoto}>
                  Upload from Library
                </Button>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[10],
    gap: spacing[6],
  },
  photoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: 280,
    height: 373,
    borderRadius: 20,
  },
  placeholder: {
    width: 280,
    height: 373,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.cream200,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cream50,
  },
  actions: {
    gap: spacing[3],
    alignItems: 'center',
    paddingBottom: spacing[8],
  },
});
