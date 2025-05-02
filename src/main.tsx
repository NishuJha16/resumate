import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ResumeForm from "./pages/resume-form/resume-form.tsx";
import Home from "./pages/home/home.tsx";
import SavedResumes from "./pages/saved-resumes/saved-resumes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/resumes-builder",
        element: <ResumeForm />,
      },
      {
        path: "/saved-resumes",
        element: <SavedResumes />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
