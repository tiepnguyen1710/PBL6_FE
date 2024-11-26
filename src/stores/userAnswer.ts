import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAnswer {
  idQuestion: string;
  answer: string;
}

interface ActiveAnswerState {
  [groupIndex: number]: {
    [questionIndex: number]: number;
  };
}

interface UserAnswersState {
  userAnswers: UserAnswer[];
  activeAnswers: ActiveAnswerState;
}

const initialState: UserAnswersState = {
  userAnswers: [],
  activeAnswers: {},
};

const userAnswersSlice = createSlice({
  name: "userAnswers",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<UserAnswer>) => {
      const { idQuestion, answer } = action.payload;
      const existingAnswerIndex = state.userAnswers.findIndex(
        (ans) => ans.idQuestion === idQuestion,
      );

      if (existingAnswerIndex !== -1) {
        state.userAnswers[existingAnswerIndex].answer = answer;
      } else {
        state.userAnswers.push(action.payload);
      }
    },

    setActiveAnswer: (
      state,
      action: PayloadAction<{
        groupIndex: number;
        questionIndex: number;
        answerIndex: number;
      }>,
    ) => {
      const { groupIndex, questionIndex, answerIndex } = action.payload;
      if (!state.activeAnswers[groupIndex]) {
        state.activeAnswers[groupIndex] = {};
      }
      state.activeAnswers[groupIndex][questionIndex] = answerIndex;
    },

    resetAnswers: (state) => {
      state.userAnswers = [];
      state.activeAnswers = {};
    },
  },
});

export const { setAnswer, resetAnswers, setActiveAnswer } =
  userAnswersSlice.actions;
export default userAnswersSlice.reducer;
