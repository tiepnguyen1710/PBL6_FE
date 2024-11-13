import axiosClient from "../../../../axios";
import VocabularyModel from "../../../../types/VocabularyModel";
import CreateVocabularyRequest from "../types/CreateVocabularyRequest";

export async function createNewVocabulary(request: CreateVocabularyRequest) {
  const { lessonId, ...data } = request;
  const responseData = await axiosClient.post<VocabularyModel>(
    "word/" + lessonId,
    data,
  );

  return responseData;
}
