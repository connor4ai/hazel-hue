import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  IconButton,
  ProgressBar,
  Surface,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function UploadScreen({ navigation }: any) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      quality: 0.8,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      const images = result.assets.map(asset => asset.uri);
      setSelectedImages(images.slice(0, 3));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (selectedImages.length !== 3) {
      Alert.alert('Required Photos', 'Please select exactly 3 photos to continue.');
      return;
    }
    navigation.navigate('Checkout', { photos: selectedImages });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress */}
      <Surface style={styles.progressSection} elevation={1}>
        <Text variant="titleMedium" style={styles.progressTitle}>
          Select Your Photos
        </Text>
        <ProgressBar 
          progress={selectedImages.length / 3} 
          style={styles.progressBar}
          color="#E85AA0"
        />
        <Text variant="bodySmall" style={styles.progressText}>
          {selectedImages.length} of 3 photos selected
        </Text>
      </Surface>

      {/* Instructions */}
      <Card style={styles.instructionsCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.instructionsTitle}>
            Photo Guidelines
          </Text>
          <View style={styles.guideline}>
            <Ionicons name="sunny" size={20} color="#E85AA0" />
            <Text variant="bodyMedium" style={styles.guidelineText}>
              Use natural lighting (near a window)
            </Text>
          </View>
          <View style={styles.guideline}>
            <Ionicons name="person" size={20} color="#E85AA0" />
            <Text variant="bodyMedium" style={styles.guidelineText}>
              Clear face shots without heavy makeup
            </Text>
          </View>
          <View style={styles.guideline}>
            <Ionicons name="camera" size={20} color="#E85AA0" />
            <Text variant="bodyMedium" style={styles.guidelineText}>
              Include different angles and lighting
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Upload Area */}
      <View style={styles.uploadSection}>
        <Button
          mode="contained"
          onPress={pickImages}
          style={styles.uploadButton}
          icon="image-multiple"
        >
          Choose Photos from Gallery
        </Button>
        
        <Text variant="bodySmall" style={styles.uploadNote}>
          Select up to 3 photos from your photo library
        </Text>
      </View>

      {/* Selected Images */}
      {selectedImages.length > 0 && (
        <Card style={styles.selectedCard} mode="contained">
          <Card.Content>
            <Text variant="titleMedium" style={styles.selectedTitle}>
              Selected Photos ({selectedImages.length}/3)
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.imageGrid}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.selectedImage} />
                    <IconButton
                      icon="close-circle"
                      iconColor="#FF5252"
                      size={24}
                      style={styles.removeButton}
                      onPress={() => removeImage(index)}
                    />
                    <Text variant="bodySmall" style={styles.imageNumber}>
                      Photo {index + 1}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </Card.Content>
        </Card>
      )}

      {/* Continue Button */}
      {selectedImages.length === 3 && (
        <View style={styles.continueSection}>
          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.continueButton}
            icon="arrow-right"
          >
            Continue to Checkout
          </Button>
        </View>
      )}

      {/* Tips */}
      <Card style={styles.tipsCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.tipsTitle}>
            💡 Tips for Best Results
          </Text>
          <Text variant="bodyMedium" style={styles.tipText}>
            • Avoid heavy filters or editing
          </Text>
          <Text variant="bodyMedium" style={styles.tipText}>
            • Show your natural hair color
          </Text>
          <Text variant="bodyMedium" style={styles.tipText}>
            • Include both close-up and full-face shots
          </Text>
          <Text variant="bodyMedium" style={styles.tipText}>
            • Ensure photos are clear and well-lit
          </Text>
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
  instructionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  guidelineText: {
    marginLeft: 12,
    flex: 1,
  },
  uploadSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#E85AA0',
    borderRadius: 25,
    marginBottom: 12,
  },
  uploadNote: {
    textAlign: 'center',
    color: '#666',
  },
  selectedCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  selectedTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  selectedImage: {
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
  imageNumber: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
  continueSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#E85AA0',
    borderRadius: 25,
  },
  tipsCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    backgroundColor: '#FFF',
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tipText: {
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});