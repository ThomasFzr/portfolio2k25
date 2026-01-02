"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <main className="min-h-screen relative bg-[#fbfbfd] dark:bg-black overflow-hidden transition-colors duration-300">
      <Header />
      
      {/* Section Hero */}
      <section id="home" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-12">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="w-full space-y-6 md:space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-anton text-gray-900 dark:text-white leading-[1.05] tracking-tight transition-colors duration-300">
                THOMAS FOLTZER
              </h1>
              
              <p className="mt-8 md:mt-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-xl md:text-2xl leading-relaxed font-light transition-colors duration-300">
                Créateur d&apos;expériences digitales exceptionnelles
              </p>
            </div>
          </div>
        </div>

        {/* Indicateur de défilement */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={handleScrollDown}
            className="w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-400 dark:hover:border-white/40 hover:bg-gray-50 dark:hover:bg-white/5 transition-apple group"
            aria-label="Défiler vers le bas"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-white/70 group-hover:translate-y-1 transition-apple"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Section Portfolio */}
      <section 
        id="work" 
        className="min-h-screen relative py-32 px-8 md:px-12 bg-[#fbfbfd] dark:bg-black opacity-0 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-anton text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-300">
              Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto transition-colors duration-300">
              Une sélection de projets qui reflètent mon approche du design et du développement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Projet SportTracker */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-white/10 hover:shadow-2xl transition-apple">
              <div className="relative h-80 md:h-96 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/projects/sporttracker.png"
                  alt="Sport Tracker"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-apple"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Sport Tracker</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg font-light transition-colors duration-300">
                  Application mobile de suivi sportif pour gérer ses séances, suivre ses statistiques et défier ses amis.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    React Native
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    Mobile
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    UI/UX
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-apple text-sm"
                  >
                    Voir le projet
                  </a>
                  <a
                    href="#"
                    className="px-6 py-3 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/70 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-apple text-sm"
                  >
                    Code source
                  </a>
                </div>
              </div>
            </div>

            {/* Projet Maillemum.fr */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-white/10 hover:shadow-2xl transition-apple">
              <div className="relative h-80 md:h-96 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/projects/maillemum.png"
                  alt="Maille mum"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-apple"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Maillemum.fr</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg font-light transition-colors duration-300">
                  Site e-commerce pour articles tricotés à la main avec système de filtres, panier et backoffice admin. Paiement sécurisé avec Stripe.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    Next.js
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    Stripe
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    Backend
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    Admin
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-full font-light transition-colors duration-300">
                    E-commerce
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://maillemum.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-apple text-sm"
                  >
                    Visiter le site
                  </a>
                  <a
                    href="#"
                    className="px-6 py-3 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/70 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-apple text-sm"
                  >
                    Code source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section About */}
      <section 
        id="about" 
        className="min-h-screen relative py-32 px-8 md:px-12 bg-white dark:bg-black opacity-0 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-anton mb-12 text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
            À propos
          </h2>
          <div className="space-y-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light transition-colors duration-300">
            <p>
              Passionné par le design digital et la création d&apos;expériences
              exceptionnelles qui marquent les esprits.
            </p>
            <p>
              Mon approche allie esthétique sobre et performance technique pour
              offrir des solutions numériques qui inspirent la croissance et
              créent des connexions durables.
            </p>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section 
        id="contact" 
        className="min-h-screen relative py-32 px-8 md:px-12 bg-[#fbfbfd] dark:bg-black opacity-0 transition-colors duration-300"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-anton mb-12 text-gray-900 dark:text-white text-center tracking-tight transition-colors duration-300">
            Contact
          </h2>
          <form 
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              // Gérer la soumission du formulaire ici
            }}
          >
            <div className="group">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-6 py-4 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white/30 focus:ring-0 transition-apple text-lg font-light"
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-6 py-4 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white/30 focus:ring-0 transition-apple text-lg font-light"
              />
            </div>
            <div className="group">
              <textarea
                placeholder="Votre message"
                rows={6}
                className="w-full px-6 py-4 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white/30 focus:ring-0 transition-apple resize-none text-lg font-light"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-apple text-lg"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
