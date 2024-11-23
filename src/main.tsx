import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";

// Use this workaround to make default MUI styles is overridden by the same specificity styles
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import theme from "./theme";

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

import { Provider } from "react-redux";

import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./queryClient.ts";
import store from "./stores/index.ts";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import HomePage from "./features/home/components/HomePage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Admin from "./components/layout/admin/Admin.tsx";
import Dashboard from "./features/admin/dashboard/Dashboard.tsx";

import UserProfilePage from "./features/user-profile/components/UserProfilePage.tsx";
import VocaLibraryPage from "./features/voca/components/VocaLibraryPage.tsx";
import LearningVocaPage from "./features/voca/components/LearningVocaPage.tsx";
import VocaIndexPage from "./features/admin/vocasets/components/VocaIndexPage.tsx";
import VocaSetDetailsPage from "./features/admin/vocasets/components/VocaSetDetailsPage.tsx";
import LessonDetailsPage from "./features/admin/vocasets/components/LessonDetailsPage.tsx";
import VocabularyDetailsPage from "./features/admin/vocasets/components/VocabularyDetailsPage.tsx";
import LessonsPage from "./features/voca/components/LessonsPage.tsx";

import CreateExam from "./features/admin/new_exams/components/createExam.tsx";
import ExamSet from "./features/admin/new_exams/components/ExamIndexPage.tsx";
import VocaPracticePage from "./features/voca/components/VocaPracticePage.tsx";
import VocaTestConfirmPage from "./features/voca/components/VocaTestConfirmPage.tsx";
import CompleteLearningLessonPage from "./features/voca/components/CompleteLearningLessonPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
  {},
  {
    // path: "/",
    // element: <ProtectedRoute />,
    // children: [
    //   {
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
  {
    path: "profile",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: "voca",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <VocaLibraryPage />,
      },
      {
        path: ":vocaSetId/lessons",
        element: <LessonsPage />,
      },
    ],
  },
  {
    path: "lesson",
    element: <ProtectedRoute />,
    children: [
      {
        path: "learn",
        element: <LearningVocaPage />,
      },
      {
        path: "practice",
        element: <VocaPracticePage />,
      },
      {
        path: "confirm-start-testing",
        element: <VocaTestConfirmPage />,
      },
      {
        path: "complete-learning",
        element: <CompleteLearningLessonPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // {
      //   path: "exam",
      //   element: <Exam />,
      // },
      {
        path: "createExam",
        element: <CreateExam />,
      },
      {
        path: "exam-set",
        element: <ExamSet />,
      },
      {
        path: "exam-set/:examId",
        element: <CreateExam />,
      },
      {
        path: "voca-set",
        element: <VocaIndexPage />,
      },
      {
        path: "voca-set/details",
        element: <VocaSetDetailsPage />,
      },
      {
        path: "lesson",
        element: <LessonDetailsPage />,
      },
      {
        path: "voca",
        element: <VocabularyDetailsPage />,
      },
      {
        path: "voca/create",
        element: <VocabularyDetailsPage />,
      },
    ],
  },
  //   ],
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
