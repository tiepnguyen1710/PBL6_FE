import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import Header from "../../../components/layout/Header";
import UserTargetInfo from "./UserTargetInfo";
import DayUntilIcon from "./DayUntilIcon";
import ExamDateIcon from "./ExamDateIcon";
import TargetIcon from "./TargetIcon";
import PracticeResult from "./PracticeResult";
import VocaSet from "./VocaSet";
import ViewMoreButton from "./ViewMoreButton";
import ExamCard from "./ExamCard";
import Footer from "../../../components/layout/Footer";
import { Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import HeroSection from "./HeroSection";
import VocaFeatureSection from "./VocaFeatureSection";
import ExamFeatureSection from "./ExamFeatureSection";

const HomePage: React.FC = () => {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.auth.isAuthenticated
  );

  return (
    <>
      <Header />
      {!isAuthenticated && (
        <>
          <HeroSection />
          <VocaFeatureSection />
          <ExamFeatureSection />
        </>
      )}

      {isAuthenticated && (
        <>
          <Box sx={{ background: "var(--color-gradient-secondary)", py: 3 }}>
            <Container fixed>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent={"space-between"}
                spacing={2}
                useFlexGap
              >
                <Typography variant="h4" color="primary.main">
                  Hello, TienZe!
                </Typography>

                <Stack spacing={1} direction="row" sx={{ alignSelf: "center" }}>
                  <UserTargetInfo
                    label="Days until exam"
                    figure="111 days"
                    icon={<DayUntilIcon sx={{ fontSize: 28 }} />}
                  />

                  <UserTargetInfo
                    label="Exam Date"
                    figure="30/12/2024"
                    icon={<ExamDateIcon sx={{ fontSize: 28 }} />}
                    onEdit={() => {}}
                  />

                  <UserTargetInfo
                    label="Target Score"
                    figure="800"
                    icon={<TargetIcon sx={{ fontSize: 28 }} />}
                    onEdit={() => {}}
                  />
                </Stack>
              </Stack>
            </Container>

            {/* user practice profile section */}
            <Container fixed>
              <Box sx={{ paddingTop: 3, paddingBottom: 0 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ py: 2 }}
                >
                  <Typography variant="h5">Latest Practice Results</Typography>
                  <Button variant="outlined" sx={{ px: 1, py: 0.25 }}>
                    Analysis your practice
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  <PracticeResult
                    testTitle="2024 Practice Set Test 10"
                    tags={["Part 7"]}
                    dateTaken="30/12/2024"
                    completionTime="0:57:03"
                    result="34/54"
                  />
                  <PracticeResult
                    testTitle="2024 Practice Set Test 10"
                    fullTest
                    dateTaken="31/08/2024"
                    completionTime="1:58:39"
                    result="65/200"
                    score={335}
                  />
                  <PracticeResult
                    testTitle="2024 Practice Set Test 10"
                    tags={["Part 7"]}
                    dateTaken="30/12/2024"
                    completionTime="0:57:03"
                    result="34/54"
                  />
                  <PracticeResult
                    testTitle="2024 Practice Set Test 10"
                    fullTest
                    dateTaken="31/08/2024"
                    completionTime="1:58:39"
                    result="65/200"
                    score={335}
                  />
                </Stack>

                <ViewMoreButton>View All</ViewMoreButton>
              </Box>
            </Container>
          </Box>
          <Box sx={{ boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.12)" }}>
            <Container fixed>
              {/* popular voca sets section */}
              <Box sx={{ py: 7 }}>
                <Typography
                  variant="h4"
                  color="primary.main"
                  textAlign={"center"}
                >
                  Top Vocabulary Sets - Most Studied by Learners
                </Typography>

                <Box
                  sx={{
                    marginTop: 2,
                    mx: "auto",
                    "& .swiper-slide": {
                      display: "flex",
                      justifyContent: "center",
                    },
                    maxWidth: { sm: "560px", md: "1100px" },
                  }}
                >
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    spaceBetween={24} // Space between slides in pixels
                    slidesPerView={2}
                    pagination={{ clickable: true }} // Enable pagination (dots)
                    loop={true}
                    breakpoints={{
                      600: {
                        slidesPerView: 2,
                      },
                      900: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      1200: {
                        slidesPerView: 4,
                      },
                    }}
                    style={{ paddingBottom: "40px" }}
                  >
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Medium"
                        topic="Biology"
                        takenNumber="2.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Easy"
                        topic="Family"
                        takenNumber="10.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Medium"
                        topic="Biology"
                        takenNumber="2.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Easy"
                        topic="Family"
                        takenNumber="10.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Advanced"
                        takenNumber="2.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Advanced"
                        takenNumber="2.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Medium"
                        topic="Biology"
                        takenNumber="2.1m"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VocaSet
                        title="400 Words of TOEFL - Intermediate English"
                        qualification="Advanced"
                        takenNumber="2.1m"
                      />
                    </SwiperSlide>
                  </Swiper>
                </Box>

                {/* <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid2
              container
              sx={{ maxWidth: { md: "900px", lg: "1100px" } }}
              spacing={1.25}
              justifyContent="center"
            >
              <Grid2>
                <VocaSet
                  title="400 Words of TOEFL - Intermediate English"
                  qualification="Medium"
                  topic="Biology"
                  takenNumber="2.1m"
                />
              </Grid2>
              <Grid2>
                <VocaSet
                  title="400 Words of TOEFL - Intermediate English"
                  qualification="Easy"
                  topic="Family"
                  takenNumber="10.1m"
                />
              </Grid2>
              <Grid2>
                <VocaSet
                  title="400 Words of TOEFL - Intermediate English"
                  qualification="Advanced"
                  takenNumber="2.1m"
                />
              </Grid2>
              <Grid2>
                <VocaSet
                  title="400 Words of TOEFL - Intermediate English"
                  qualification="Medium"
                  topic="Biology"
                  takenNumber="2.1m"
                />
              </Grid2>
            </Grid2>
          </Box> */}

                {/* <Box display="flex" justifyContent="center" sx={{ marginTop: 1 }}>
            <ViewMoreButton>Browser More</ViewMoreButton>
          </Box> */}
              </Box>

              <Divider />
              {/* Most recent tests section */}
              <Box sx={{ py: 7 }}>
                <Typography
                  variant="h4"
                  color="primary.main"
                  textAlign={"center"}
                >
                  Most Recent Tests
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ marginTop: 2 }}
                >
                  <Grid2
                    container
                    sx={{ maxWidth: { lg: "1206px" } }}
                    rowSpacing={1}
                    columnSpacing={{ xs: "10px", md: 1.5 }}
                    justifyContent="center"
                  >
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                    <Grid2>
                      <ExamCard
                        title="IELTS Simulation Listening test 1"
                        duration="40 minutes"
                        totalParticipants={675321}
                        totalComments={2319}
                        numOfParts={4}
                        numOfQuestions={40}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                  </Grid2>
                </Box>
              </Box>
            </Container>
          </Box>
        </>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
