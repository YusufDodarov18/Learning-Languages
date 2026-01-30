import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import type { ThemeContextType } from "../type";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<boolean>(false);

  const toggleTheme = () => setTheme((prev) => !prev);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", String(theme));
    document.body.style.backgroundColor = theme
      ? "oklch(0.21 0.034 264.665)"
      : "oklch(0.987 0.022 95.277)";
    document.body.style.color = theme ? "white" : "black";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context) {
    return context;
  }
};

export default ThemeContext;
