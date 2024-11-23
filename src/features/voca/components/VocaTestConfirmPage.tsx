import { Box, Stack, Typography } from "@mui/material";
import LessonHeader from "./LessonHeader";
import LessonMainContent from "./LessonMainContent";
import TestingRuleImage from "../assets/testing-rule.svg";
import { Image } from "../../../components/UI/Image";
import RuleItem from "./RuleItem";
import TargetRuleIcon from "../assets/test-rule-images/target-rule.svg";
import ExitRuleIcon from "../assets/test-rule-images/exit-rule.svg";
import TimeRuleIcon from "../assets/test-rule-images/time-rule.svg";
import LessonButton from "./LessonButton";
import { Navigate, useSearchParams } from "react-router-dom";
import Link from "../../../components/UI/Link";

const VocaTestConfirmPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  if (!lessonId) {
    return <Navigate to="/" />;
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <LessonHeader title="test" />
      <LessonMainContent sx={{ paddingTop: "50px", maxWidth: "780px" }}>
        <Stack direction="row">
          <Image
            src={TestingRuleImage}
            sx={{ maxWidth: "242px", paddingTop: "20px" }}
          />
          <Box sx={{ paddingLeft: "80px", paddingTop: "20px" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontSize: "36px" }}
              color="warning.light"
            >
              Exam regulations
            </Typography>
            <Typography
              sx={{ fontWeight: "medium", fontSize: "18px", marginTop: 0.5 }}
            >
              Here are some points to note:
            </Typography>

            <Stack
              spacing="25px"
              sx={{ marginTop: "40px", paddingLeft: "15px" }}
            >
              <RuleItem
                icon={TargetRuleIcon}
                rule="To achieve the best results, it's essential to perform the test without using any tricks or shortcuts."
              />
              <RuleItem
                icon={ExitRuleIcon}
                rule="During the test, if you leave the exam room without completing the remaining questions, it will be counted as WRONG."
              />

              <RuleItem
                icon={TimeRuleIcon}
                rule="Each exercise is timed. Try your best to complete the exam in as little time as possible."
              />
            </Stack>
          </Box>
        </Stack>
      </LessonMainContent>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          borderTop: "2px solid #E5E5E5",
          py: "26px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ maxWidth: "984px", mx: "auto" }}
        >
          <Link to={`/lesson/learn?id=${lessonId}`}>
            <LessonButton
              variant="outlined"
              sx={{
                width: "254px",
                borderBottomWidth: "5px",
                border: "2px solid #e5e5e5",
                borderBottom: "5px solid #e5e5e5",
              }}
            >
              CONTINUE LEARNING
            </LessonButton>
          </Link>

          <Link to={`/lesson/practice?id=${lessonId}`}>
            <LessonButton
              variant="contained"
              sx={{
                width: "254px",
                backgroundColor: "primary.main",
                borderBottomWidth: "5px",
              }}
            >
              READY
            </LessonButton>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default VocaTestConfirmPage;
