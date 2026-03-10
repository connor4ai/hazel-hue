import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

interface PaletteColor {
  hex: string;
  name: string;
}

interface PaletteData {
  signatureColor: PaletteColor;
  neutrals: PaletteColor[];
  statements: PaletteColor[];
  accents: PaletteColor[];
}

export function usePalette(analysisId: string) {
  return useQuery<PaletteData>({
    queryKey: ['palette', analysisId],
    queryFn: () =>
      apiClient.get<PaletteData>(endpoints.recommendation.palette(analysisId)),
    enabled: !!analysisId,
    staleTime: Infinity,
  });
}
