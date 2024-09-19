import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./routes/Home";
import ApplicationForm from "./routes/ApplicationForm";
import EducationForm from "./routes/EducationForm";
import PasportForm from "./routes/PasportForm";
import WorkForm from "./routes/WorkForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/application-form",
    element: <ApplicationForm />,
  },
  {
    path: "/education-form",
    element: <EducationForm />,
  },
  {
    path: "/pasport-form",
    element: <PasportForm />,
  },
  {
    path: "/work-form",
    element: <WorkForm />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </ThemeProvider>
  );
};

export default App;
