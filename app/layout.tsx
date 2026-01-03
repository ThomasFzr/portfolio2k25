import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LockProvider } from "@/components/LockProvider";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Thomas Foltzer - Développeur Full Stack",
  description: "Portfolio sobre et épuré de Thomas Foltzer, développeur Full Stack",
  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: 'any' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Thomas Foltzer - Développeur Full Stack",
    description: "Portfolio sobre et épuré de Thomas Foltzer, développeur Full Stack",
    url: "https://thomasfoltzer.com",
    siteName: "Thomas Foltzer",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thomas Foltzer - Développeur Full Stack',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Thomas Foltzer - Développeur Full Stack",
    description: "Portfolio sobre et épuré de Thomas Foltzer, développeur Full Stack",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={anton.variable}>
      <body className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var initialTheme = theme || systemTheme;
                  if (initialTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#000000';
                  } else {
                    document.documentElement.style.backgroundColor = '#fbfbfd';
                  }
                  // Forcer le style de la Dynamic Island à toujours être noire
                  var style = document.createElement('style');
                  style.textContent = 'nav[class*="animate-dynamic-island"] { background-color: rgba(0, 0, 0, 0.8) !important; border-color: rgba(255, 255, 255, 0.1) !important; }';
                  document.head.appendChild(style);
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <LockProvider>
            {children}
          </LockProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}






