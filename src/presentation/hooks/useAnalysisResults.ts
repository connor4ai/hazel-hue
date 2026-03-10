import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import type { Analysis } from '@domain/analysis/entities/Analysis';

interface PaletteColor {
  hex: string;
  name: string;
}

export interface AnalysisResult extends Analysis {
  palette?: {
    signatureColor: PaletteColor;
    neutrals: PaletteColor[];
    statements: PaletteColor[];
    accents: PaletteColor[];
  };
  colorStory?: {
    narrative: string;
    poeticOneLiner: string;
    keyTraits: { label: string; description: string }[];
  };
  styleGuide?: {
    outfits: {
      name: string;
      description: string;
      pieces: { item: string; color: PaletteColor }[];
    }[];
    bestPatterns: string[];
    bestFabrics: string[];
    patternsToAvoid: string[];
  };
  makeup?: {
    foundationTone: string;
    lipColors: PaletteColor[];
    eyeShadows: PaletteColor[];
    blushColors: PaletteColor[];
    yourRed: PaletteColor;
  };
  hair?: {
    bestColors: PaletteColor[];
    colorsToAvoid: PaletteColor[];
    highlightRecommendation: string;
    lowlightRecommendation: string;
    salonTerminology: string[];
  };
  jewelry?: {
    bestMetals: string[];
    metalsToMinimize: string[];
    gemstoneRecommendations: string[];
  };
  siblings?: {
    celebrities: { name: string; description: string }[];
  };
  avoid?: {
    colorsToAvoid: { hex: string; name: string; reason: string }[];
  };
}

export function useAnalysisResults(analysisId: string) {
  return useQuery<AnalysisResult>({
    queryKey: ['analysis', analysisId],
    queryFn: () =>
      apiClient.get<AnalysisResult>(endpoints.analysis.getById(analysisId)),
    enabled: !!analysisId,
    staleTime: Infinity, // Results don't change once completed
  });
}
