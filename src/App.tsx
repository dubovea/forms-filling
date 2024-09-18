import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./routes/Home";
import ApplicationForm from "./routes/ApplicationForm";
import { ThemeProvider } from "./components/theme-provider";
import EducationForm from "./routes/EducationForm";

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
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </ThemeProvider>
  );
};

export default App;
