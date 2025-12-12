import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | ToolHub',
    default: 'ToolHub - Free Online Tools',
  },
  description: 'Free online tools for image conversion, PDF manipulation, password generation, and more. 100% client-side processing.',
  keywords: ['online tools', 'free tools', 'image converter', 'pdf tools', 'password generator'],
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
    locale: 'en_US',
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
    <html>
      <body>{children}</body>
    </html>
  );
}
