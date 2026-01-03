"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useLock } from "./LockProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // 0: Initial (verrouillé)
  // 1: Ouverture Cadenas
  // 2: Expansion
  // 3: Texte
  const [animationStep, setAnimationStep] = useState(0);
  
  const { theme, toggleTheme } = useTheme();
  const { isUnlocked } = useLock();

  useEffect(() => {
    if (!isUnlocked) {
      // Le cadenas reste verrouillé (animationStep = 0)
      return;
    }

    // --- TIMING D'ANIMATION AU DÉVERROUILLAGE ---
    const timer1 = setTimeout(() => {
      setAnimationStep(1); 
    }, 100);

    const timer2 = setTimeout(() => {
      setAnimationStep(2); 
    }, 500); 

    const timer3 = setTimeout(() => {
      setAnimationStep(3); 
    }, 700); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isUnlocked]);

  // Gérer le scroll séparément pour qu'il fonctionne toujours
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "work", "about", "contact"];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isUnlocked]);

  const navItems = [
    { name: "Accueil", href: "#home", id: "home" },
    { name: "Portfolio", href: "#work", id: "work" },
    { name: "À propos", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const getContainerSize = () => {
    if (animationStep < 2) return "w-[40px] h-[40px] px-0"; 
    if (isScrolled) return "w-auto h-auto px-6 py-2.5";
    return "w-auto h-auto px-4 py-2"; 
  };

  return (
    <header 
      className="fixed top-4 left-0 right-0 z-[9999] flex items-center justify-center pointer-events-none"
      style={{ 
        position: 'fixed', 
        top: '1rem', 
        left: 0, 
        right: 0, 
        zIndex: 9999,
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    >
      <nav
        className={`
          pointer-events-auto relative flex items-center justify-center
          backdrop-blur-2xl border origin-center
          rounded-full overflow-hidden
          ${getContainerSize()}
          transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        `}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          minWidth: animationStep < 2 ? '40px' : '320px',
          transform: 'translate3d(0,0,0)',
        }}
      >
        {/* --- CONTENU DU MENU --- */}
        <div 
          className={`flex items-center justify-center gap-3 transition-all duration-500 ease-out origin-center ${
            animationStep === 3 
              ? "opacity-100 scale-100 blur-0" 
              : "opacity-0 scale-75 blur-sm absolute"
          }`}
        >
          <button onClick={toggleTheme} className="text-white hover:bg-white/10 p-1 rounded-full transition-colors">
            {theme === 'dark' ? 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> :
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            }
          </button>
          <div className="h-4 w-px bg-white/20" />
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSection === item.id ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- CADENAS ANIMÉ FACE ID --- */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            animationStep >= 2 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}>
          <svg width="18" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            {/* J'ai supprimé toutes les classes Tailwind (rotate-*, transition-*, etc.) 
               pour utiliser du CSS pur via `style`. 
               - transformOrigin: '17px 11px' force le pivot en bas à droite.
               - transformBox: 'view-box' force le navigateur à utiliser les coordonnées SVG.
            */}
            <path 
              d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              style={{
                transformOrigin: '17px 11px',
                transformBox: 'view-box',
                transform: animationStep >= 1 ? 'rotate(20deg)' : 'rotate(0deg)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' // Petit rebond mécanique
              }}
            />
            <rect x="4" y="11" width="16" height="11" rx="2" fill="currentColor" />
          </svg>
        </div>
      </nav>
    </header>
  );
}