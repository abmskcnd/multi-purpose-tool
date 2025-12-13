import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // User Preferences
  locale: string;
  theme: 'light' | 'dark' | 'system';
  
  // Recent Tools
  recentTools: string[];
  
  // Feature Flags (client-side overrides)
  features: Record<string, boolean>;
  
  // Actions
  setLocale: (locale: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addRecentTool: (toolId: string) => void;
  toggleFeature: (name: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial State
      locale: 'en',
      theme: 'system',
      recentTools: [],
      features: {},

      // Actions
      setLocale: (locale) => set({ locale }),
      
      setTheme: (theme) => set({ theme }),
      
      addRecentTool: (toolId) =>
        set((state) => ({
          recentTools: [
            toolId,
            ...state.recentTools.filter((id) => id !== toolId),
          ].slice(0, 10), // Keep only last 10
        })),
      
      toggleFeature: (name) =>
        set((state) => ({
          features: {
            ...state.features,
            [name]: !state.features[name],
          },
        })),
    }),
    {
      name: 'vibetool-storage',
      partialize: (state) => ({
        locale: state.locale,
        theme: state.theme,
        recentTools: state.recentTools,
      }),
    }
  )
);
