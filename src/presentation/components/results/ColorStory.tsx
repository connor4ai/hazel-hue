import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface ColorStoryData {
  narrative: string;
  poeticOneLiner: string;
  keyTraits: { label: string; description: string }[];
}

interface ColorStoryProps {
  colorStory: ColorStoryData;
}

export function ColorStory({ colorStory }: ColorStoryProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Your Color Story" />
      <OrganicCard variant="subtle">
        <Typography variant="body" color={colors.gray500}>
          {colorStory.narrative}
        </Typography>
        {colorStory.keyTraits.length > 0 && (
          <View style={styles.traits}>
            {colorStory.keyTraits.map((trait, i) => (
              <View key={i} style={styles.traitRow}>
                <Typography variant="label" color={colors.hazel}>
                  {trait.label}
                </Typography>
                <Typography variant="bodySmall" color={colors.gray500}>
                  {trait.description}
                </Typography>
              </View>
            ))}
          </View>
        )}
      </OrganicCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  traits: {
    gap: spacing[3],
    marginTop: spacing[4],
  },
  traitRow: {
    gap: spacing[1],
  },
});
