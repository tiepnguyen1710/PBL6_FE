import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotedQuestion {
  [part: number]: {
    [groupIndex: number]: number;
  };
}

interface NotedQuestionState {
  notedQuestions: NotedQuestion;
}

const initialState: NotedQuestionState = {
  notedQuestions: {},
};

const notedQuestionsSlice = createSlice({
  name: "notedQuestions",
  initialState,
  reducers: {
    setNotedQuestion: (
      state,
      action: PayloadAction<{
        part: number;
        groupIndex: number;
        questionIndex: number;
      }>,
    ) => {
      const { part, groupIndex, questionIndex } = action.payload;
      if (!state.notedQuestions[part]) {
        state.notedQuestions[part] = {};
      }
      state.notedQuestions[part][groupIndex] = questionIndex;
    },

    resetNotedQuestion: (state) => {
      state.notedQuestions = {};
    },
  },
});

export const { setNotedQuestion, resetNotedQuestion } =
  notedQuestionsSlice.actions;

export default notedQuestionsSlice.reducer;
