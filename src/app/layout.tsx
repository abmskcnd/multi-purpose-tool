import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | ToolHub',
    default: 'ToolHub - Công Cụ Online Miễn Phí',
  },
  description: 'Công cụ online miễn phí cho chuyển đổi ảnh, xử lý PDF, tạo mật khẩu và nhiều hơn nữa. Xử lý 100% phía client.',
  keywords: ['công cụ online', 'free tools', 'chuyển đổi ảnh', 'pdf tools', 'tạo mật khẩu'],
  authors: [{ name: 'ToolHub Team' }],
  creator: 'ToolHub',
  publisher: 'ToolHub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'ToolHub',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
