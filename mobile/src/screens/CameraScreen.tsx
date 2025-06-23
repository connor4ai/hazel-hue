import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Surface,
  IconButton,
  ProgressBar,
} from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.front);
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<Camera>(null);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus === 'granted' && mediaStatus === 'granted') {
      setHasPermission(true);
    } else {
      Alert.alert(
        'Permissions Required',
        'Please allow camera and photo library access to continue with your color analysis.',
        [{ text: 'OK' }]
      );
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      setPhotos(prev => [...prev, photo.uri]);
      setShowCamera(false);
      
      if (photos.length === 2) {
        // All 3 photos taken, proceed to checkout
        setTimeout(() => {
          navigation.navigate('Checkout', { photos: [...photos, photo.uri] });
        }, 500);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotos(prev => [...prev, result.assets[0].uri]);
      
      if (photos.length === 2) {
        // All 3 photos selected, proceed to checkout
        setTimeout(() => {
          navigation.navigate('Checkout', { photos: [...photos, result.assets[0].uri] });
        }, 500);
      }
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const photoInstructions = [
    {
      title: 'Photo 1: Face in Natural Light',
      description: 'Clear, well-lit selfie without makeup',
      icon: 'sunny',
    },
    {
      title: 'Photo 2: Close-up Face',
      description: 'Focus on eyes, skin tone, and natural features',
      icon: 'person',
    },
    {
      title: 'Photo 3: Full Face Profile',
      description: 'Side view showing hair and skin together',
      icon: 'camera',
    },
  ];

  if (showCamera && hasPermission) {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <IconButton
                icon="close"
                iconColor="#FFF"
                size={30}
                onPress={() => setShowCamera(false)}
              />
              <Text style={styles.cameraTitle}>
                Photo {photos.length + 1} of 3
              </Text>
              <IconButton
                icon="camera-flip"
                iconColor="#FFF"
                size={30}
                onPress={() => {
                  setType(current => 
                    current === CameraType.back ? CameraType.front : CameraType.back
                  );
                }}
              />
            </View>
            
            <View style={styles.cameraFrame}>
              <View style={styles.frameOverlay} />
            </View>
            
            <View style={styles.cameraControls}>
              <View style={styles.captureButtonContainer}>
                <Button
                  mode="contained"
                  onPress={takePicture}
                  style={styles.captureButton}
                  labelStyle={styles.captureButtonLabel}
                >
                  Capture
                </Button>
              </View>
            </View>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Section */}
      <Surface style={styles.progressSection} elevation={1}>
        <Text variant="titleMedium" style={styles.progressTitle}>
          Upload Your Photos
        </Text>
        <ProgressBar 
          progress={photos.length / 3} 
          style={styles.progressBar}
          color="#E85AA0"
        />
        <Text variant="bodySmall" style={styles.progressText}>
          {photos.length} of 3 photos uploaded
        </Text>
      </Surface>

      {/* Instructions */}
      <View style={styles.instructionsSection}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Photo Requirements
        </Text>
        
        {photoInstructions.map((instruction, index) => (
          <Card 
            key={index} 
            style={[
              styles.instructionCard,
              photos.length > index && styles.completedCard
            ]} 
            mode="contained"
          >
            <Card.Content style={styles.instructionContent}>
              <View style={styles.instructionIcon}>
                <Ionicons 
                  name={instruction.icon as any} 
                  size={24} 
                  color={photos.length > index ? "#4CAF50" : "#E85AA0"} 
                />
                {photos.length > index && (
                  <View style={styles.checkmarkOverlay}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  </View>
                )}
              </View>
              <View style={styles.instructionText}>
                <Text variant="titleMedium" style={styles.instructionTitle}>
                  {instruction.title}
                </Text>
                <Text variant="bodyMedium" style={styles.instructionDescription}>
                  {instruction.description}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Photo Preview */}
      {photos.length > 0 && (
        <View style={styles.previewSection}>
          <Text variant="titleMedium" style={styles.previewTitle}>
            Your Photos
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={styles.photoPreview} />
                  <IconButton
                    icon="close-circle"
                    iconColor="#FF5252"
                    size={24}
                    style={styles.removeButton}
                    onPress={() => removePhoto(index)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        {photos.length < 3 && (
          <>
            <Button
              mode="contained"
              onPress={() => {
                if (hasPermission) {
                  setShowCamera(true);
                } else {
                  requestPermissions();
                }
              }}
              style={styles.actionButton}
              icon="camera"
            >
              Take Photo {photos.length + 1}
            </Button>
            
            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.actionButton}
              icon="image"
            >
              Choose from Gallery
            </Button>
          </>
        )}

        {photos.length === 3 && (
          <LinearGradient
            colors={['#E85AA0', '#FFB8E8']}
            style={styles.completeGradient}
          >
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Checkout', { photos })}
              style={styles.completeButton}
              labelStyle={styles.completeButtonLabel}
              icon="arrow-right"
            >
              Continue to Checkout
            </Button>
          </LinearGradient>
        )}
      </View>

      {/* Tips Section */}
      <Card style={styles.tipsCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.tipsTitle}>
            💡 Tips for Best Results
          </Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Use natural lighting (near a window)</Text>
            <Text style={styles.tipItem}>• Remove makeup if possible</Text>
            <Text style={styles.tipItem}>• Ensure clear, focused photos</Text>
            <Text style={styles.tipItem}>• Show your natural hair color</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EE',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  cameraTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameOverlay: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
  cameraControls: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  captureButtonContainer: {
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#E85AA0',
    borderRadius: 35,
  },
  captureButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  progressTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
  },
  instructionsSection: {
    padding: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  instructionCard: {
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  completedCard: {
    backgroundColor: '#E8F5E8',
  },
  instructionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionIcon: {
    marginRight: 16,
    position: 'relative',
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  instructionText: {
    flex: 1,
  },
  instructionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructionDescription: {
    color: '#666',
  },
  previewSection: {
    padding: 20,
  },
  previewTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  photoContainer: {
    position: 'relative',
  },
  photoPreview: {
    width: 100,
    height: 133,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    borderRadius: 25,
  },
  completeGradient: {
    borderRadius: 25,
  },
  completeButton: {
    backgroundColor: 'transparent',
  },
  completeButtonLabel: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tipsCard: {
    margin: 20,
    backgroundColor: '#FFF',
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    color: '#666',
    lineHeight: 20,
  },
});