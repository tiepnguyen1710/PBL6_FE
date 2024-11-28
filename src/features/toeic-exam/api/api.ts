import axiosClient from "../../../axios";
import { PracticeRequest } from "../types/PracticeRequest";

const postPractice = async (practiceRequest: PracticeRequest) => {
  const response = await axiosClient.post(`test-practice`, practiceRequest);
  return response.data;
};

export { postPractice };
