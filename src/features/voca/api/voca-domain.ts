import axiosClient from "../../../axios";
import { VocaSetWithUserProgress } from "../../../types/VocaSetModel";

export async function getVocaSetWithUserProgress(vocaSetId: string) {
  const response = await axiosClient.get<VocaSetWithUserProgress>(
    `group-topic/${vocaSetId}/user`,
  );

  return response.data;
}
