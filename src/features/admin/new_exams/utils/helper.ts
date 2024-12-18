import { ExamResponse, groupQuestionResponse } from "../types/ExamResponse";
import { groupQuestionData } from "../types/examType";
import NewExamRequest from "../types/NewExamRequest";

export const convertExamData = (data: groupQuestionData[]) => {
  const result = data.map((item) => {
    const imagePreview = item.image
      ?.sort((a, b) => a.index - b.index)
      .map((item) => item.fileUrl);
    return {
      ...item,
      //audioPreview: item.audioUrl,
      imagePreview: imagePreview,
    };
  });
  return result;
};

export const convertExamResponse = (data: ExamResponse) => {
  const result: NewExamRequest = {
    name: data.name,
    tags: data.tags || [{ id: "1", name: "2024" }],
    partData: [
      { part: "part1", groupQuestionData: [] },
      { part: "part2", groupQuestionData: [] },
      { part: "part3", groupQuestionData: [] },
      { part: "part4", groupQuestionData: [] },
      { part: "part5", groupQuestionData: [] },
      { part: "part6", groupQuestionData: [] },
      { part: "part7", groupQuestionData: [] },
    ],
  };

  data.groupQuestions.forEach((group: groupQuestionResponse) => {
    const partIndex = result.partData.findIndex(
      (part) => part.part === group.part.key,
    );

    const audioMedia = group.questionMedia.find(
      (audio) => audio.type === "audio",
    );
    const imageMedia = group.questionMedia.filter(
      (image) => image.type === "image",
    );

    const image = imageMedia.map((img) => {
      return {
        fileUrl: img.url,
        index: img.index,
      };
    });

    const questionData = group.questions.map((questionItem) => {
      return {
        questionId: questionItem.id,
        questionNumber: questionItem.questionNumber,
        question: questionItem.question,
        answer: questionItem.answer,
        correctAnswer: questionItem.correctAnswer,
        explain: questionItem.explain,
      };
    });

    questionData.sort((a, b) => a.questionNumber - b.questionNumber);
    const groupQuestionData: groupQuestionData = {
      audioUrl: audioMedia?.url ?? null,
      image: image,
      transcript: group.transcript,
      detail: group.detail,
      questionData: questionData,
    };

    result.partData[partIndex].groupQuestionData.push(groupQuestionData);
  });

  return result;
};
