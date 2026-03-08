import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function ResultsScreen() {
  const router = useRouter();

  // TODO: Fetch past analyses from API via TanStack Query
  const analyses: never[] = [];

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <HandLetterHeading title="Your Results" subtitle="Past color analyses" />
        </View>

        {analyses.length === 0 ? (
          <View style={styles.empty}>
            <Typography variant="body" color={colors.gray400} align="center">
              No analyses yet. Start your first color analysis to see your results here.
            </Typography>
          </View>
        ) : (
          <FlatList
            data={analyses}
            contentContainerStyle={styles.list}
            renderItem={() => null}
            keyExtractor={(_, i) => String(i)}
          />
        )}
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: spacing[6], paddingTop: spacing[12] },
  empty: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing[8] },
  list: { padding: spacing[6], gap: spacing[4] },
});
