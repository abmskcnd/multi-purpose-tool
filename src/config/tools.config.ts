import { Tool, ConversionRoute } from '@/types/tools';

// Tool Registry
export const tools: Tool[] = [
  {
    id: 'password-generator',
    slug: 'password-generator',
    icon: '🔐',
    category: 'security',
    name: {
      en: 'Password Generator',
      vi: 'Tạo Mật Khẩu',
      es: 'Generador de Contraseñas',
      zh: '密码生成器',
      ja: 'パスワードジェネレーター',
    },
    description: {
      en: 'Generate secure, random passwords instantly',
      vi: 'Tạo mật khẩu ngẫu nhiên, bảo mật ngay lập tức',
      es: 'Genera contraseñas seguras y aleatorias al instante',
      zh: '即时生成安全随机密码',
      ja: '安全でランダムなパスワードを即座に生成',
    },
    keywords: ['password', 'generator', 'security', 'random'],
    isPopular: true,
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    icon: '📱',
    category: 'text',
    name: {
      en: 'QR Code Generator',
      vi: 'Tạo Mã QR',
      es: 'Generador de Códigos QR',
      zh: '二维码生成器',
      ja: 'QRコードジェネレーター',
    },
    description: {
      en: 'Create QR codes for any text or URL',
      vi: 'Tạo mã QR cho bất kỳ văn bản hoặc URL',
      es: 'Crea códigos QR para cualquier texto o URL',
      zh: '为任何文本或URL创建二维码',
      ja: 'テキストやURLのQRコードを作成',
    },
    keywords: ['qr', 'code', 'generator', 'url'],
    isPopular: true,
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    icon: '🖼️',
    category: 'image',
    name: {
      en: 'Image Converter',
      vi: 'Chuyển Đổi Ảnh',
      es: 'Convertidor de Imágenes',
      zh: '图像转换器',
      ja: '画像コンバーター',
    },
    description: {
      en: 'Convert images between formats (JPG, PNG, WebP, AVIF)',
      vi: 'Chuyển đổi ảnh giữa các định dạng (JPG, PNG, WebP, AVIF)',
      es: 'Convierte imágenes entre formatos (JPG, PNG, WebP, AVIF)',
      zh: '在格式之间转换图像（JPG、PNG、WebP、AVIF）',
      ja: '画像フォーマット間の変換（JPG、PNG、WebP、AVIF）',
    },
    keywords: ['image', 'converter', 'jpg', 'png', 'webp', 'avif'],
    isPopular: true,
    processorId: 'image-converter',
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    icon: '📦',
    category: 'image',
    name: {
      en: 'Image Compressor',
      vi: 'Nén Ảnh',
      es: 'Compresor de Imágenes',
      zh: '图像压缩器',
      ja: '画像圧縮ツール',
    },
    description: {
      en: 'Compress images without losing quality',
      vi: 'Nén ảnh mà không mất chất lượng',
      es: 'Comprime imágenes sin perder calidad',
      zh: '压缩图像而不损失质量',
      ja: '品質を損なわずに画像を圧縮',
    },
    keywords: ['image', 'compress', 'optimize', 'reduce'],
    isPopular: true,
    processorId: 'image-compressor',
  },
  {
    id: 'pdf-merger',
    slug: 'pdf-merger',
    icon: '📄',
    category: 'pdf',
    name: {
      en: 'PDF Merger',
      vi: 'Gộp PDF',
      es: 'Fusionar PDF',
      zh: 'PDF合并',
      ja: 'PDF結合',
    },
    description: {
      en: 'Merge multiple PDF files into one',
      vi: 'Gộp nhiều file PDF thành một',
      es: 'Fusiona múltiples archivos PDF en uno',
      zh: '将多个PDF文件合并为一个',
      ja: '複数のPDFファイルを1つに結合',
    },
    keywords: ['pdf', 'merge', 'combine', 'join'],
    isPopular: true,
    processorId: 'pdf-merger',
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    icon: '{ }',
    category: 'developer',
    name: {
      en: 'JSON Formatter',
      vi: 'Định Dạng JSON',
      es: 'Formateador JSON',
      zh: 'JSON格式化',
      ja: 'JSONフォーマッター',
    },
    description: {
      en: 'Format and validate JSON data',
      vi: 'Định dạng và xác thực dữ liệu JSON',
      es: 'Formatea y valida datos JSON',
      zh: '格式化和验证JSON数据',
      ja: 'JSONデータのフォーマットと検証',
    },
    keywords: ['json', 'format', 'validate', 'beautify'],
    isNew: true,
  },
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    icon: '🔤',
    category: 'developer',
    name: {
      en: 'Base64 Encoder/Decoder',
      vi: 'Mã Hóa/Giải Mã Base64',
      es: 'Codificador/Decodificador Base64',
      zh: 'Base64编码/解码',
      ja: 'Base64エンコーダー/デコーダー',
    },
    description: {
      en: 'Encode or decode Base64 strings',
      vi: 'Mã hóa hoặc giải mã chuỗi Base64',
      es: 'Codifica o decodifica cadenas Base64',
      zh: '编码或解码Base64字符串',
      ja: 'Base64文字列のエンコードまたはデコード',
    },
    keywords: ['base64', 'encode', 'decode', 'convert'],
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    icon: '#️⃣',
    category: 'security',
    name: {
      en: 'Hash Generator',
      vi: 'Tạo Hash',
      es: 'Generador de Hash',
      zh: '哈希生成器',
      ja: 'ハッシュジェネレーター',
    },
    description: {
      en: 'Generate MD5, SHA-1, SHA-256 hashes',
      vi: 'Tạo hash MD5, SHA-1, SHA-256',
      es: 'Genera hashes MD5, SHA-1, SHA-256',
      zh: '生成MD5、SHA-1、SHA-256哈希',
      ja: 'MD5、SHA-1、SHA-256ハッシュを生成',
    },
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'security'],
  },
];

// Conversion Matrix for Programmatic SEO
export const conversionMatrix: ConversionRoute[] = [
  { source: 'jpg', target: 'png', processorId: 'image-converter' },
  { source: 'jpg', target: 'webp', processorId: 'image-converter' },
  { source: 'jpg', target: 'avif', processorId: 'image-converter' },
  { source: 'png', target: 'jpg', processorId: 'image-converter' },
  { source: 'png', target: 'webp', processorId: 'image-converter' },
  { source: 'png', target: 'avif', processorId: 'image-converter' },
  { source: 'webp', target: 'jpg', processorId: 'image-converter' },
  { source: 'webp', target: 'png', processorId: 'image-converter' },
  { source: 'heic', target: 'jpg', processorId: 'image-converter' },
  { source: 'heic', target: 'png', processorId: 'image-converter' },
];

// Helper Functions
export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((tool) => tool.isPopular);
}

export function getAllTools(): Tool[] {
  return tools;
}

export function getNewTools(): Tool[] {
  return tools.filter((tool) => tool.isNew);
}

export function getAllConversionRoutes(): ConversionRoute[] {
  return conversionMatrix;
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.en.toLowerCase().includes(lowerQuery) ||
      tool.description.en.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
  );
}
