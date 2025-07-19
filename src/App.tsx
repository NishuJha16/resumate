import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { Outlet } from "react-router";
import { pdfjs } from "react-pdf";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

function App() {
  const [isDark, setIsDark] = useState(() => {
    const html = document.documentElement;
    return (
      html.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark"
    );
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const html = document.documentElement;
      setIsDark(
        html.classList.contains("dark") ||
          localStorage.getItem("theme") === "dark"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <div className="min-h-screen h-full flex flex-col  bg-[#F2F3F7] text-black dark:bg-gray-900 dark:text-white transition-colors">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
