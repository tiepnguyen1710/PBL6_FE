import axiosClient from "../../axios";
import VocaSetModel from "../../types/VocaSetModel";

export async function getAllVocaSets() {
  const response = await axiosClient.get<VocaSetModel[]>("/group-topic");

  return response.data;
}
