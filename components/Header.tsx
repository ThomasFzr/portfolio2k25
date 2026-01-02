"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isUnlocked, setIsUnlocked] = useState(false);
  // Initialiser avec la détection immédiate du thème
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
             localStorage.getItem('theme') === 'dark' ||
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const { theme, toggleTheme } = useTheme();

  // Détecter le thème initial immédiatement pour éviter le flash blanc
  useEffect(() => {
    // Vérifier le thème dès le montage
    const checkInitialTheme = () => {
      if (typeof window !== 'undefined') {
        const html = document.documentElement;
        const isDarkMode = html.classList.contains('dark') || 
                          localStorage.getItem('theme') === 'dark' ||
                          (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(isDarkMode);
      }
    };
    
    checkInitialTheme();
    
    // Observer les changements de classe dark sur html
    const observer = new MutationObserver(() => {
      if (typeof window !== 'undefined') {
        setIsDark(document.documentElement.classList.contains('dark'));
      }
    });
    
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
    
    return () => observer.disconnect();
  }, []);

  // Synchroniser avec le thème du ThemeProvider
  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  // Animation de déverrouillage au premier chargement
  useEffect(() => {
    // Vérifier si l'animation a déjà été jouée
    const hasAnimated = sessionStorage.getItem("dynamicIslandUnlocked");
    
    if (!hasAnimated) {
      // Démarrer l'animation après un court délai pour permettre le rendu initial
      const timer = requestAnimationFrame(() => {
        setTimeout(() => {
          setIsUnlocked(true);
          sessionStorage.setItem("dynamicIslandUnlocked", "true");
        }, 100);
      });
      
      return () => cancelAnimationFrame(timer);
    } else {
      // Si déjà animé, afficher directement sans délai
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détecter la section active
      const sections = ["home", "work", "about", "contact"];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Appel initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Accueil", href: "#home", id: "home" },
    { name: "Portfolio", href: "#work", id: "work" },
    { name: "À propos", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-3 md:top-4 left-0 right-0 z-50 flex items-center justify-center px-3 md:px-8 pointer-events-none">
        {/* Dynamic Island au centre avec tous les boutons */}
        <nav
          className={`
            pointer-events-auto
            relative flex items-center justify-center
            backdrop-blur-2xl
            border
            ${isUnlocked 
              ? "animate-dynamic-island-unlock" 
              : "animate-dynamic-island-locked"
            }
            whitespace-nowrap
            ${isScrolled ? "px-4 py-2 md:px-6 md:py-2.5 shadow-2xl" : "px-3 py-1.5 md:px-4 md:py-2"}
            ${isScrolled ? "shadow-black/20" : ""}
            rounded-full
          `}
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: isUnlocked ? 'width, max-width, padding' : 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Toujours dark
            borderColor: 'rgba(255, 255, 255, 0.1)' // Toujours dark
          }}
        >
          {/* Contenu masqué au début - apparaît pendant le déverrouillage */}
          <div 
            className={`
              flex items-center justify-center gap-2 md:gap-3
              ${isUnlocked ? "opacity-100" : "opacity-0"}
            `}
            style={{ 
              transition: "opacity 0.3s cubic-bezier(0.2, 0, 0.2, 1)",
              transitionDelay: isUnlocked ? "0.7s" : "0s",
              transform: "translate3d(0, 0, 0)",
              willChange: "opacity"
            }}
          >
          {/* Bouton de thème intégré */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full transition-all duration-200 ease-out text-white hover:bg-white/10"
            aria-label="Basculer entre le mode sombre et clair"
          >
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5 hidden dark:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5 dark:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          {/* Séparateur */}
          <div className="h-4 md:h-5 w-px bg-white/20" />

          {/* Liens de navigation */}
          <ul className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`
                      relative px-2 md:px-2.5 lg:px-3 py-1 md:py-1.5 rounded-full
                      text-[10px] md:text-xs lg:text-sm font-medium
                      transition-all duration-200 ease-out
                      ${isActive
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span 
                        className="absolute inset-0 bg-white/10 rounded-full blur-sm animate-pulse-subtle"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          </div>

          {/* Indicateur de verrouillage (petit point au centre quand verrouillé) */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-2 h-2 rounded-full bg-white/60 animate-pulse-subtle"
              />
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
