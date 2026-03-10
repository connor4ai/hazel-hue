import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Contact } from 'expo-contacts';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { useAnalysisStore } from '@presentation/stores/useAnalysisStore';
import { useShareGate } from '@presentation/hooks/usePurchase';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';
import { REQUIRED_SHARES_TO_UNLOCK } from '@config/constants';

export default function ShareToUnlockScreen() {
  const router = useRouter();
  const startAnalysis = useAnalysisStore((s) => s.startAnalysis);
  const {
    isUnlocked,
    shares,
    remainingShares,
    contacts,
    isLoadingContacts,
    isSharing,
    error,
    loadContacts,
    shareWith,
  } = useShareGate();

  // Load contacts when screen mounts
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // When unlocked, start analysis and navigate
  const handleContinue = async () => {
    try {
      await startAnalysis();
      router.replace('/analysis/processing');
    } catch {
      // Error handled by store
    }
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactRow}
      onPress={() => shareWith(item)}
      disabled={isSharing}
      activeOpacity={0.7}
    >
      <View style={styles.contactAvatar}>
        <Typography variant="label" color={colors.cream100}>
          {(item.firstName?.[0] ?? item.name?.[0] ?? '?').toUpperCase()}
        </Typography>
      </View>
      <View style={styles.contactInfo}>
        <Typography variant="body" color={colors.charcoal}>
          {item.name}
        </Typography>
        <Typography variant="caption" color={colors.gray400}>
          {item.phoneNumbers?.[0]?.number ?? item.emails?.[0]?.email ?? ''}
        </Typography>
      </View>
      <Typography variant="label" color={colors.hazel}>
        Share
      </Typography>
    </TouchableOpacity>
  );

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <HandLetterHeading
            title="Share to Unlock"
            subtitle="Tell 2 friends, get your colors free"
          />

          <BotanicalDivider variant="vine" />

          {/* Progress indicator */}
          <OrganicCard variant="elevated">
            <View style={styles.progressSection}>
              <Typography variant="h2" color={colors.hazel} align="center">
                {shares.length} / {REQUIRED_SHARES_TO_UNLOCK}
              </Typography>
              <Typography variant="bodySmall" color={colors.gray500} align="center">
                {isUnlocked
                  ? "You're all set! Your analysis is unlocked."
                  : `Share with ${remainingShares} more ${remainingShares === 1 ? 'friend' : 'friends'} to unlock your free color analysis`}
              </Typography>

              {/* Progress dots */}
              <View style={styles.progressDots}>
                {Array.from({ length: REQUIRED_SHARES_TO_UNLOCK }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i < shares.length ? styles.dotFilled : styles.dotEmpty,
                    ]}
                  />
                ))}
              </View>

              {/* Shared contacts */}
              {shares.map((share) => (
                <View key={share.contactId} style={styles.sharedRow}>
                  <Typography variant="caption" color={colors.sage}>
                    {'\u2713'}
                  </Typography>
                  <Typography variant="bodySmall" color={colors.gray500}>
                    Shared with {share.contactName}
                  </Typography>
                </View>
              ))}
            </View>
          </OrganicCard>

          {error && (
            <View style={styles.errorBox}>
              <Typography variant="bodySmall" color={colors.error}>
                {error}
              </Typography>
            </View>
          )}

          {isUnlocked ? (
            <View style={styles.cta}>
              <Button size="lg" onPress={handleContinue}>
                Get My Colors — Free
              </Button>
            </View>
          ) : (
            <View style={styles.contactList}>
              <Typography variant="label" color={colors.charcoal}>
                Choose friends to share with
              </Typography>
              <FlatList
                data={contacts}
                keyExtractor={(item) => (item as { id?: string }).id ?? item.name ?? ''}
                renderItem={renderContact}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                ListEmptyComponent={
                  isLoadingContacts ? (
                    <Typography variant="bodySmall" color={colors.gray400} align="center">
                      Loading your contacts...
                    </Typography>
                  ) : (
                    <Typography variant="bodySmall" color={colors.gray400} align="center">
                      No contacts found. Please grant contacts access.
                    </Typography>
                  )
                }
              />
            </View>
          )}
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
    paddingTop: spacing[8],
    gap: spacing[4],
  },
  progressSection: {
    alignItems: 'center',
    gap: spacing[3],
  },
  progressDots: {
    flexDirection: 'row',
    gap: spacing[3],
    marginTop: spacing[2],
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dotFilled: {
    backgroundColor: colors.hazel,
  },
  dotEmpty: {
    backgroundColor: colors.cream200,
    borderWidth: 1.5,
    borderColor: colors.hazel,
  },
  sharedRow: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: spacing[3],
  },
  cta: {
    alignItems: 'center',
    gap: spacing[3],
    paddingTop: spacing[2],
  },
  contactList: {
    flex: 1,
    gap: spacing[3],
  },
  list: {
    flex: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0E8DC',
    gap: spacing[3],
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.hazel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    gap: 2,
  },
});
