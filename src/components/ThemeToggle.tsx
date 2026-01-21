"use client";
import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const applyTheme = useCallback((dark: boolean) => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : systemPrefersDark;
    applyTheme(shouldUseDark);
  }, [applyTheme]);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    applyTheme(nextIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label={isDark ? "切换为浅色模式" : "切换为深色模式"}
      title={isDark ? "切换为浅色模式" : "切换为深色模式"}
      type="button"
    >
      {isDark ? (
        // 太阳图标
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <path strokeLinecap="round" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      ) : (
        // 月亮图标
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
}
