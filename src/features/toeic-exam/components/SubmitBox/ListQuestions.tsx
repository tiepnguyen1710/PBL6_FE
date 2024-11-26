import { Box, Button, Typography } from "@mui/material";
import { partData } from "../../../admin/new_exams/types/examType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores";

interface partDataChosenProps {
  partDataChosen: partData[];
}
const ListQuestion: React.FC<partDataChosenProps> = ({ partDataChosen }) => {
  console.log(partDataChosen);
  const activeAnswers = useSelector(
    (state: RootState) => state.userAnswers.activeAnswers,
  );
  return (
    <>
      {partDataChosen.map((partChosen, PartChosenIndex) => {
        return (
          <>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                margin: "8px 0",
              }}
            >
              {partChosen.part}
            </Typography>
            <Box>
              {partChosen.groupQuestionData.map((group, groupIndex) => {
                return group.questionData.map((question, questionIndex) => {
                  const isActive =
                    activeAnswers[groupIndex]?.[questionIndex] !== undefined;
                  return (
                    <Button
                      sx={{
                        minWidth: "20px",
                        width: "20px",
                        height: "20px",
                        border: isActive
                          ? "1px solid white"
                          : "1px solid var(--color-primary-main)",
                        marginRight: "10px",
                        marginBottom: "10px",
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
                      <Typography sx={{ fontSize: "14px" }}>
                        {question.questionNumber}
                      </Typography>
                    </Button>
                  );
                });
              })}
            </Box>
          </>
        );
      })}
    </>
  );
};

export default ListQuestion;
