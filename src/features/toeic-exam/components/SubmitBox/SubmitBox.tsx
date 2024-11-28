import { Box, Button } from "@mui/material";
import TimerCountdown, { TimerCountdownRef } from "./TimerCountdown";
import ListQuestion from "./ListQuestions";
import { partData } from "../../../admin/new_exams/types/examType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { useEffect, useRef, useState } from "react";
import { sortPartArray } from "../../../admin/new_exams/utils/helper";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PracticeRequest } from "../../types/PracticeRequest";
import { useMutation } from "@tanstack/react-query";
import { postPractice } from "../../api/api";
import { toast } from "react-toastify";

interface PartDataProps {
  partData: partData[];
  // selectedPartsQuery: string[];
}
const SubMitBox: React.FC<PartDataProps> = ({ partData }) => {
  console.log("submit box", partData);
  const [partDataChosen, setPartDataChosen] = useState<partData[]>([]);
  const limitTime = useSelector(
    (state: RootState) => state.selectedParts.limitTime,
  );
  const selectedParts = useSelector(
    (state: RootState) => state.selectedParts.selectedParts,
  );
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswers.userAnswers,
  );
  const [searchParams] = useSearchParams();
  const selectedPartsQuery = searchParams.getAll("part");

  const timerCountDownRef = useRef<TimerCountdownRef>(null);

  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;
  const navigate = useNavigate();
  console.log("part", selectedPartsQuery);

  useEffect(() => {
    const selectedPartsClone = [...selectedParts];
    const sortedSelectedParts = sortPartArray(selectedPartsClone);
    const partDataChosen = partData.filter((partItem) =>
      sortedSelectedParts.includes(partItem.part),
    );
    console.log("chosen", partDataChosen);
    setPartDataChosen(partDataChosen);
  }, [partData]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: PracticeRequest) => {
      const responseData = await postPractice(data);
      return responseData;
    },
    onSuccess: (responseData) => {
      console.log("Post successfull, reponseData", responseData);
      navigate(`/exams/result/${responseData.id}`, {
        state: { responseData, selectedPartsQuery },
      });
      // queryClient.setQueryData(
      //   responseData,
      // );
      toast.success("Submit succesfully");
    },
    onError: (error) => {
      console.error("Post failed:", error);
      toast.error("Failed to submit");
    },
  });

  const handleSubmit = () => {
    const remainingTime = timerCountDownRef.current?.submit() || 0;
    const implementTime = +limitTime - remainingTime;
    const practiceRequest: PracticeRequest = {
      userId: "4d6fffbc-72e7-4895-a0bb-eba4b17f0615",
      testId: examId || "",
      time: implementTime,
      userAnswer: userAnswers,
    };

    mutate(practiceRequest);
  };
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <TimerCountdown duration={limitTime} timerRef={timerCountDownRef} />
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Button
          sx={{
            padding: "8px 50px",
            borderRadius: "5px",
            color: "var(--color-primary-main)",
            border: "1px solid var(--color-primary-main)",
            background: "white",
            ":hover": {
              color: "white",
              background: "var(--color-primary-main)",
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <ListQuestion partDataChosen={partDataChosen} />
      </Box>
    </>
  );
};

export default SubMitBox;
