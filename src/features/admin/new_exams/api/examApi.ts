import axiosClient from "../../../../axios";
import { IExamModel, IExamSetResponse } from "../types/Exam";
import { ExamResponse } from "../types/ExamResponse";
import NewExamRequest from "../types/NewExamRequest";
const api_url = import.meta.env.VITE_API_URL;

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_NAME); // Cấu hình trong Cloudinary

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
  const response = await axiosClient.get<IExamSetResponse>(`${api_url}/test`);
  return response.data;
};

const fetchExamById = async (examId: string) => {
  const response = await axiosClient.get<ExamResponse>(
    `${api_url}/test/${examId}`,
  );
  return response.data;
};

const createExam = async (data: NewExamRequest) => {
  const response = await axiosClient.post(`${api_url}/test`, data);
  return response.data;
};

const getListPart = () => {
  return axiosClient.get(`${api_url}/part`);
};

export { uploadFile, createExam, getListPart, fetchAllExam, fetchExamById };
