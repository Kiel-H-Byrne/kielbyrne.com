import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isCelestialTransitioning: boolean;
  transitionType: "sunrise" | "sunset" | null;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  isCelestialTransitioning: false,
  transitionType: null,
});

const THEME_STORAGE_KEY = "kb_color_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isCelestialTransitioning, setIsCelestialTransitioning] =
    useState(false);
  const [transitionType, setTransitionType] = useState<
    "sunrise" | "sunset" | null
  >(null);
  const [mounted, setMounted] = useState(false);

  // Apply classes to root element
  const applyThemeToDOM = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, []);

  // Initialize theme from storage or system preference on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
      applyThemeToDOM(savedTheme);
    } else {
      // Default to dark for this portfolio, but detect preference if user explicitly prefers light
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      const initial = prefersLight ? "light" : "dark";
      setThemeState(initial);
      applyThemeToDOM(initial);
    }
  }, [applyThemeToDOM]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      applyThemeToDOM(newTheme);
    },
    [applyThemeToDOM]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const celestialDirection = nextTheme === "light" ? "sunrise" : "sunset";

    setTransitionType(celestialDirection);
    setIsCelestialTransitioning(true);

    // Synchronize DOM color change when the sun/moon crosses the zenith (at 700ms)
    setTimeout(() => {
      setThemeState(nextTheme);
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyThemeToDOM(nextTheme);
    }, 700);

    // End celestial animation after completion
    setTimeout(() => {
      setIsCelestialTransitioning(false);
      setTransitionType(null);
    }, 1850);
  }, [theme, applyThemeToDOM]);

  return (
    <ThemeContext.Provider
      value={{
        theme: mounted ? theme : "dark",
        toggleTheme,
        setTheme,
        isCelestialTransitioning,
        transitionType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
