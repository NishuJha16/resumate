export const resumeThemes = {
  classic: {
    background: "#ffffff",
    text: "#000000",
    heading: "#1a1a1a",
    divider: "#cccccc",
  },
  elegant: {
    background: "#f9f6f1",
    text: "#2f2f2f",
    heading: "#3e3e3e",
    divider: "#d6cfc7",
  },
  modern: {
    background: "#f0f4f8",
    text: "#1a1a1a",
    heading: "#1976d2",
    divider: "#90caf9",
  },
  dark: {
    background: "#1e1e1e",
    text: "#e0e0e0",
    heading: "#90caf9",
    divider: "#333",
  },
};
export type ThemeKey = keyof typeof resumeThemes;
