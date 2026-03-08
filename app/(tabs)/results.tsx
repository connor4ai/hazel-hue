import React from 'react';
import { View, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { Button } from '@presentation/components/ui/Button';
import { useAuthStore } from '@presentation/stores/useAuthStore';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import { getSeasonDisplayName, type Season } from '@domain/shared/types/Season';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface AnalysisSummary {
  id: string;
  status: string;
  season?: string;
  createdAt: string;
  completedAt?: string;
}

function useUserAnalyses() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery<AnalysisSummary[]>({
    queryKey: ['analyses'],
    queryFn: () => apiClient.get<AnalysisSummary[]>(endpoints.analysis.list),
    enabled: isAuthenticated,
  });
}

export default function ResultsListScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: analyses, isLoading } = useUserAnalyses();

  const completedAnalyses = analyses?.filter((a) => a.status === 'COMPLETED') ?? [];

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <HandLetterHeading title="Your Results" subtitle="Past color analyses" />
        </View>

        {!isAuthenticated ? (
          <View style={styles.empty}>
            <Typography variant="body" color={colors.gray400} align="center">
              Sign in to see your past analyses.
            </Typography>
            <Button
              variant="primary"
              size="md"
              onPress={() => router.push('/(auth)/sign-in')}
            >
              Sign In
            </Button>
          </View>
        ) : isLoading ? (
          <View style={styles.empty}>
            <ActivityIndicator size="large" color={colors.hazel} />
          </View>
        ) : completedAnalyses.length === 0 ? (
          <View style={styles.empty}>
            <Typography variant="body" color={colors.gray400} align="center">
              No analyses yet. Start your first color analysis to see your
              results here.
            </Typography>
            <Button
              variant="primary"
              size="md"
              onPress={() => router.push('/analysis/onboard')}
            >
              Get My Colors
            </Button>
          </View>
        ) : (
          <FlatList
            data={completedAnalyses}
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={() => router.push(`/analysis/${item.id}`)}>
                <OrganicCard variant="subtle">
                  <Typography variant="h3" color={colors.hazel}>
                    {item.season ? getSeasonDisplayName(item.season as Season) : 'Analysis'}
                  </Typography>
                  <Typography variant="caption" color={colors.gray400}>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Typography>
                </OrganicCard>
              </Pressable>
            )}
          />
        )}
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: spacing[6], paddingTop: spacing[12] },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[8],
    gap: spacing[4],
  },
  list: { padding: spacing[6], gap: spacing[4] },
});
