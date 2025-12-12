// Feature Flags Configuration

export interface FeatureFlags {
  enablePremiumFeatures: boolean;
  enableAdsense: boolean;
  enableAnalytics: boolean;
  enableBetaTools: boolean;
  enableDarkMode: boolean;
  enablePWA: boolean;
  maintenanceMode: boolean;
}

const defaultFeatures: FeatureFlags = {
  enablePremiumFeatures: false,
  enableAdsense: false,
  enableAnalytics: true,
  enableBetaTools: false,
  enableDarkMode: true,
  enablePWA: true,
  maintenanceMode: false,
};

export function getFeatureFlags(): FeatureFlags {
  return {
    enablePremiumFeatures: process.env.NEXT_PUBLIC_ENABLE_PREMIUM === 'true' || defaultFeatures.enablePremiumFeatures,
    enableAdsense: process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true' || defaultFeatures.enableAdsense,
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false',
    enableBetaTools: process.env.NEXT_PUBLIC_ENABLE_BETA === 'true' || defaultFeatures.enableBetaTools,
    enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
    enablePWA: process.env.NEXT_PUBLIC_ENABLE_PWA !== 'false',
    maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' || defaultFeatures.maintenanceMode,
  };
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[feature];
}
