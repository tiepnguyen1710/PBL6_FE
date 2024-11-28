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

const PartIndex = () => {
  const [searchParams] = useSearchParams();
  const selectedParts = searchParams.getAll("part");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examData, setExamData] = useState<NewExamRequest>();

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
        return <Part1 partData={examData?.partData[0]} />;
      case "part2":
        return <Part2 partData={examData?.partData[1]} />;
      case "part3":
        return <Part3 partData={examData?.partData[2]} />;
      case "part4":
        return <Part4 partData={examData?.partData[3]} />;
      case "part5":
        return <Part5 partData={examData?.partData[4]} />;
      case "part6":
        return <Part6 partData={examData?.partData[5]} />;
      case "part7":
        return <Part7 partData={examData?.partData[6]} />;
      default:
        return <div>Cannot find this part</div>;
    }
  };
  return (
    <Content>
      <Container maxWidth="sm">
        <Box my={2}>
          <Grid2 container spacing={2}>
            <Grid2 size={9}>
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
            <Grid2 size={3}>
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
                <SubMitBox partData={examData?.partData || []} />
              </Box>
            </Grid2>
          </Grid2>
        </Box>

        <div style={{ marginTop: "2rem" }}>
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
      </Container>
    </Content>
  );
};

export default PartIndex;
