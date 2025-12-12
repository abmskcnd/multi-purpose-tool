import { FILE_SIZE_LIMITS, ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPES } from '@/config/constants';
import { ValidationResult } from '@/types/tools';

// Magic bytes for file type detection
const FILE_SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46], [0x57, 0x45, 0x42, 0x50]], // RIFF...WEBP
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
};

function detectFileType(bytes: Uint8Array): string {
  for (const [type, signatures] of Object.entries(FILE_SIGNATURES)) {
    for (const signature of signatures) {
      const match = signature.every((byte, index) => bytes[index] === byte);
      if (match) return type;
    }
  }
  return 'unknown';
}

export async function validateFile(
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): Promise<ValidationResult> {
  // 1. Check file exists
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // 2. Check file size
  const maxSize = options.maxSize ?? FILE_SIZE_LIMITS.default;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${Math.round(maxSize / 1024 / 1024)}MB`,
    };
  }

  // 3. Check extension
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  if (options.allowedExtensions && !options.allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Invalid file extension. Allowed: ${options.allowedExtensions.join(', ')}`,
    };
  }

  // 4. Validate magic bytes for security
  if (options.allowedTypes && options.allowedTypes.length > 0) {
    const arrayBuffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const actualType = detectFileType(bytes);

    if (!options.allowedTypes.includes(actualType) && actualType !== 'unknown') {
      return {
        valid: false,
        error: `Invalid file type detected. File appears to be ${actualType}`,
      };
    }
  }

  return {
    valid: true,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type,
      extension,
    },
  };
}

export async function validateImageFile(file: File): Promise<ValidationResult> {
  return validateFile(file, {
    maxSize: FILE_SIZE_LIMITS.image,
    allowedTypes: ALLOWED_IMAGE_TYPES,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'heic', 'heif'],
  });
}

export async function validatePDFFile(file: File): Promise<ValidationResult> {
  return validateFile(file, {
    maxSize: FILE_SIZE_LIMITS.pdf,
    allowedTypes: ALLOWED_PDF_TYPES,
    allowedExtensions: ['pdf'],
  });
}
