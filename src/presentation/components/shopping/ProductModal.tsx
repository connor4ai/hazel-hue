/**
 * ProductModal — React Native bottom sheet showing matched products.
 */

import React from 'react';
import {
  View,
  Modal,
  Pressable,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing, borderRadius, shadows } from '@presentation/theme/spacing';
import type {
  ShoppableProduct,
  ClickSource,
  ProductCategory,
} from '@presentation/hooks/useShoppingApi';
import { trackProductClick, formatPrice } from '@presentation/hooks/useShoppingApi';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  products: ShoppableProduct[];
  loading: boolean;
  error: string | null;
  query: string;
  clickSource: ClickSource;
  analysisId?: string;
}

export function ProductModal({
  visible,
  onClose,
  products,
  loading,
  error,
  query,
  clickSource,
  analysisId,
}: ProductModalProps) {
  const handleProductPress = (product: ShoppableProduct) => {
    if (analysisId) {
      trackProductClick({
        analysisId,
        productId: product.id,
        merchantName: product.merchantName,
        clickSource,
        category: product.category,
        matchScore: product.matchScore,
        affiliateUrl: product.affiliateUrl,
      });
    }
    Linking.openURL(product.affiliateUrl);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <Pressable style={modalStyles.backdrop} onPress={onClose} />

        <View style={modalStyles.sheet}>
          {/* Handle */}
          <View style={modalStyles.handle} />

          {/* Header */}
          <View style={modalStyles.header}>
            <View style={modalStyles.headerText}>
              <Typography variant="caption" color={colors.hazel} style={{ letterSpacing: 2, textTransform: 'uppercase' }}>
                Shop This Look
              </Typography>
              <Typography variant="body" color={colors.charcoal} numberOfLines={1}>
                {query}
              </Typography>
            </View>
            <Pressable onPress={onClose} style={modalStyles.closeButton}>
              <Svg width={16} height={16} viewBox="0 0 24 24">
                <Line x1="6" y1="6" x2="18" y2="18" stroke={colors.gray400} strokeWidth={2} strokeLinecap="round" />
                <Line x1="18" y1="6" x2="6" y2="18" stroke={colors.gray400} strokeWidth={2} strokeLinecap="round" />
              </Svg>
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView style={modalStyles.content} showsVerticalScrollIndicator={false}>
            {loading && (
              <View style={modalStyles.center}>
                <ActivityIndicator size="large" color={colors.hazel} />
              </View>
            )}

            {error && (
              <View style={modalStyles.errorBox}>
                <Typography variant="body" color={colors.error} align="center">
                  Couldn't load products right now.
                </Typography>
              </View>
            )}

            {!loading && !error && products.length === 0 && (
              <View style={modalStyles.center}>
                <Typography variant="body" color={colors.gray400} align="center">
                  No matching products found.
                </Typography>
              </View>
            )}

            {!loading && !error && products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product)}
              />
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={modalStyles.footer}>
            <Typography variant="caption" color={colors.gray300} align="center" style={{ fontSize: 9 }}>
              Affiliate links — Hazel & Hue may earn a commission at no extra cost to you.
            </Typography>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── Product Card ──────────────────────────────────────────────────

function ProductCard({
  product,
  onPress,
}: {
  product: ShoppableProduct;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        cardStyles.container,
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      {/* Image */}
      <View style={cardStyles.imageContainer}>
        {product.imageUrl ? (
          <Image
            source={{ uri: product.imageUrl }}
            style={cardStyles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={cardStyles.imagePlaceholder}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159"
                stroke={colors.gray300}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          </View>
        )}

        {/* Match badge */}
        <View style={cardStyles.badge}>
          <View style={[cardStyles.badgeDot, { backgroundColor: product.matchedPaletteHex }]} />
          <Typography variant="caption" color={colors.white} style={cardStyles.badgeText}>
            {product.matchScore}%
          </Typography>
        </View>
      </View>

      {/* Info */}
      <View style={cardStyles.info}>
        <Typography variant="bodySmall" color={colors.charcoal} numberOfLines={2}>
          {product.name}
        </Typography>
        <View style={cardStyles.priceRow}>
          <Typography variant="body" color={colors.charcoal} style={{ fontWeight: '700' }}>
            {formatPrice(product.priceInCents, product.currency)}
          </Typography>
          <Typography variant="caption" color={colors.gray400}>
            {product.merchantName}
          </Typography>
        </View>
      </View>

      {/* Arrow */}
      <Svg width={16} height={16} viewBox="0 0 24 24" style={{ marginLeft: 'auto' }}>
        <Path
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          stroke={colors.gray300}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Pressable>
  );
}

// ─── Styles ────────────────────────────────────────────────────────

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: borderRadius['3xl'],
    borderTopRightRadius: borderRadius['3xl'],
    maxHeight: '70%',
    ...shadows.xl,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray300,
    marginTop: spacing[3],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.cream200,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cream200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
  },
  center: {
    paddingVertical: spacing[10],
    alignItems: 'center',
  },
  errorBox: {
    padding: spacing[6],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(192,57,43,0.1)',
    backgroundColor: 'rgba(192,57,43,0.05)',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.cream200,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
  },
});

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[4],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.cream200,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: spacing[3],
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.cream100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing[1],
    paddingVertical: 2,
    ...shadows.sm,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '800',
    backgroundColor: colors.success,
    color: colors.white,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    gap: spacing[1],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
});
