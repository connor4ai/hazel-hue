import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { useAnalysisStore } from '@presentation/stores/useAnalysisStore';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

function CameraPlaceholderIcon() {
  return (
    <Svg width={64} height={64} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="camGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.hazel200} />
          <Stop offset="1" stopColor={colors.cream300} />
        </LinearGradient>
      </Defs>
      <Path
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
        stroke="url(#camGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="13"
        r="4"
        stroke="url(#camGrad)"
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
}

export default function CaptureScreen() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const setStorePhoto = useAnalysisStore((s) => s.setPhoto);

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
    if (!photo) return;
    setStorePhoto(photo);
    router.push('/analysis/checkout');
  };

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <HandLetterHeading
            title={photo ? 'Looking Great' : 'Your Photo'}
            subtitle={photo ? 'Ready for your color analysis' : 'Take or upload a selfie in natural light'}
          />

          <View style={styles.photoArea}>
            {photo ? (
              <View style={styles.previewContainer}>
                <Image source={{ uri: photo }} style={styles.preview} />
                {/* Decorative corner accents */}
                <View style={[styles.cornerAccent, styles.cornerTopLeft]} />
                <View style={[styles.cornerAccent, styles.cornerBottomRight]} />
              </View>
            ) : (
              <View style={styles.placeholder}>
                <CameraPlaceholderIcon />
                <Typography variant="bodySmall" color={colors.gray400} align="center" style={{ marginTop: spacing[3] }}>
                  Your selfie will{'\n'}appear here
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
  previewContainer: {
    position: 'relative',
  },
  preview: {
    width: 280,
    height: 373,
    borderRadius: 24,
  },
  cornerAccent: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: colors.hazel200,
    borderWidth: 2,
  },
  cornerTopLeft: {
    top: -8,
    left: -8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: -8,
    right: -8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  placeholder: {
    width: 280,
    height: 373,
    borderRadius: 24,
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
