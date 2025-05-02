// src/components/ThemeToggle.jsx
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer transition-colors duration-300 ease-in-out"
    >
      {isDark ? <DarkModeOutlined /> : <LightModeOutlined />}
    </button>
  );
};

export default ThemeToggle;
