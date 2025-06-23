import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  TextInput,
  Surface,
  Chip,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen({ navigation, route }: any) {
  const { photos } = route.params || { photos: [] };
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(false);

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'CONNOR') {
      setAppliedPromo(true);
      Alert.alert('Promo Applied!', 'Your analysis is now free!');
    } else {
      Alert.alert('Invalid Code', 'Please check your promo code and try again.');
    }
  };

  const handleCheckout = async () => {
    if (!email) {
      Alert.alert('Email Required', 'Please enter your email address to receive results.');
      return;
    }

    if (photos.length !== 3) {
      Alert.alert('Photos Required', 'Please upload all 3 photos before proceeding.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        
        // Navigate to results with mock order ID
        const orderId = `mobile_order_${Date.now()}`;
        navigation.navigate('Results', { orderId, email });
        
        Alert.alert(
          'Analysis Started!',
          'Your color analysis is being processed. Results will be ready in a few minutes.',
          [{ text: 'OK' }]
        );
      }, 2000);
      
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Error', 'There was an issue processing your request. Please try again.');
    }
  };

  const openWebCheckout = () => {
    // Open web version for actual payment
    const webUrl = 'https://your-web-app-url.com/checkout';
    Linking.openURL(webUrl);
  };

  const originalPrice = 29;
  const finalPrice = appliedPromo ? 0 : originalPrice;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Order Summary */}
      <Card style={styles.summaryCard} mode="contained">
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Order Summary
          </Text>
          
          <View style={styles.summaryRow}>
            <Text variant="bodyLarge">Personal Color Analysis</Text>
            <Text variant="bodyLarge">${originalPrice}</Text>
          </View>
          
          {appliedPromo && (
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium" style={styles.discountText}>
                CONNOR Promo Discount
              </Text>
              <Text variant="bodyMedium" style={styles.discountText}>
                -${originalPrice}
              </Text>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text variant="titleMedium" style={styles.totalText}>
              Total
            </Text>
            <Text variant="titleMedium" style={styles.totalPrice}>
              ${finalPrice}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* What's Included */}
      <Card style={styles.includedCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            What's Included
          </Text>
          
          {[
            'AI-powered color season analysis',
            'Complete 64-color digital palette',
            'Personalized styling recommendations',
            'Makeup and hair color guidance',
            'Celebrity style inspiration',
            'Mobile-optimized color reference',
          ].map((item, index) => (
            <View key={index} style={styles.includedItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text variant="bodyMedium" style={styles.includedText}>
                {item}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.contactCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Contact Information
          </Text>
          
          <TextInput
            label="Email Address *"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.emailInput}
            right={<TextInput.Icon icon="email" />}
          />
          
          <Text variant="bodySmall" style={styles.emailNote}>
            We'll email your results to this address
          </Text>
        </Card.Content>
      </Card>

      {/* Promo Code */}
      <Card style={styles.promoCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Promo Code
          </Text>
          
          <View style={styles.promoRow}>
            <TextInput
              label="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              mode="outlined"
              style={styles.promoInput}
              autoCapitalize="characters"
              disabled={appliedPromo}
            />
            <Button
              mode="outlined"
              onPress={handlePromoCode}
              disabled={appliedPromo}
              style={styles.promoButton}
            >
              Apply
            </Button>
          </View>
          
          {appliedPromo && (
            <Chip
              mode="flat"
              style={styles.appliedChip}
              textStyle={styles.appliedChipText}
            >
              ✓ CONNOR promo applied - Free analysis!
            </Chip>
          )}
          
          <Surface style={styles.promoHint} elevation={0}>
            <Text variant="bodySmall" style={styles.promoHintText}>
              💡 Try code "CONNOR" for a free analysis
            </Text>
          </Surface>
        </Card.Content>
      </Card>

      {/* Payment Section */}
      <View style={styles.paymentSection}>
        {finalPrice === 0 ? (
          <LinearGradient
            colors={['#4CAF50', '#66BB6A']}
            style={styles.freeGradient}
          >
            <Button
              mode="contained"
              onPress={handleCheckout}
              loading={isProcessing}
              disabled={isProcessing}
              style={styles.freeButton}
              labelStyle={styles.freeButtonLabel}
              icon="gift"
            >
              {isProcessing ? 'Starting Analysis...' : 'Start Free Analysis'}
            </Button>
          </LinearGradient>
        ) : (
          <>
            <Text variant="bodyMedium" style={styles.paymentNote}>
              For paid checkout, you'll be redirected to our secure web payment
            </Text>
            
            <Button
              mode="contained"
              onPress={openWebCheckout}
              style={styles.paymentButton}
              icon="credit-card"
            >
              Continue to Payment - ${finalPrice}
            </Button>
          </>
        )}
      </View>

      {/* Security Note */}
      <Surface style={styles.securityNote} elevation={0}>
        <View style={styles.securityContent}>
          <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          <View style={styles.securityText}>
            <Text variant="bodyMedium" style={styles.securityTitle}>
              Your data is secure
            </Text>
            <Text variant="bodySmall" style={styles.securityDescription}>
              Photos are processed securely and deleted after analysis
            </Text>
          </View>
        </View>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EE',
  },
  summaryCard: {
    margin: 20,
    backgroundColor: '#FFF',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountText: {
    color: '#4CAF50',
  },
  divider: {
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontWeight: 'bold',
  },
  totalPrice: {
    fontWeight: 'bold',
    color: '#E85AA0',
  },
  includedCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includedText: {
    marginLeft: 12,
    flex: 1,
  },
  contactCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  emailInput: {
    marginBottom: 8,
  },
  emailNote: {
    color: '#666',
  },
  promoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  promoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  promoInput: {
    flex: 1,
  },
  promoButton: {
    alignSelf: 'center',
  },
  appliedChip: {
    backgroundColor: '#E8F5E8',
    marginBottom: 12,
  },
  appliedChipText: {
    color: '#4CAF50',
  },
  promoHint: {
    backgroundColor: '#FFF9C4',
    padding: 12,
    borderRadius: 8,
  },
  promoHintText: {
    color: '#F57F17',
    textAlign: 'center',
  },
  paymentSection: {
    padding: 20,
  },
  paymentNote: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  paymentButton: {
    backgroundColor: '#E85AA0',
    borderRadius: 25,
  },
  freeGradient: {
    borderRadius: 25,
  },
  freeButton: {
    backgroundColor: 'transparent',
  },
  freeButtonLabel: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  securityNote: {
    margin: 20,
    padding: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityText: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  securityDescription: {
    color: '#4CAF50',
  },
});