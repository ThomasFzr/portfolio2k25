"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface LockContextType {
  isUnlocked: boolean;
  unlock: () => void;
  shouldAnimate: boolean; // Pour déclencher l'animation même si déjà déverrouillé (refresh)
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export function LockProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Détecter si c'est un refresh en utilisant l'API Performance
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    const hasHash = window.location.hash !== "";

    if (isReload) {
      // C'est un refresh : démarrer déverrouillé et déclencher l'animation
      setIsUnlocked(true);
      if (!hasHash) {
        // Refresh sans hash : déclencher l'animation
        setShouldAnimate(true);
      }
    } else if (hasHash) {
      // Premier chargement avec hash : déverrouiller directement
      setIsUnlocked(true);
    }
    // Sinon, premier chargement sans hash : reste verrouillé (isUnlocked = false par défaut)
  }, []);

  const unlock = () => {
    setIsUnlocked(true);
  };

  return (
    <LockContext.Provider value={{ isUnlocked, unlock, shouldAnimate }}>
      {children}
    </LockContext.Provider>
  );
}

export function useLock() {
  const context = useContext(LockContext);
  if (context === undefined) {
    throw new Error("useLock must be used within a LockProvider");
  }
  return context;
}

