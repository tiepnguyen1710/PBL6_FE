import axiosClient from "../../../axios";
import { PracticeRequest } from "../types/PracticeRequest";
const api_url = import.meta.env.VITE_API_URL;

const postPractice = async (practiceRequest: PracticeRequest) => {
  const response = await axiosClient.post(
    `${api_url}/test-practice`,
    practiceRequest,
  );
  return response.data;
};

export { postPractice };
