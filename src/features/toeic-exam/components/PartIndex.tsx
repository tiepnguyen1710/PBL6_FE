import { Box, Button, Container, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import { useQuery } from "@tanstack/react-query";
import { fetchExamById } from "../../admin/new_exams/api/examApi";
import NewExamRequest from "../../admin/new_exams/types/NewExamRequest";
import { convertExamResponse } from "../../admin/new_exams/utils/helper";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part7 from "./Part7";
import Part6 from "./Part6";
import SubMitBox from "./SubmitBox/SubmitBox";
import Content from "../../../components/layout/Content";
import { QuestionProvider } from "./QuestionProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { setNotedQuestion } from "../../../stores/notedQuestionSlice";

const PartIndex = () => {
  const [searchParams] = useSearchParams();
  const parts = searchParams.getAll("part");
  const isFullTest = parts.includes("full");
  console.log(isFullTest);
  const allParts = [
    "part1",
    "part2",
    "part3",
    "part4",
    "part5",
    "part6",
    "part7",
  ];
  const selectedParts = isFullTest ? allParts : parts;
  //console.log(selectedParts);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examData, setExamData] = useState<NewExamRequest>();
  const notedQuestions = useSelector(
    (state: RootState) => state.notedQuestions.notedQuestions,
  );

  const handleNotedQuestion = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    dispatch(setNotedQuestion({ part, groupIndex, questionIndex }));
  };

  const isNotedQuestion = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    const found = notedQuestions.find(
      (item) =>
        item.part === part &&
        item.groupIndex === groupIndex &&
        item.questionIndex === questionIndex,
    );
    return found?.isNoted ?? false;
  };

  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;
  const { isPending, data: ExamSetData } = useQuery({
    queryKey: ["FetchExamSet", examId],
    queryFn: () => fetchExamById(examId!),
    enabled: !!examId,
  });

  useEffect(() => {
    if (examId && ExamSetData) {
      console.log("exam ", ExamSetData);
      console.log("converve data", convertExamResponse(ExamSetData));
      const convertedData = convertExamResponse(ExamSetData);
      setExamData(convertedData);
    }
  }, [ExamSetData]);

  console.log("examset", ExamSetData);

  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentIndex((prev) => prev - 1);

  const renderPart = () => {
    const currentPart = selectedParts[currentIndex];

    switch (currentPart) {
      case "part1":
        return (
          <Part1
            partData={examData?.partData[0]}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part2":
        return (
          <Part2
            partData={examData?.partData[1]}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part3":
        return (
          <Part3
            partData={examData?.partData[2]}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part4":
        return (
          <Part4
            partData={examData?.partData[3]}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part5":
        return (
          <Part5
            partData={examData?.partData[4]}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part6":
        return (
          <Part6
            partData={examData?.partData[5]}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part7":
        return <Part7 partData={examData?.partData[6]} />;
      default:
        return <div>Cannot find this part</div>;
    }
  };
  return (
    <Content>
      <Container maxWidth="sm">
        <QuestionProvider>
          <Box my={2}>
            {selectedParts.map((part, partIndex) => {
              return (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 3,
                    marginRight: 0.25,
                    marginBottom: 0.25,
                  }}
                  onClick={() => setCurrentIndex(partIndex)}
                >
                  {part}
                </Button>
              );
            })}
            <Grid2 container spacing={2}>
              <Grid2 size={9.5}>
                {isPending ? (
                  "...Loading"
                ) : (
                  <Box
                    sx={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: 3,
                    }}
                    padding={3}
                  >
                    {renderPart()}
                  </Box>
                )}
              </Grid2>
              <Grid2 size={2.5}>
                <Box
                  padding={2}
                  sx={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: 3,
                    position: "sticky",
                    top: "50px",
                    alignSelf: "flex-start",
                  }}
                >
                  <SubMitBox
                    partData={examData?.partData || []}
                    setCurrentIndex={setCurrentIndex}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Box>

          <div style={{ margin: "1rem 0", float: "left" }}>
            <Button
              variant="outlined"
              disabled={currentIndex === 0}
              onClick={handlePrevious}
              sx={{ marginRight: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              disabled={currentIndex === selectedParts.length - 1}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </QuestionProvider>
      </Container>
    </Content>
  );
};

export default PartIndex;
