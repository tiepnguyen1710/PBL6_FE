import axiosClient from "../../../axios";
import { PostLearningResultRequest } from "../types/LearningResultRequest";

export async function createLearningResult(request: PostLearningResultRequest) {
  const response = await axiosClient.post("topic-history", request);

  return response.data;
}
