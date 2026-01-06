"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blogPosts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header disableLock initialActiveSection="blog" trackSections={false} />
      <main className="min-h-screen bg-[#fbfbfd] dark:bg-[#0a0a0a] pt-24 px-8 md:px-12 transition-colors duration-300">
        <section className="max-w-5xl mx-auto pb-20">
          <header className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-anton text-gray-900 dark:text-white tracking-tight">
              Blog
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Articles autour du développement web, des portfolios et de la création
              d&apos;expériences numériques efficaces.
            </p>
          </header>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-3xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-[#101010] p-6 md:p-8 transition-apple"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-light">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} de lecture</span>
                  </div>
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
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-light">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white transition-all"
                >
                  <span className="inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire l&apos;article
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <div className="pb-8">
          <Footer />
        </div>
      </main>
    </>
  );
}


