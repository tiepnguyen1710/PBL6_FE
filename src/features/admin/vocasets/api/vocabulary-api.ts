import axiosClient from "../../../../axios";
import VocabularyModel from "../../../../types/VocabularyModel";
import CreateVocabularyRequest from "../types/CreateVocabularyRequest";

export async function createNewVocabulary(request: CreateVocabularyRequest) {
  const { lessonId, ...data } = request;
  const response = await axiosClient.post<VocabularyModel>(
    "word/" + lessonId,
    data,
  );

  return response.data;
}

export async function getVocaById(id: string) {
  const response = await axiosClient.get<VocabularyModel>("word/" + id);

  return response.data;
}
