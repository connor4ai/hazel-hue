import { useState, useCallback } from 'react';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

interface UsePhotoCaptureReturn {
  hasPermission: boolean | null;
  photoUri: string | null;
  requestPermission: () => Promise<boolean>;
  pickFromLibrary: () => Promise<void>;
  setPhotoUri: (uri: string | null) => void;
  clearPhoto: () => void;
}

export function usePhotoCapture(): UsePhotoCaptureReturn {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const hasPermission = permission?.granted ?? null;

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const result = await requestCameraPermission();
    return result.granted;
  }, [requestCameraPermission]);

  const pickFromLibrary = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  }, []);

  const clearPhoto = useCallback(() => {
    setPhotoUri(null);
  }, []);

  return {
    hasPermission,
    photoUri,
    requestPermission,
    pickFromLibrary,
    setPhotoUri,
    clearPhoto,
  };
}
