import { Box, Grid2, Stack, Typography } from "@mui/material";
import LessonHeader from "./LessonHeader";
import LessonMainContent from "./LessonMainContent";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ResultItem from "./ResultItem";
import PassResultSvg from "../assets/pass-result.svg";
import TimeResultSvg from "../assets/time-result.svg";
import HistoryBarChart from "./HistoryBarChart";
import VocabularyCard, {
  VocabularyCardState,
} from "../../../components/VocabularyCard";

const data = [
  { name: "Correct", value: 85 },
  { name: "Incorrect", value: 15 },
];
const COLORS = ["#32CD32", "#E5E5E5"]; // Green and Grey

const LesssonLearningResult = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <LessonHeader
        title="test"
        lessonName={"JOB"}
        containerSx={{ maxWidth: "1070px" }}
      />
      <LessonMainContent sx={{ paddingTop: "50px", maxWidth: "1070px" }}>
        <Typography variant="h4" sx={{ fontSize: "30px" }}>
          Result evaluation table
        </Typography>
        <Grid2
          container
          columns={10}
          spacing="30px"
          sx={{
            marginTop: "35px",
            marginBottom: 4,
            "& .MuiGrid2-root": {
              border: "2px solid #e5e5e5",
              borderRadius: "22px",
              backgroundColor: "#F8FAFB",
            },
          }}
        >
          <Grid2 size={4}>
            <Box
              sx={{
                padding: "20px",
              }}
            >
              <Typography sx={{ fontSize: "20px", color: "#777777" }}>
                Test results
              </Typography>

              {/* Pie chart */}
              <Box sx={{ position: "relative" }}>
                <ResponsiveContainer width="100%" height={330}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%" // Center X position
                      cy="50%" // Center Y position
                      innerRadius={100} // Inner radius for the doughnut effect
                      outerRadius={140} // Outer radius for the pie
                      cornerRadius={8}
                      startAngle={0}
                      endAngle={-360}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "46px",
                    color: "#58CC02",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  85%
                </Typography>
              </Box>

              {/* Legend */}
              <Stack spacing="25px" sx={{ marginTop: 1 }}>
                <ResultItem
                  title="Retained words"
                  value="17 words"
                  icon={PassResultSvg}
                  iconSize={37}
                />
                <ResultItem
                  title="Time"
                  value="123 seconds"
                  icon={TimeResultSvg}
                />
              </Stack>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box
              sx={{
                padding: "20px",
              }}
            >
              <Typography sx={{ fontSize: "20px", color: "#777777" }}>
                Progress chart
              </Typography>
              <Box
                sx={{
                  my: "25px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "20px 25px 20px 35px",
                }}
              >
                <HistoryBarChart />
              </Box>
            </Box>
          </Grid2>
        </Grid2>
        <Typography variant="h4" sx={{ fontSize: "30px" }}>
          Detailed results
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <Typography sx={{ fontSize: "20px", color: "#777777" }}>
            Words you do not know
            <Typography
              component="span"
              sx={{
                color: "#FF4B4B",
                backgroundColor: "#FFDFE0",
                minWidth: "50px",
                display: "inline-block",
                borderRadius: "16px",
                textAlign: "center",
                marginLeft: "10px",
                fontWeight: "500",
              }}
            >
              3
            </Typography>
          </Typography>
          <Box sx={{ minHeight: "400px", marginTop: "30px" }}>
            <VocabularyCard
              word="go"
              phonetic="go"
              thumbnail="https://www.voca.vn/assets/assets-v2/img/library/baker%20%283%29.jpg"
              type="n"
              meaning="di"
              state={VocabularyCardState.ERROR}
            />
          </Box>
        </Box>
      </LessonMainContent>
    </Stack>
  );
};

export default LesssonLearningResult;
