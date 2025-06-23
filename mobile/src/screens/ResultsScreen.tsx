import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Surface,
  Chip,
  IconButton,
  ProgressBar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Mock True Winter data for mobile demo
const mockResults = {
  season: 'True Winter',
  overview: {
    description: 'True Winters have high contrast coloring with cool undertones. You look stunning in clear, saturated colors that match your natural intensity.',
    keyCharacteristics: [
      'High contrast between hair, eyes, and skin',
      'Cool undertones in skin',
      'Clear, bright eye color',
      'Hair ranges from dark brown to black'
    ],
    signatureColors: ['#DC143C', '#000080', '#50C878', '#E85AA0', '#1C1C1C', '#E8E8E8', '#663399', '#1C7A9B'],
  },
  colorPalette: {
    coreNeutrals: ['#1C1C1C', '#E8E8E8', '#4A4A4A', '#D4D4D4'],
    accentLights: ['#FFE8FC', '#E6F3FF', '#E8F5E8', '#FCE4B8'],
    accentBrights: ['#DC143C', '#E85AA0', '#663399', '#50C878', '#000080', '#1C7A9B'],
  },
};

export default function ResultsScreen({ navigation, route }: any) {
  const { orderId, email } = route.params || {};
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate analysis processing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const copyColor = async (color: string) => {
    await Clipboard.setStringAsync(color);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Copied!', `${color} copied to clipboard`);
  };

  const shareResults = async () => {
    try {
      await Share.share({
        message: `Check out my ${mockResults.season} color analysis from HueMatcher! I discovered my perfect color palette. 🎨`,
        url: 'https://huematcher.com',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const ColorSwatch = ({ color, name }: { color: string; name?: string }) => (
    <Surface
      style={[styles.colorSwatch, { backgroundColor: color }]}
      elevation={2}
    >
      <IconButton
        icon="content-copy"
        iconColor={color === '#1C1C1C' ? '#FFF' : '#333'}
        size={16}
        onPress={() => copyColor(color)}
        style={styles.copyButton}
      />
      <View style={styles.colorInfo}>
        <Text style={[
          styles.colorCode,
          { color: color === '#1C1C1C' ? '#FFF' : '#333' }
        ]}>
          {color}
        </Text>
        {name && (
          <Text style={[
            styles.colorName,
            { color: color === '#1C1C1C' ? '#FFF' : '#666' }
          ]}>
            {name}
          </Text>
        )}
      </View>
    </Surface>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#FAF4EE', '#FFE8FC']}
          style={styles.loadingGradient}
        >
          <View style={styles.loadingContent}>
            <Ionicons name="color-palette" size={80} color="#E85AA0" />
            <Text variant="headlineSmall" style={styles.loadingTitle}>
              Analyzing Your Colors...
            </Text>
            <Text variant="bodyLarge" style={styles.loadingSubtitle}>
              Our AI is processing your photos
            </Text>
            <ProgressBar
              indeterminate
              style={styles.loadingProgress}
              color="#E85AA0"
            />
            <Text variant="bodyMedium" style={styles.loadingEmail}>
              Results will be emailed to: {email}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const sections = [
    {
      id: 'overview',
      title: 'Your Season',
      icon: 'person',
      content: (
        <View style={styles.overviewSection}>
          <LinearGradient
            colors={['#1C1C1C', '#4A4A4A']}
            style={styles.seasonHeader}
          >
            <Text variant="headlineLarge" style={styles.seasonTitle}>
              {mockResults.season}
            </Text>
            <Text variant="bodyLarge" style={styles.seasonSubtitle}>
              High Contrast • Cool Undertones • Bold Colors
            </Text>
          </LinearGradient>

          <Card style={styles.descriptionCard} mode="contained">
            <Card.Content>
              <Text variant="bodyLarge" style={styles.description}>
                {mockResults.overview.description}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.characteristicsCard} mode="contained">
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Your Key Characteristics
              </Text>
              {mockResults.overview.keyCharacteristics.map((char, index) => (
                <View key={index} style={styles.characteristicItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#E85AA0" />
                  <Text variant="bodyMedium" style={styles.characteristicText}>
                    {char}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.signatureCard} mode="contained">
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Your Signature Colors
              </Text>
              <View style={styles.signatureGrid}>
                {mockResults.overview.signatureColors.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>
      ),
    },
    {
      id: 'palette',
      title: 'Color Palette',
      icon: 'color-palette',
      content: (
        <View style={styles.paletteSection}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Your Complete Color Palette
          </Text>

          <Card style={styles.paletteCard} mode="contained">
            <Card.Content>
              <Text variant="titleMedium" style={styles.paletteTitle}>
                Core Neutrals
              </Text>
              <Text variant="bodySmall" style={styles.paletteDescription}>
                Foundation colors for your wardrobe
              </Text>
              <View style={styles.colorGrid}>
                {mockResults.colorPalette.coreNeutrals.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.paletteCard} mode="contained">
            <Card.Content>
              <Text variant="titleMedium" style={styles.paletteTitle}>
                Accent Lights
              </Text>
              <Text variant="bodySmall" style={styles.paletteDescription}>
                Soft highlights and gentle accents
              </Text>
              <View style={styles.colorGrid}>
                {mockResults.colorPalette.accentLights.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.paletteCard} mode="contained">
            <Card.Content>
              <Text variant="titleMedium" style={styles.paletteTitle}>
                Accent Brights
              </Text>
              <Text variant="bodySmall" style={styles.paletteDescription}>
                Bold statement colors for impact
              </Text>
              <View style={styles.colorGrid}>
                {mockResults.colorPalette.accentBrights.map((color, index) => (
                  <ColorSwatch key={index} color={color} />
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>
      ),
    },
    {
      id: 'styling',
      title: 'Style Guide',
      icon: 'shirt',
      content: (
        <View style={styles.stylingSection}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Your Styling Guide
          </Text>

          <Card style={styles.styleCard} mode="contained">
            <Card.Content>
              <View style={styles.styleHeader}>
                <Ionicons name="shirt" size={24} color="#E85AA0" />
                <Text variant="titleMedium" style={styles.styleTitle}>
                  Clothing Colors
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.styleText}>
                Choose crisp whites, true blacks, and jewel tones. Avoid warm, muted colors like beige, orange, or golden yellows.
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.styleCard} mode="contained">
            <Card.Content>
              <View style={styles.styleHeader}>
                <Ionicons name="color-palette" size={24} color="#E85AA0" />
                <Text variant="titleMedium" style={styles.styleTitle}>
                  Makeup Colors
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.styleText}>
                True red lipstick, navy or black eyeliner, cool pink blush, and silver or cool-toned eyeshadows work beautifully.
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.styleCard} mode="contained">
            <Card.Content>
              <View style={styles.styleHeader}>
                <Ionicons name="diamond" size={24} color="#E85AA0" />
                <Text variant="titleMedium" style={styles.styleTitle}>
                  Accessories
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.styleText}>
                Silver, platinum, or white gold jewelry. Choose accessories in your signature colors for maximum impact.
              </Text>
            </Card.Content>
          </Card>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Navigation Tabs */}
      <Surface style={styles.tabContainer} elevation={2}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabRow}>
            {sections.map((section, index) => (
              <Button
                key={section.id}
                mode={currentSection === index ? 'contained' : 'outlined'}
                onPress={() => setCurrentSection(index)}
                style={[
                  styles.tab,
                  currentSection === index && styles.activeTab
                ]}
                labelStyle={[
                  styles.tabLabel,
                  currentSection === index && styles.activeTabLabel
                ]}
                icon={section.icon}
                compact
              >
                {section.title}
              </Button>
            ))}
          </View>
        </ScrollView>
      </Surface>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sections[currentSection].content}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Button
            mode="contained"
            onPress={shareResults}
            style={styles.actionButton}
            icon="share"
          >
            Share Results
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('MainTabs')}
            style={styles.actionButton}
          >
            Back to Home
          </Button>
        </View>

        {/* Tips */}
        <Card style={styles.tipsCard} mode="contained">
          <Card.Content>
            <Text variant="titleMedium" style={styles.tipsTitle}>
              💡 Pro Tips
            </Text>
            <Text variant="bodyMedium" style={styles.tipText}>
              • Screenshot your favorite colors for shopping reference
            </Text>
            <Text variant="bodyMedium" style={styles.tipText}>
              • Use the copy function to save hex codes
            </Text>
            <Text variant="bodyMedium" style={styles.tipText}>
              • Share this analysis with your stylist or makeup artist
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EE',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingTitle: {
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  loadingProgress: {
    width: width * 0.8,
    height: 4,
    marginBottom: 24,
  },
  loadingEmail: {
    color: '#666',
    textAlign: 'center',
  },
  tabContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#E85AA0',
  },
  tabLabel: {
    fontSize: 12,
  },
  activeTabLabel: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overviewSection: {
    gap: 16,
  },
  seasonHeader: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  seasonTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  seasonSubtitle: {
    color: '#FFF',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  descriptionCard: {
    backgroundColor: '#FFF',
  },
  description: {
    lineHeight: 24,
    color: '#333',
  },
  characteristicsCard: {
    backgroundColor: '#FFF',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  characteristicText: {
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  signatureCard: {
    backgroundColor: '#FFF',
  },
  signatureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  colorSwatch: {
    width: (width - 80) / 4,
    height: 80,
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  copyButton: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  colorInfo: {
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
  },
  paletteSection: {
    gap: 16,
  },
  paletteCard: {
    backgroundColor: '#FFF',
  },
  paletteTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  paletteDescription: {
    color: '#666',
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stylingSection: {
    gap: 16,
  },
  styleCard: {
    backgroundColor: '#FFF',
  },
  styleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  styleTitle: {
    fontWeight: 'bold',
    marginLeft: 12,
  },
  styleText: {
    lineHeight: 20,
    color: '#333',
  },
  actionSection: {
    gap: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 25,
  },
  tipsCard: {
    backgroundColor: '#FFF',
    marginBottom: 32,
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