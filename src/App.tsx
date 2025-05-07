import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { pdfjs } from "react-pdf";
import { Outlet } from "react-router";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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
        <Header />
        <div className="pt-[56px] flex gap-2 h-full">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
