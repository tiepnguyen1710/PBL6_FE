import { Box, Divider, Typography } from "@mui/material";
import ResultTable from "./ResultTable";
import PracticeTabs from "./PracticeTabs";
import { useParams } from "react-router-dom";
import TestDetailInfo from "./TestDetailInfo";

const DetailContent = () => {
  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <TestDetailInfo examId={examId} />
      </Box>

      <Divider />

      <Box
        sx={{
          my: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "black" }}>
          Your result
        </Typography>
        <ResultTable examId={examId} />
      </Box>

      <Box sx={{ width: "100%" }}>
        <PracticeTabs />
      </Box>
    </>
  );
};

export default DetailContent;
