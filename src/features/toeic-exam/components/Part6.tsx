import { Box, Paper, Stack, styled, Typography } from "@mui/material";

import { partData } from "../../admin/new_exams/types/examType";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, setActiveAnswer } from "../../../stores/userAnswer";
import { RootState } from "../../../stores";

interface Part6Props {
  partData?: partData;
}

const Item = styled(Paper)(({ isActive }: { isActive: boolean }) => ({
  backgroundColor: isActive ? "#EBF5FF" : "#fff",
  padding: "15px",
  border: isActive ? "1px solid #0071F9" : "1px solid #f0f0f0",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: isActive ? "#EBF5FF" : "#F9FAFB",
    border: isActive ? "1px solid #0071F9" : "1px solid #F9A95A",
    cursor: "pointer",
    "& .innerBox": {
      backgroundColor: isActive ? "#0071F9" : "#6B7280",
      color: "white",
    },
  },
}));
const Part6: React.FC<Part6Props> = ({ partData }) => {
  console.log(partData);
  const dispatch = useDispatch();
  const activeAnswers = useSelector(
    (state: RootState) => state.userAnswers.activeAnswers,
  );
  const handleClick = (
    groupIndex: number,
    questionIndex: number,
    answerIndex: number,
    questionId: string,
    answer: string,
  ) => {
    dispatch(
      setActiveAnswer({
        groupIndex,
        questionIndex,
        answerIndex,
      }),
    );

    dispatch(setAnswer({ idQuestion: questionId, answer }));
  };
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "var(--color-primary-main)",
          padding: " 0 20px",
        }}
      >
        Part 6
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: "500", padding: "0 20px" }}
      >
        Directions: For each question in this part, you will hear four
        statements about a picture in your test book. When you hear the
        statements, you must select the one statement that best describes what
        you see in the picture. Then find the number of the question and mark
        your answer. The statements will not be printed in your test book and
        will be spoken only one time.
      </Typography>

      {/* Group Questions */}
      {partData?.groupQuestionData.map((group, groupIndex) => {
        return (
          <Box
            sx={{
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
              mb: 1,
              padding: "20px",
            }}
          >
            {/* Image */}
            <Box sx={{ mb: 2 }}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {group.image?.map((img, imgIndex) => {
                  return (
                    <img
                      key={imgIndex}
                      src={img.fileUrl}
                      alt="Test"
                      style={{
                        maxWidth: "80%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* List of Items */}
            <Box sx={{ width: "100%" }}>
              {group.questionData.map((question, questionIndex) => {
                return (
                  <Stack spacing={1}>
                    <Box
                      sx={{
                        background: "var(--color-primary-main)",
                        color: "white",
                        fontWeight: "400",
                        borderRadius: "50%",
                        padding: "15px",
                        width: "35px",
                        height: "35px",
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {question.questionNumber}
                    </Box>
                    {question.answer.map((answer, answerIndex) => {
                      let isActive =
                        activeAnswers[groupIndex]?.[questionIndex] ===
                        answerIndex;
                      return (
                        <Item
                          key={answerIndex}
                          isActive={isActive}
                          onClick={() =>
                            handleClick(
                              groupIndex,
                              questionIndex,
                              answerIndex,
                              question.questionId || "",
                              answer,
                            )
                          }
                          sx={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            className="innerBox"
                            sx={{
                              background: isActive ? "#0071F9" : "#F3F4F6",
                              color: isActive ? "white" : "",
                              fontWeight: "500",
                              borderRadius: "50%",
                              padding: "15px",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {String.fromCharCode(65 + answerIndex)}
                          </Box>
                          <Typography sx={{ fontWeight: "500" }}>
                            {answer}
                          </Typography>
                        </Item>
                      );
                    })}
                  </Stack>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Part6;
