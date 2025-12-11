'use client';

import { useAppStore } from '@/store/use-app-store';
import { getFeatureFlags } from '@/config/features.config';

export function useFeatureFlag(flagName: string): boolean {
  const clientFeatures = useAppStore((state) => state.features);
  const serverFeatures = getFeatureFlags();
  
  // Client override takes precedence
  if (flagName in clientFeatures) {
    return clientFeatures[flagName];
  }
  
  // Fall back to server config
  return serverFeatures[flagName as keyof typeof serverFeatures] ?? false;
}
