import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '../components/Providers';
import loadSession from '@/lib/load-session';
import AuthChangeListener from '../components/AuthChangeListener';
import UserSessionProvider from '@/components/UserSessionProvider';
import { permanentRedirect, redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const runtime = 'edge';

export const metadata = {
  metadataBase: new URL('https://rapiddrafts.com'),
  title: 'Rapid Drafts | AI-Powered Content Creation for Marketing Agencies',
  description:
    'Rapid Drafts is an advanced AI content assistant designed for digital marketing agencies. Generate high-quality blog posts, articles, and marketing copy in minutes. Scale your content production, impress clients, and boost ROI.',
  keywords:
    'AI content creation, marketing agency tools, content automation, blog writing assistant, SEO content generator, digital marketing software',
  openGraph: {
    title: 'Rapid Drafts | AI Content Creation for Marketing Agencies',
    description:
      'Scale your content production with AI-powered drafts. Perfect for digital marketing agencies and content creators.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Rapid Drafts AI Content Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rapid Drafts | AI-Powered Content for Agencies',
    description:
      'Revolutionize your content creation process with AI. Ideal for marketing agencies and professionals.',
    images: ['/og.png'],
  },
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
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await loadSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://rapiddrafts.com" />
        <meta name="author" content="Rapid Drafts" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <AuthChangeListener user={user} redirectTo="/">
          <UserSessionProvider user={user}>
            <Providers>{children}</Providers>
          </UserSessionProvider>
        </AuthChangeListener>
      </body>
    </html>
  );
}
