import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Thomas Foltzer",
  description: "Articles autour du développement web, des portfolios et de la création d'expériences numériques efficaces.",
  alternates: {
    canonical: 'https://www.thomasfoltzer.com/blog',
  },
  openGraph: {
    title: "Blog - Thomas Foltzer",
    description: "Articles autour du développement web, des portfolios et de la création d'expériences numériques efficaces.",
    url: "https://www.thomasfoltzer.com/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
