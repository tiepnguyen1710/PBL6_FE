import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import theme from "./theme";
import App from "./App.tsx";
import "./index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./features/auth/components/LoginPage.tsx";
import RegisterPage from "./features/auth/components/RegisterPage.tsx";
import AuthLayout from "./features/auth/components/AuthLayout.tsx";
import Exams from "./features/toeic-exam/components/Exams/Exams.tsx";
import ExamsListPage from "./features/toeic-exam/components/Exams/ExamsListPage.tsx";
import Detail from "./features/toeic-exam/components/Detail/Detail.tsx";
import Part1 from "./features/toeic-exam/components/Part1/Part1.tsx";
import Part2 from "./features/toeic-exam/components/Part2/Part2.tsx";
import Part3 from "./features/toeic-exam/components/Part3/Part3.tsx";
import Part4 from "./features/toeic-exam/components/Part4/Part4.tsx";
import Part7 from "./features/toeic-exam/components/Part7/Part7.tsx";
import Part6 from "./features/toeic-exam/components/Part6/Part6.tsx";
import Part5 from "./features/toeic-exam/components/Part5/Part5.tsx";

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
    path: "exams",
    element: <Exams />,
    children: [
      {
        index: true,
        element: <ExamsListPage />,
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "detail/part1",
        element: <Part1 />,
      },
      {
        path: "detail/part2",
        element: <Part2 />,
      },
      {
        path: "detail/part3",
        element: <Part3 />,
      },
      {
        path: "detail/part4",
        element: <Part4 />,
      },
      {
        path: "detail/part5",
        element: <Part5 />,
      },
      {
        path: "detail/part6",
        element: <Part6 />,
      },
      {
        path: "detail/part7",
        element: <Part7 />,
      },
    ],
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
