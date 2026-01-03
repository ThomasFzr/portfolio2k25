"use client";

import { createContext, useContext, useState } from "react";

interface LockContextType {
  isUnlocked: boolean;
  unlock: () => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export function LockProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const unlock = () => {
    setIsUnlocked(true);
  };

  return (
    <LockContext.Provider value={{ isUnlocked, unlock }}>
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

