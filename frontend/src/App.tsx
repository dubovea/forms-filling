import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./routes/Home";
import Forms from "./routes/Forms";
import MainForm from "./routes/MainForm";
import Documents from "./routes/Documents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forms",
    element: <Forms />,
  },
  {
    path: "/main-form",
    element: <MainForm />,
  },
  {
    path: "/documents",
    element: <Documents />,
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
