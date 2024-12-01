import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import selectedPartsReducer from "./selectedPartsSlice";
import userAnswerReducer from "./userAnswer";
import folderPracticeReducer from "./folderPracticeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedParts: selectedPartsReducer,
    userAnswers: userAnswerReducer,
    folderPractice: folderPracticeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
