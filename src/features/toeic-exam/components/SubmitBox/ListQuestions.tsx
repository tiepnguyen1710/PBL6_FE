import { Box, Button, Typography } from "@mui/material";
import { partData } from "../../../admin/new_exams/types/examType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { useQuestionContext } from "../QuestionProvider";

interface partDataChosenProps {
  partDataChosen: partData[];
  setCurrentIndex: (index: number) => void;
}
const ListQuestion: React.FC<partDataChosenProps> = ({
  partDataChosen,
  setCurrentIndex,
}) => {
  console.log("chosen", partDataChosen);
  const activeAnswers = useSelector(
    (state: RootState) => state.userAnswers.activeAnswers,
  );
  const notedQuestions = useSelector(
    (state: RootState) => state.notedQuestions.notedQuestions,
  );

  const { scrollToQuestion } = useQuestionContext();

  const convertPartChosen = (partChosen: string) => {
    return +partChosen[partChosen.length - 1];
  };
  return (
    <>
      {partDataChosen.map((partChosen, PartChosenIndex) => {
        const part = convertPartChosen(partChosen.part);
        return (
          <Box key={PartChosenIndex}>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                margin: "8px 0",
              }}
            >
              {`Part ${part}`}
            </Typography>
            <Box>
              {partChosen.groupQuestionData.map((group, groupIndex) => {
                return group.questionData.map((question, questionIndex) => {
                  // const isNoted =
                  //   notedQuestions[part]?.[groupIndex] !== undefined;
                  const isActive =
                    activeAnswers[part]?.[groupIndex]?.[questionIndex] !==
                    undefined;

                  return (
                    <Button
                      key={`btn-${groupIndex}-${questionIndex}`}
                      onClick={() => {
                        setCurrentIndex(PartChosenIndex);
                        scrollToQuestion(part, groupIndex, questionIndex);
                      }}
                      sx={{
                        minWidth: "24px",
                        width: "24px",
                        height: "24px",
                        border: isActive
                          ? "1px solid white"
                          : "1px solid var(--color-primary-main)",
                        marginRight: "4px",
                        marginBottom: "4px",
                        "&:hover": {
                          border: isActive ? "" : "1px solid #F9A95A",
                          color: isActive ? "" : "#F9A95A",
                        },
                        background: isActive
                          ? "var(--color-primary-main)"
                          : "white",
                        color: isActive ? "white" : "var(--color-primary-main)",
                      }}
                    >
                      <Typography sx={{ fontSize: "11px" }}>
                        {question.questionNumber}
                      </Typography>
                    </Button>
                  );
                });
              })}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ListQuestion;
