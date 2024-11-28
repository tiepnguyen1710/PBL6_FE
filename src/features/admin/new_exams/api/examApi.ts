import axiosClient from "../../../../axios";
import { IExamSetResponse } from "../types/Exam";
import { ExamResponse } from "../types/ExamResponse";
import NewExamRequest from "../types/NewExamRequest";

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_NAME);

  try {
    const isAudio = file.type.startsWith("audio/");
    const endpoint = isAudio
      ? `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`
      : `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

const fetchAllExam = async () => {
  const response = await axiosClient.get<IExamSetResponse>(`test`);
  return response.data;
};

const fetchExamById = async (examId: string) => {
  const response = await axiosClient.get<ExamResponse>(`test/${examId}`);
  return response.data;
};

const createExam = async (data: NewExamRequest) => {
  const response = await axiosClient.post(`test`, data);
  return response.data;
};

const getListPart = () => {
  return axiosClient.get(`part`);
};

export { uploadFile, createExam, getListPart, fetchAllExam, fetchExamById };
