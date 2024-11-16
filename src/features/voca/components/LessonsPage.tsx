import React, { useState } from "react";
import Content from "../../../components/layout/Content";
import {
  alpha,
  Box,
  OutlinedInput,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import LearningLessonProgress from "./LearningLessonProgress";
import { Image } from "../../../components/UI/Image";
import TabPanel from "../../../components/UI/TabPanel";
import VocaSetTextList from "./VocaSetTextList";
import LessonProgressCard from "./LessonProgressCard";
import GoldStarIcon from "../assets/gold-star.svg";
import RedStarIcon from "../assets/course-progress-star-2.svg";
import TwoCardIcon from "../assets/course-progress-learned-1.svg";
import TwoRedCardIcon from "../assets/course-progress-not-learn-1.svg";
import LessonComment from "./LessonComment";
import CommentIcon from "../assets/comment-icon.svg";

const LessonsPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Content>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 1, py: 3 }}>
        <Stack direction="row">
          <Box>
            <Typography variant="h5">
              Lesson{" "}
              <Typography
                component="span"
                color="primary"
                sx={{
                  marginTop: "-4px",
                  fontWeight: "medium",
                  lineHeight: 2,
                  display: "inline-block",
                  textAlign: "center",
                  fontSize: "15px",
                  marginLeft: "15px",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                }}
              >
                8
              </Typography>
            </Typography>
            <Box sx={{ marginTop: "40px", maxWidth: "800px" }}>
              <Box display="flex" flexWrap="wrap" sx={{ gap: 3 }}>
                <Stack spacing={1.25} sx={{ minWidth: "200px" }}>
                  <LessonCard
                    name="Job"
                    image="https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg"
                  />
                  <LearningLessonProgress
                    sx={{ width: "173px" }}
                    fullProgress
                  />
                </Stack>

                <Stack spacing={1.25} sx={{ minWidth: "200px" }}>
                  <LessonCard
                    name="Job"
                    image="https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg"
                  />
                  <LearningLessonProgress sx={{ width: "173px" }} />
                </Stack>
                <Stack spacing={1.25} sx={{ minWidth: "200px" }}>
                  <LessonCard
                    name="Job"
                    image="https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg"
                  />
                  <LearningLessonProgress sx={{ width: "173px" }} />
                </Stack>
                <Stack spacing={1.25} sx={{ minWidth: "200px" }}>
                  <LessonCard
                    name="Job"
                    image="https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg"
                  />
                  <LearningLessonProgress sx={{ width: "173px" }} />
                </Stack>
                <Stack spacing={1.25} sx={{ minWidth: "200px" }}>
                  <LessonCard
                    name="Job"
                    image="https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg"
                  />
                  <LearningLessonProgress sx={{ width: "173px" }} />
                </Stack>
              </Box>
            </Box>
          </Box>
          <Stack
            spacing={2}
            sx={{
              width: "377px",
              "& .MuiPaper-root": {
                border: "1px solid #e5e5e5",
                py: "20px",
                borderRadius: "18px",
              },
            }}
          >
            <Paper variant="outlined">
              <Box sx={{ px: "24px" }}>
                <Image
                  src="https://www.voca.vn/assets/file_upload/images/lets-go.png"
                  sx={{
                    aspectRatio: "250/140",
                    borderTopLeftRadius: "18px",
                    borderTopRightRadius: "18px",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                  }}
                />
                <Typography
                  variant="h4"
                  color="secondary.dark"
                  sx={{
                    lineHeight: "36px",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginTop: 1,
                  }}
                >
                  LET'S GO!
                </Typography>
              </Box>
              <Tabs
                value={tabIndex}
                onChange={handleChange}
                sx={{
                  px: "24px",
                  borderBottomWidth: "1px",
                  borderColor: "divider",
                  "& .MuiTab-root": { px: 0.75 },
                  "& .MuiButtonBase-root": {
                    fontSize: "15px",
                    px: 0,
                    py: "8px",
                    alignItems: "flex-start",
                    minWidth: "auto",
                    marginRight: 1.5,
                  },
                  "& .MuiTabs-indicator": {
                    width: "45px",
                  },
                }}
              >
                <Tab label="Target" />
                <Tab label="Description" />
              </Tabs>

              <TabPanel
                key={"tab-0"}
                index={0}
                value={tabIndex}
                sx={{ padding: "20px" }}
              >
                <VocaSetTextList>
                  <li>
                    Giúp bạn làm quen với cách học từ vựng thông minh cùng VOCA.
                  </li>
                  <li>
                    Giúp bạn tăng khả năng giao tiếp và diễn đạt tiếng Anh trong
                    một số tình huống thông dụng.
                  </li>
                </VocaSetTextList>
              </TabPanel>

              <TabPanel
                key={"tab-1"}
                index={1}
                value={tabIndex}
                sx={{ padding: "20px" }}
              >
                <VocaSetTextList>
                  <li>
                    Bao gồm 140 từ vựng thuộc 7 chủ đề thông dụng và gần gũi
                    nhất.
                  </li>
                  <li>
                    Khóa học miễn phí cho bạn trải nghiệm cách học từ vựng thông
                    minh cùng VOCA.
                  </li>
                </VocaSetTextList>
              </TabPanel>
            </Paper>

            <Paper variant="outlined" sx={{ padding: "25px 20px" }}>
              <Typography
                sx={{ fontSize: 20, fontWeight: "medium", color: "#201F1F" }}
              >
                Your progress
              </Typography>

              <Box
                sx={{
                  marginTop: 0.75,
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "10px",
                  columnGap: "5px",
                }}
              >
                <LessonProgressCard
                  label="Learned lessons"
                  icon={GoldStarIcon}
                  quantity={0}
                />
                <LessonProgressCard
                  label="Unlearned lessons"
                  icon={RedStarIcon}
                  quantity={4}
                />
                <LessonProgressCard
                  label="Retained words"
                  icon={TwoCardIcon}
                  quantity={5}
                />
                <LessonProgressCard
                  label="New words"
                  icon={TwoRedCardIcon}
                  quantity={10}
                />
              </Box>
            </Paper>

            <Paper variant="outlined">
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: "medium",
                  color: "#201F1F",
                  my: "10px",
                  px: 1.25,
                }}
              >
                Reviews of learners
              </Typography>

              {/* Comment container */}
              <Box sx={{ maxHeight: "340px", overflowY: "auto" }}>
                <LessonComment />
                <LessonComment />
                <LessonComment />
              </Box>

              {/* Comment button */}
              <Stack
                direction="row"
                spacing="10px"
                sx={{ padding: "20px 15px" }}
              >
                <Image src={CommentIcon} sx={{ width: "36px" }} />
                <OutlinedInput
                  placeholder="Write a comment..."
                  disabled
                  sx={{
                    fontSize: "13px",
                    height: "38px",
                    backgroundColor: "#FAF9FC",
                    border: "1px solid #ddd",
                    flexGrow: 1,
                    "& fieldset": { border: "none" },
                    "& input": {
                      cursor: "pointer !important",
                    },
                    "& input:hover": {
                      textDecoration: "underline",
                    },
                  }}
                />
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Box>
    </Content>
  );
};

export default LessonsPage;
