import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blogPosts";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article non trouvé - Blog de Thomas Foltzer",
    };
  }

  const url = `https://www.thomasfoltzer.com/blog/${post.slug}`;

  return {
    title: `${post.title} - Blog de Thomas Foltzer`,
    description: post.description,
    openGraph: {
      title: `${post.title} - Blog de Thomas Foltzer`,
      description: post.description,
      url,
      type: "article",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <>
        <Header disableLock initialActiveSection="blog" trackSections={false} />
        <main className="min-h-screen bg-[#fbfbfd] dark:bg-[#0a0a0a] pt-24 pb-24 px-8 md:px-12">
          <section className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-anton text-gray-900 dark:text-white mb-4">
              Article introuvable
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              L&apos;article que vous recherchez n&apos;existe pas ou plus.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-apple"
            >
              Retour au blog
            </Link>
          </section>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <Header disableLock initialActiveSection="blog" trackSections={false} />
      <main className="min-h-screen bg-[#fbfbfd] dark:bg-[#0a0a0a] pt-24 pb-24 px-8 md:px-12 transition-colors duration-300">
        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="mx-2">•</span>
              <span>{post.readingTime} de lecture</span>
            </p>
            <h1 className="text-4xl md:text-5xl font-anton text-gray-900 dark:text-white tracking-tight mb-4">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none leading-relaxed">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:underline hover:underline-offset-4"
            >
              ← Retour aux articles
            </Link>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}


