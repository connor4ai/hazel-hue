/**
 * ShopFeedSection — React Native "Shop Your Colors" section.
 *
 * A scrollable category-based product feed for the mobile results experience.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Image,
  Linking,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing, borderRadius } from '@presentation/theme/spacing';
import {
  useProductFeed,
  trackProductClick,
  formatPrice,
  type ShoppableProduct,
  type ProductCategory,
} from '@presentation/hooks/useShoppingApi';

interface PaletteColor {
  hex: string;
  name: string;
}

interface ShopFeedSectionProps {
  season: string;
  palette: PaletteColor[];
  analysisId?: string;
}

const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: 'clothing', label: 'Clothing' },
  { key: 'makeup', label: 'Makeup' },
  { key: 'jewelry', label: 'Jewelry' },
  { key: 'nails', label: 'Nails' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'hair', label: 'Hair' },
];

export function ShopFeedSection({ season, palette, analysisId }: ShopFeedSectionProps) {
  const paletteHexes = palette.map((c) => c.hex);
  const { feeds, loadCategory } = useProductFeed(season, paletteHexes);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('clothing');

  useEffect(() => {
    loadCategory(activeCategory);
  }, [activeCategory, loadCategory]);

  const handleProductPress = useCallback(
    (product: ShoppableProduct) => {
      if (analysisId) {
        trackProductClick({
          analysisId,
          productId: product.id,
          merchantName: product.merchantName,
          clickSource: 'shop_tab',
          category: product.category,
          matchScore: product.matchScore,
        });
      }
      Linking.openURL(product.merchantUrl);
    },
    [analysisId],
  );

  const currentFeed = feeds[activeCategory];

  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="Shop Your Colors"
        subtitle="Products matched to your palette"
      />

      {/* Palette strip */}
      <OrganicCard variant="subtle">
        <Typography variant="caption" color={colors.gray400} style={{ letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: spacing[2] }}>
          Your Palette
        </Typography>
        <View style={styles.paletteStrip}>
          {palette.slice(0, 12).map((color) => (
            <View
              key={color.hex}
              style={[styles.paletteDot, { backgroundColor: color.hex }]}
            />
          ))}
        </View>
      </OrganicCard>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() => setActiveCategory(key)}
            style={[
              styles.categoryPill,
              activeCategory === key && styles.categoryPillActive,
            ]}
          >
            <Typography
              variant="caption"
              color={activeCategory === key ? colors.white : colors.gray500}
              style={{ fontWeight: '700' }}
            >
              {label}
            </Typography>
          </Pressable>
        ))}
      </ScrollView>

      {/* Products */}
      {currentFeed.loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.hazel} />
        </View>
      )}

      {currentFeed.error && (
        <OrganicCard variant="subtle">
          <Typography variant="body" color={colors.error} align="center">
            Couldn't load products right now.
          </Typography>
          <Pressable onPress={() => loadCategory(activeCategory)} style={styles.retryButton}>
            <Typography variant="caption" color={colors.hazel} style={{ fontWeight: '700' }}>
              Try again
            </Typography>
          </Pressable>
        </OrganicCard>
      )}

      {!currentFeed.loading && !currentFeed.error && currentFeed.products.length === 0 && (
        <OrganicCard variant="subtle">
          <Typography variant="body" color={colors.gray400} align="center">
            No products available yet.
          </Typography>
        </OrganicCard>
      )}

      {!currentFeed.loading && !currentFeed.error && currentFeed.products.map((product) => (
        <ShopProductCard
          key={product.id}
          product={product}
          onPress={() => handleProductPress(product)}
        />
      ))}

    </View>
  );
}

// ─── Product Card ──────────────────────────────────────────────────

function ShopProductCard({
  product,
  onPress,
}: {
  product: ShoppableProduct;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }]}
    >
      <OrganicCard variant="elevated">
        <View style={cardStyles.container}>
          {/* Image */}
          <View style={cardStyles.imageContainer}>
            {product.imageUrl ? (
              <Image
                source={{ uri: product.imageUrl }}
                style={cardStyles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={cardStyles.placeholder} />
            )}
            {/* Match pill */}
            <View style={[
              cardStyles.matchPill,
              { backgroundColor: product.matchScore >= 80 ? colors.success : product.matchScore >= 60 ? colors.warning : colors.gray400 },
            ]}>
              <View style={[cardStyles.matchDot, { backgroundColor: product.matchedPaletteHex }]} />
              <Typography variant="caption" color={colors.white} style={cardStyles.matchText}>
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
        </View>
      </OrganicCard>
    </Pressable>
  );
}

// ─── Styles ────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  paletteStrip: {
    flexDirection: 'row',
    gap: spacing[1],
  },
  paletteDot: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.md,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  categoryScroll: {
    gap: spacing[2],
    paddingVertical: spacing[1],
  },
  categoryPill: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.cream200,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  categoryPillActive: {
    backgroundColor: colors.hazel,
    borderColor: colors.hazel,
  },
  loadingContainer: {
    paddingVertical: spacing[10],
    alignItems: 'center',
  },
  retryButton: {
    marginTop: spacing[3],
    alignSelf: 'center',
  },
});

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.cream100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.cream200,
  },
  matchPill: {
    position: 'absolute',
    top: spacing[1],
    left: spacing[1],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  matchDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  matchText: {
    fontSize: 9,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    gap: spacing[2],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
});
