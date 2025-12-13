// Application Constants

export const APP_CONFIG = {
  name: 'Vibetool',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://vibetool.com',
  description: 'Free online tools for image conversion, PDF manipulation, password generation, and more.',
};

export const SUPPORTED_LOCALES = ['en', 'vi', 'es', 'zh', 'ja'] as const;
export const DEFAULT_LOCALE = 'en';

export const FILE_SIZE_LIMITS = {
  image: 50 * 1024 * 1024, // 50MB
  pdf: 100 * 1024 * 1024, // 100MB
  video: 500 * 1024 * 1024, // 500MB
  default: 25 * 1024 * 1024, // 25MB
};

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/heic',
  'image/heif',
];

export const ALLOWED_PDF_TYPES = ['application/pdf'];

export const TOOL_CATEGORIES = [
  { id: 'image', icon: '🖼️', color: 'blue' },
  { id: 'pdf', icon: '📄', color: 'red' },
  { id: 'text', icon: '📝', color: 'green' },
  { id: 'developer', icon: '💻', color: 'purple' },
  { id: 'security', icon: '🔒', color: 'yellow' },
  { id: 'video', icon: '🎬', color: 'pink' },
  { id: 'audio', icon: '🎵', color: 'orange' },
] as const;

export const ANALYTICS_EVENTS = {
  TOOL_VIEW: 'tool_view',
  TOOL_USE: 'tool_use',
  TOOL_COMPLETE: 'tool_complete',
  TOOL_ERROR: 'tool_error',
  FILE_UPLOAD: 'file_upload',
  FILE_DOWNLOAD: 'file_download',
  LANGUAGE_CHANGE: 'language_change',
} as const;
