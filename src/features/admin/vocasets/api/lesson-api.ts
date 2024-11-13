import axiosClient from "../../../../axios";
import LessonModel from "../../../../types/LessonModel";
import NewLessonRequest from "../types/NewLessonRequest";

export async function createNewLesson(request: NewLessonRequest) {
  const { vocaSetId, ...data } = request;
  const response = await axiosClient.post<LessonModel>(
    "/topic/" + vocaSetId,
    data,
  );

  return response.data;
}

export async function getLessonById(id: string) {
  const response = await axiosClient.get<LessonModel>("/topic/" + id);

  return response.data;
}

export async function deleteLesson(id: string) {
  const response = await axiosClient.delete("/topic/" + id);

  return response.data;
}
