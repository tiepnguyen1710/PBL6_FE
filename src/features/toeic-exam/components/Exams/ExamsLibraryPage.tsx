import { Box, Chip, Grid2, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InforUserBox from "../InforUserBox";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllExam,
  fetchListTags,
} from "../../../admin/new_exams/api/examApi";
import DotLoadingProgress from "../../../../components/UI/DotLoadingProgress";
import { ExamSetInfo } from "../../types/ExamSetInfo";
import ExamCard from "../../../home/components/ExamCard";
import Content from "../../../../components/layout/Content";
import { Tag } from "../../types/Tags";
import { useSearchParams } from "react-router-dom";

const ExamsLibraryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagId = searchParams.get("tag_id");
  const [selectedTag, setSelectedTag] = useState<Tag | null>();

  useEffect(() => {
    if (!tagId) {
      setSelectedTag(null);
    }
  });

  const { data: examSetData, isPending } = useQuery({
    queryKey: ["fetchExam", tagId],
    queryFn: () => fetchAllExam(tagId || ""),
  });

  const { data: tags, isPending: isPendingTags } = useQuery({
    queryKey: ["FetchListTags"],
    queryFn: () => fetchListTags(),
  });

  const handleTagClick = (tag: Tag) => {
    setSelectedTag(tag);
    setSearchParams(tag.id ? { tag_id: tag.id } : {});
  };
  return (
    <Content>
      <Box sx={{ flexGrow: 1, maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
        <Grid container spacing={2}>
          <Grid size={9}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Library Exam
            </Typography>
            {isPendingTags && isPending ? (
              <Box sx={{ marginTop: 2 }}>
                <DotLoadingProgress />
              </Box>
            ) : (
              <>
                {tags?.map((tag) => {
                  return (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      clickable
                      color={
                        selectedTag?.name.includes(tag.name)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => handleTagClick(tag)}
                      sx={{ padding: 0.9, marginRight: 0.75 }}
                    />
                  );
                })}
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
              </>
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
    </Content>
  );
};

export default ExamsLibraryPage;
