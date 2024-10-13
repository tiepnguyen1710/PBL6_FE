import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";

// Use this workaround to make default MUI styles is overridden by the same specificity styles
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./queryClient.ts";
import store from "./stores/index.ts";
import theme from "./theme";
import "./index.css";
import Part1 from "./features/toeic-exam/containers/Part1/Part1.tsx";
import LoginPage from "./features/auth/components/LoginPage.tsx";
import RegisterPage from "./features/auth/components/RegisterPage.tsx";
import AuthLayout from "./features/auth/components/AuthLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import HomePage from "./features/home/components/HomePage.tsx";

const router = createBrowserRouter([
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
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "exam",
        element: <Part1 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
