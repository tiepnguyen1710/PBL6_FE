import axiosClient from "../../../axios";
import { PracticeDetailResponse } from "../types/PracticeDetailResponse";
import { PracticeRequest } from "../types/PracticeRequest";

const postPractice = async (practiceRequest: PracticeRequest) => {
  const response = await axiosClient.post(`test-practice`, practiceRequest);
  return response.data;
};

const fetchPracticeDetailUser = async (reviewId: string) => {
  const response = await axiosClient.get<PracticeDetailResponse>(
    `test-practice/${reviewId}`,
  );
  return response.data;
};

export { postPractice, fetchPracticeDetailUser };
