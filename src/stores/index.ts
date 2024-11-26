import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import selectedPartsReducer from "./selectedPartsSlice";
import userAnswerReducer from "./userAnswer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedParts: selectedPartsReducer,
    userAnswers: userAnswerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
