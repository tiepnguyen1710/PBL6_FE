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
import Detail from "./features/toeic-exam/components/Detail/Detail.tsx";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import store from "./stores/index.ts";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import HomePage from "./features/home/components/HomePage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setupAxiosInterceptors } from "./axios.ts";

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
import ExamsListPage from "./features/toeic-exam/components/Exams/ExamsLibraryPage.tsx";
import PartIndex from "./features/toeic-exam/components/PartIndex.tsx";
import ResultPage from "./features/toeic-exam/components/ResultPage.tsx";

import VocaPracticePage from "./features/voca/components/VocaPracticePage.tsx";
import VocaTestConfirmPage from "./features/voca/components/VocaTestConfirmPage.tsx";
import CompleteLearningLessonPage from "./features/voca/components/CompleteLearningLessonPage.tsx";
import LessonLearningResultPage from "./features/voca/components/LessonLearningResultPage.tsx";

import PartResultIndex from "./features/toeic-exam/components/PartResultIndex.tsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
import PersonalWordFolderPage from "./features/voca/components/PersonalWordFolderPage.tsx";
import FolderDetailsPage from "./features/voca/components/FolderDetailsPage.tsx";
import FolderPracticePage from "./features/voca/components/FolderPracticePage.tsx";
import FolderPracticeResultPage from "./features/voca/components/FolderPracticeResultPage.tsx";
import ForgotPasswordPage from "./features/auth/components/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./features/auth/components/ResetPasswordPage.tsx";

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
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {},
  {
    path: "exams",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <ExamsListPage />,
      },
      {
        path: ":examId",
        element: <Detail />,
      },
      {
        path: ":examId/partIndex",
        element: <PartIndex />,
      },
      {
        path: "result/:resultId",
        element: <ResultPage />,
      },
      {
        path: "review/:reviewId",
        element: <PartResultIndex />,
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
      {
        path: "learning-result",
        element: <LessonLearningResultPage />,
      },
    ],
  },
  {
    path: "personal-word-folder",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <PersonalWordFolderPage />,
      },
      {
        path: ":folderId",
        element: <FolderDetailsPage />,
      },
      {
        path: ":folderId/practice",
        element: <FolderPracticePage />,
      },
      {
        path: ":folderId/practice-result",
        element: <FolderPracticeResultPage />,
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

setupAxiosInterceptors(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <RouterProvider router={router} />
              <ToastContainer />
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
