import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import ApplicationForm from "./routes/ApplicationForm";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/application-form",
    element: <ApplicationForm />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </ThemeProvider>
  );
};

export default App;
