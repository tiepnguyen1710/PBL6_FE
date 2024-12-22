import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserTargetInfo from "./UserTargetInfo";
import DayUntilIcon from "./DayUntilIcon";
import ExamDateIcon from "./ExamDateIcon";
import TargetIcon from "./TargetIcon";
import PracticeResult from "./PracticeResult";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import VocaSet from "../../../components/VocaSet";
import ExamCard from "./ExamCard";
import ViewMoreButton from "./ViewMoreButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { me } from "../../auth/api/account-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";

import CustomModal from "../../../components/UI/CustomModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserProfile } from "../../user-profile/api/user-profile";
import { toast } from "react-toastify";
import { differenceInDays, format } from "date-fns";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import { fetchLast4PracticeDetailUser } from "../api/lastPractice.api";
import { getTop8Vocab } from "../api/TopVocab.api";
import { getTopTestTaken } from "../api/TopTest.api";
import Link from "../../../components/UI/Link";

type UserTargetFormData = {
  testDate: Date;
  targetScore: number;
};

const UserHomePage = () => {
  const queryClient = useQueryClient();
  const { token } = useSelector<RootState, AuthState>((state) => state.auth);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
  });

  const { data: lastPractice } = useQuery({
    queryKey: ["last4PracticeUser"],
    queryFn: () => fetchLast4PracticeDetailUser(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { data: top8Vocab } = useQuery({
    queryKey: ["top8Vocab"],
    queryFn: () => getTop8Vocab(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { data: topTest } = useQuery({
    queryKey: ["top8Test"],
    queryFn: () => getTopTestTaken(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const [openChangeTargetModal, setOpenChangeTargetModal] = useState(false);

  const userTargetForm = useForm<UserTargetFormData>({
    defaultValues: {
      testDate: new Date(),
      targetScore: 450,
    },
  });

  const userTargetState = userTargetForm.getValues();

  const updateUserTargetMutation = useMutation({
    mutationFn: (data: UserTargetFormData) => updateUserProfile(data),
    onSuccess: () => {
      setOpenChangeTargetModal(false);
      toast.success("Update target successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });

      updateUserTargetMutation.reset();
    },
  });

  const getDefaultTestDate = useCallback(() => {
    let createdDate = new Date();
    if (user) {
      createdDate = new Date(user.createdAt);
    }
    const defaultTestDate = createdDate;
    defaultTestDate.setMonth(defaultTestDate.getMonth() + 3);

    return defaultTestDate;
  }, [user]);

  const userTestDate = useMemo(() => {
    return user?.testDate ? new Date(user.testDate) : getDefaultTestDate();
  }, [user?.testDate, getDefaultTestDate]);

  useEffect(() => {
    if (user) {
      userTargetForm.reset({
        testDate: userTestDate,
        targetScore: user?.targetScore || 450,
      });
    }
  }, [user, userTargetForm, userTestDate]);

  const handleUpdateUserTarget: SubmitHandler<UserTargetFormData> = (data) => {
    updateUserTargetMutation.mutate(data);
  };
  const convertSecondsToHMS = (seconds: number): string => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  return (
    <>
      {isLoading && <CustomBackdrop />}
      <Box sx={{ background: "var(--color-gradient-secondary)", py: 3 }}>
        <Container fixed>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            spacing={2}
            useFlexGap
          >
            <Typography variant="h4" color="primary.main">
              Hello, {user?.name || user?.username}!
            </Typography>

            <Stack spacing={1} direction="row" sx={{ alignSelf: "center" }}>
              <UserTargetInfo
                label="Days until exam"
                figure={`${differenceInDays(userTestDate, new Date())} days`}
                icon={<DayUntilIcon sx={{ fontSize: 28 }} />}
              />

              <UserTargetInfo
                label="Exam Date"
                figure={format(userTestDate, "dd/MM/yyyy")}
                icon={<ExamDateIcon sx={{ fontSize: 28 }} />}
                onEdit={() => setOpenChangeTargetModal(true)}
              />

              <UserTargetInfo
                label="Target Score"
                figure={user?.targetScore?.toString() || "450"}
                icon={<TargetIcon sx={{ fontSize: 28 }} />}
                onEdit={() => setOpenChangeTargetModal(true)}
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
              {lastPractice?.lastPractice?.map((practice) => {
                return (
                  <PracticeResult
                    key={practice.id}
                    id={practice.id}
                    testTitle={practice.test.name}
                    tags={practice.isFullTest ? [] : practice.listPart}
                    fullTest={practice.isFullTest}
                    dateTaken={format(
                      new Date(practice.createdAt),
                      "dd/MM/yyyy",
                    )}
                    completionTime={`${convertSecondsToHMS(practice.time)}`}
                    result={`${practice.numCorrect}/${practice.totalQuestion}`}
                    score={practice.LCScore + practice.RCScore}
                  />
                );
              })}

              {lastPractice?.lastPractice?.length === 0 && (
                <Box>
                  <Typography>
                    No practice history yet. Take your first test and track your
                    progress.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ boxShadow: "none", marginTop: 1 }}
                  >
                    Start Your First Practice Test
                  </Button>
                </Box>
              )}
            </Stack>

            {lastPractice && lastPractice?.lastPractice?.length > 0 && (
              <Link to="/history">
                <ViewMoreButton>View All</ViewMoreButton>
              </Link>
            )}
          </Box>
        </Container>
      </Box>
      <Box sx={{ boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.12)" }}>
        <Container fixed>
          {/* popular voca sets section */}
          <Box sx={{ py: 7 }}>
            <Typography variant="h4" color="primary.main" textAlign={"center"}>
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
                {top8Vocab?.map((vocab) => {
                  return (
                    <SwiperSlide
                      onClick={() => {
                        window.location.href = `/voca/${vocab.groupTopic_id}/lessons`;
                      }}
                      key={vocab.groupTopic_id}
                      style={{ alignSelf: "stretch", height: "auto" }}
                    >
                      <VocaSet
                        id={vocab.groupTopic_id}
                        title={vocab.groupTopic_name}
                        qualification={vocab.groupTopic_level}
                        takenNumber={vocab.userCount.toString()}
                        image={vocab.groupTopic_thumbnail}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          </Box>

          <Divider />
          {/* Most recent tests section */}
          <Box sx={{ py: 7 }}>
            <Typography variant="h4" color="primary.main" textAlign={"center"}>
              Most Taken Tests
            </Typography>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Grid2
                container
                sx={{ maxWidth: { lg: "1206px" } }}
                rowSpacing={1}
                columnSpacing={{ xs: "10px", md: 1.5 }}
                justifyContent="center"
              >
                {topTest?.map((test) => {
                  return (
                    <Grid2 key={test.testId}>
                      <ExamCard
                        id={test.testId}
                        title={test.testName}
                        duration={`${test.time} minutes`}
                        totalParticipants={test.userCount}
                        totalComments={test.commentCount}
                        numOfParts={test.partCount}
                        numOfQuestions={test.totalQuestion}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                  );
                })}
                {/* <Grid2>
                  <ExamCard
                    id="7"
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
                    id="8"
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
                    id="1"
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
                    id="2"
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
                    id="3"
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
                    id="4"
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
                    id="5"
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
                    id="6"
                    title="IELTS Simulation Listening test 1"
                    duration="40 minutes"
                    totalParticipants={675321}
                    totalComments={2319}
                    numOfParts={4}
                    numOfQuestions={40}
                    tags={["Listening", "Reading"]}
                  />
                </Grid2> */}
              </Grid2>
            </Box>
          </Box>
        </Container>

        {/* Update user target modal */}
        <CustomModal
          open={openChangeTargetModal}
          onClose={() => setOpenChangeTargetModal(false)}
          containerSx={{ top: 100, left: "50%", transform: "translateX(-50%)" }}
        >
          <Box sx={{ padding: 3 }}>
            <Typography
              variant="h5"
              sx={{ marginBottom: 2.5, textAlign: "center" }}
            >
              Change your target
            </Typography>
            {updateUserTargetMutation.isError && (
              <Alert
                severity="error"
                onClose={() => updateUserTargetMutation.reset()}
                sx={{ marginBottom: 1.5 }}
              >
                {updateUserTargetMutation.error?.message ||
                  "Something went wrong!"}
              </Alert>
            )}
            <form
              onSubmit={userTargetForm.handleSubmit(handleUpdateUserTarget)}
            >
              <Stack spacing={1}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={enGB}
                >
                  <DatePicker
                    onError={() =>
                      userTargetForm.setError("testDate", {
                        type: "custom",
                        message: "Please select date in the future",
                      })
                    }
                    onAccept={() => userTargetForm.clearErrors("testDate")}
                    disablePast
                    label="Exam Date"
                    value={userTargetState.testDate}
                    onChange={(date) => {
                      if (date) {
                        userTargetForm.setValue("testDate", date, {
                          shouldValidate: true,
                        });
                      }
                    }}
                    slotProps={{
                      textField: {
                        helperText:
                          userTargetForm.formState.errors?.testDate?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
                <TextField
                  type="number"
                  label="Target score"
                  helperText={
                    userTargetForm.formState.errors.targetScore?.message
                  }
                  error={!!userTargetForm.formState.errors.targetScore}
                  {...userTargetForm.register("targetScore", {
                    required: "This field is required",
                  })}
                />
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      width: "80px",
                      marginLeft: "auto",
                      float: "right",
                      height: "40px",
                    }}
                    type="submit"
                    disabled={updateUserTargetMutation.isPending}
                  >
                    {updateUserTargetMutation.isPending ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </Stack>
            </form>
          </Box>
        </CustomModal>
      </Box>
    </>
  );
};
export default UserHomePage;
