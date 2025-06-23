import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Surface,
} from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface ColorPaletteProps {
  colors: Array<{
    name: string;
    code: string;
  }>;
  title: string;
  description?: string;
}

export default function ColorPalette({ colors, title, description }: ColorPaletteProps) {
  const copyColor = async (color: string) => {
    await Clipboard.setStringAsync(color);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Copied!', `${color} copied to clipboard`);
  };

  const itemWidth = (width - 80) / 4;

  return (
    <Surface style={styles.container} elevation={2}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        {description && (
          <Text variant="bodySmall" style={styles.description}>
            {description}
          </Text>
        )}
      </View>
      
      <View style={styles.colorGrid}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorItem,
              { width: itemWidth, backgroundColor: color.code }
            ]}
            onPress={() => copyColor(color.code)}
            activeOpacity={0.8}
          >
            <View style={styles.colorOverlay}>
              <Text
                style={[
                  styles.colorCode,
                  { 
                    color: color.code === '#1C1C1C' || color.code === '#000000' ? '#FFF' : '#333'
                  }
                ]}
              >
                {color.code}
              </Text>
              <Text
                style={[
                  styles.colorName,
                  { 
                    color: color.code === '#1C1C1C' || color.code === '#000000' ? '#FFF' : '#666'
                  }
                ]}
              >
                {color.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#666',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorItem: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  colorOverlay: {
    padding: 8,
    alignItems: 'center',
  },
  colorCode: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  colorName: {
    fontSize: 8,
    marginTop: 2,
    textAlign: 'center',
  },
});