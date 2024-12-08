import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import selectedPartsReducer from "./selectedPartsSlice";
import userAnswerReducer from "./userAnswer";
import folderPracticeReducer from "./folderPracticeSlice";
import globalMessageReducer from "./globalMessageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedParts: selectedPartsReducer,
    userAnswers: userAnswerReducer,
    folderPractice: folderPracticeReducer,
    globalMessage: globalMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
