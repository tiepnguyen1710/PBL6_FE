import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import theme from "./theme";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Part1 from "./features/toeic-exam/containers/Part1/Part1.tsx";
import LoginPage from "./features/auth/components/LoginPage.tsx";
import RegisterPage from "./features/auth/components/RegisterPage.tsx";
import AuthLayout from "./features/auth/components/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "exam",
    element: <Part1 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
