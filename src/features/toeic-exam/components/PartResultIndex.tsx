import { Box, Button, Container, Grid2 } from "@mui/material";
import Content from "../../../components/layout/Content";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PracticeDetailConverted } from "../types/PracticeDetailConverted";
import { useQuery } from "@tanstack/react-query";
import { fetchPracticeDetailUser } from "../api/api";
import { convertPracticeResponse } from "../utils/helper";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part6 from "./Part6";
import Part7 from "./Part7";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";

const PartResultIndex = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const routeParams = useParams<{ reviewId: string }>();
  const reviewId = routeParams.reviewId;
  const [examDataReview, setExamDataReview] =
    useState<PracticeDetailConverted>();

  const { isPending, data: ExamSetReviewData } = useQuery({
    queryKey: ["FetchTestPractice", reviewId],
    queryFn: () => fetchPracticeDetailUser(reviewId!),
    enabled: !!reviewId,
  });

  useEffect(() => {
    if (reviewId && ExamSetReviewData) {
      console.log("exam ", ExamSetReviewData);
      console.log("converve data", convertPracticeResponse(ExamSetReviewData));
      const convertedData = convertPracticeResponse(ExamSetReviewData);
      setExamDataReview(convertedData);
    }
  }, [ExamSetReviewData]);

  const selectedParts = ["part1", "part2", "part3", "part4", "part5", "part6"];

  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentIndex((prev) => prev - 1);

  const renderPart = () => {
    const currentPart = selectedParts[currentIndex];

    switch (currentPart) {
      case "part1":
        return <Part1 partData={examDataReview?.partData[0]} mode={"review"} />;
      case "part2":
        return <Part2 partData={examDataReview?.partData[1]} mode={"review"} />;
      case "part3":
        return <Part3 partData={examDataReview?.partData[2]} mode={"review"} />;
      case "part4":
        return <Part4 partData={examDataReview?.partData[3]} mode={"review"} />;
      case "part5":
        return <Part5 partData={examDataReview?.partData[4]} mode={"review"} />;
      case "part6":
        return <Part6 partData={examDataReview?.partData[5]} mode={"review"} />;
      case "part7":
        return <Part7 partData={examDataReview?.partData[6]} />;
      default:
        return <div>Cannot find this part</div>;
    }
  };

  return (
    <Content>
      <Container maxWidth="sm">
        <Box my={2}>
          <Grid2 container spacing={2}>
            <Grid2 size={9.5}>
              {isPending ? (
                <Box sx={{ marginTop: 2 }}>
                  <DotLoadingProgress />
                </Box>
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
              {/* <Box
                padding={2}
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 3,
                  position: "sticky",
                  top: "50px",
                  alignSelf: "flex-start",
                }}
              ></Box> */}
            </Grid2>
          </Grid2>
        </Box>

        <div style={{ margin: "1rem" }}>
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

export default PartResultIndex;
