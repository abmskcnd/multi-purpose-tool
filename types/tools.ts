// Tool Categories
export type ToolCategory = 
  | 'image' 
  | 'pdf' 
  | 'text' 
  | 'developer' 
  | 'security'
  | 'video'
  | 'audio';

// Localized String Type
export interface LocalizedString {
  en: string;
  vi: string;
  es: string;
  zh: string;
  ja: string;
}

// Tool Configuration
export interface Tool {
  id: string;
  slug: string;
  icon: string;
  category: ToolCategory;
  name: LocalizedString;
  description: LocalizedString;
  keywords: string[];
  isPopular?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  processorId?: string;
}

// Conversion Route
export interface ConversionRoute {
  source: string;
  target: string;
  processorId: string;
}

// Analytics Event
export interface TrackEvent {
  name: string;
  params?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

// File Validation Result
export interface ValidationResult {
  valid: boolean;
  error?: string;
  fileInfo?: {
    name: string;
    size: number;
    type: string;
    extension: string;
  };
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User Preferences
export interface UserPreferences {
  locale: string;
  theme: 'light' | 'dark' | 'system';
  recentTools: string[];
}
