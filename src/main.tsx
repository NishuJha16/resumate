import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ResumeForm from "./pages/resume-form/resume-form.tsx";
import Home from "./pages/home/home.tsx";
import SavedResumes from "./pages/saved-resumes/saved-resumes.tsx";
import ResumeAnalyzer from "./pages/resume-analyzer/resume-analyzer.tsx";
import MainLayout from "./layouts/main-layout/main-layout.tsx";
import Authentication from "./pages/authentication/authentication.tsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/login",
        element: <Authentication type="login" />,
      },
      {
        path: "/register",
        element: <Authentication type="register" />,
      },
      {
        path: "/forgot-password",
        element: <Authentication type="forgotPassword" />,
      },
      {
        path: "/update-password",
        element: <Authentication type="updatePassword" />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/resume-builder",
            element: <ResumeForm />,
          },
          {
            path: "/saved-resumes",
            element: <SavedResumes />,
          },
          {
            path: "/resume-analyzer",
            element: <ResumeAnalyzer />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
