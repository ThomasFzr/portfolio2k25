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
  title: "Portfolio",
  description: "Portfolio sobre et épuré",
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






