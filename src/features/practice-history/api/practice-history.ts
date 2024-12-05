import axiosClient from "../../../axios";
import { PracticeHistory } from "../types/PracticeHistory";

const fetchAllPracticeHistory = async () => {
  const response = await axiosClient.get<PracticeHistory[]>(`test-practice`);
  return response.data;
};

export { fetchAllPracticeHistory };
