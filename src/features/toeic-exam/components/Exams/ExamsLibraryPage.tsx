import { Box, Chip, Grid2, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InforUserBox from "../InforUserBox";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllExam } from "../../../admin/new_exams/api/examApi";
import DotLoadingProgress from "../../../../components/UI/DotLoadingProgress";
import { ExamSetInfo } from "../../types/ExamSetInfo";
import { tags } from "../../types/Tags";
import ExamSetCard from "./ExamSetCard";
import ExamCard from "../../../home/components/ExamCard";

interface ITag {
  id: number;
  name: string;
}
const ExamsLibraryPage = () => {
  const [selectedTag, setSelectedTag] = useState<ITag>();

  const { data: examSetData, isPending } = useQuery({
    queryKey: ["fetchExam"],
    queryFn: fetchAllExam,
  });

  const handleTagClick = (tag: ITag) => {
    setSelectedTag(tag);
  };
  return (
    <Box sx={{ flexGrow: 1, maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
      <Grid container spacing={2}>
        <Grid size={9}>
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Library Exam
          </Typography>
          {tags.map((tag) => {
            return (
              <Chip
                key={tag.id}
                label={tag.name}
                clickable
                color={
                  selectedTag?.name.includes(tag.name) ? "primary" : "default"
                }
                onClick={() => handleTagClick(tag)}
                sx={{ padding: 0.75, marginRight: 0.75 }}
              />
            );
          })}
          {isPending ? (
            <Box sx={{ marginTop: 2 }}>
              <DotLoadingProgress />
            </Box>
          ) : (
            <Grid2 container rowGap={1.5} my={3}>
              {examSetData?.data
                .map((examSet) => {
                  const examSetInfo: ExamSetInfo = {
                    id: examSet.id,
                    name: examSet.name,
                    time: examSet.time,
                  };
                  return examSetInfo;
                })
                .map((examSet) => {
                  return (
                    <Grid2 sx={{ width: "275px" }}>
                      <ExamCard
                        key={examSet.id}
                        id={examSet.id}
                        title={examSet.name}
                        duration={examSet.time.toString()}
                        totalParticipants={0}
                        totalComments={0}
                        numOfParts={7}
                        numOfQuestions={200}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                  );
                })}
            </Grid2>
          )}
        </Grid>
        <Grid size={3}>
          {" "}
          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              height: "fit-content",
              padding: "30px",
            }}
          >
            <InforUserBox />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExamsLibraryPage;
