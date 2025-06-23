import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Surface,
  Chip,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const features = [
    {
      icon: 'camera',
      title: 'AI Color Analysis',
      description: 'Upload 3 photos and get your personal color season',
    },
    {
      icon: 'palette',
      title: '64-Color Palette',
      description: 'Complete professional color palette for shopping',
    },
    {
      icon: 'shirt',
      title: 'Style Guidance',
      description: 'Personalized clothing and makeup recommendations',
    },
    {
      icon: 'phone-portrait',
      title: 'Mobile Optimized',
      description: 'Take your colors anywhere for instant reference',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#FAF4EE', '#FFE8FC']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Text variant="headlineLarge" style={styles.heroTitle}>
            Discover Your Perfect Colors
          </Text>
          <Text variant="bodyLarge" style={styles.heroSubtitle}>
            AI-powered personal color analysis in minutes
          </Text>
          
          <View style={styles.priceContainer}>
            <Text variant="headlineSmall" style={styles.price}>
              $29
            </Text>
            <Chip mode="outlined" style={styles.promoChip}>
              Use code CONNOR for free analysis
            </Chip>
          </View>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Camera')}
            style={styles.ctaButton}
            contentStyle={styles.ctaButtonContent}
          >
            Start Your Analysis
          </Button>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          What You'll Get
        </Text>
        
        {features.map((feature, index) => (
          <Card key={index} style={styles.featureCard} mode="contained">
            <Card.Content style={styles.featureContent}>
              <View style={styles.featureIcon}>
                <Ionicons 
                  name={feature.icon as any} 
                  size={32} 
                  color="#E85AA0" 
                />
              </View>
              <View style={styles.featureText}>
                <Text variant="titleMedium" style={styles.featureTitle}>
                  {feature.title}
                </Text>
                <Text variant="bodyMedium" style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* How It Works Section */}
      <View style={styles.howItWorksSection}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          How It Works
        </Text>
        
        <View style={styles.stepsContainer}>
          {[
            { step: '1', title: 'Take Photos', description: 'Upload 3 selfies in natural light' },
            { step: '2', title: 'AI Analysis', description: 'Our AI determines your color season' },
            { step: '3', title: 'Get Results', description: 'Receive your personalized color palette' },
          ].map((item, index) => (
            <View key={index} style={styles.stepItem}>
              <Surface style={styles.stepNumber} elevation={2}>
                <Text variant="titleLarge" style={styles.stepNumberText}>
                  {item.step}
                </Text>
              </Surface>
              <View style={styles.stepContent}>
                <Text variant="titleMedium" style={styles.stepTitle}>
                  {item.title}
                </Text>
                <Text variant="bodyMedium" style={styles.stepDescription}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <LinearGradient
        colors={['#E85AA0', '#FFB8E8']}
        style={styles.ctaSection}
      >
        <Text variant="headlineSmall" style={styles.ctaTitle}>
          Ready to Find Your Colors?
        </Text>
        <Text variant="bodyLarge" style={styles.ctaSubtitle}>
          Join thousands who've discovered their perfect palette
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Camera')}
          style={styles.finalCtaButton}
          labelStyle={styles.finalCtaButtonLabel}
        >
          Get Started Now
        </Button>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EE',
  },
  heroSection: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  heroSubtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  price: {
    fontWeight: 'bold',
    color: '#E85AA0',
    marginBottom: 8,
  },
  promoChip: {
    backgroundColor: '#FFF',
  },
  ctaButton: {
    backgroundColor: '#E85AA0',
    borderRadius: 25,
  },
  ctaButtonContent: {
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  featureCard: {
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#666',
  },
  howItWorksSection: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  stepsContainer: {
    gap: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E85AA0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    color: '#666',
  },
  ctaSection: {
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.9,
  },
  finalCtaButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
  },
  finalCtaButtonLabel: {
    color: '#E85AA0',
    fontWeight: 'bold',
  },
});