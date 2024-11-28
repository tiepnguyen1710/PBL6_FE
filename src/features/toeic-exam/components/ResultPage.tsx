import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import InforUserBox from "./InforUserBox";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useLocation } from "react-router-dom";
import { ResponseResultData } from "../types/ResponseResultData";
import { toHHMMSS } from "../helper";
const ResultPage = () => {
  const BoxStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    padding: "30px",
  };

  const location = useLocation();
  const responseResultData: ResponseResultData = location.state?.responseData;
  const selectedPartsQuery = location.state?.selectedPartsQuery;

  console.log("Received responseData:", responseResultData);
  console.log("part data chosen", selectedPartsQuery);
  return (
    <Container maxWidth="sm">
      <Box my={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={9}>
            <Box
              sx={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "fit-content",
                padding: "30px",
              }}
            >
              <Typography variant="h5" mb={2}>
                Result New Economy TOEIC Test 10
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={3}>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      height: "fit-content",
                      padding: "30px",
                    }}
                  >
                    <Stack direction="column" spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={0.25}>
                          <DoneIcon fontSize="small" />
                          <Typography>Result</Typography>
                        </Stack>
                        <Typography>1/6</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={0.25}>
                          <TrackChangesIcon fontSize="small" />
                          <Typography>Accurracy</Typography>
                        </Stack>

                        <Typography>{`${(responseResultData.numCorrect / responseResultData.totalQuestion) * 100}%`}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={0.25}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography>Time</Typography>
                        </Stack>
                        <Typography>
                          {toHHMMSS(responseResultData.time)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid2>
                <Grid2 size={3}>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      height: "fit-content",
                      padding: "30px",
                    }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.75}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            color: "green",
                            fontWeight: "500",
                          }}
                        >
                          Correct
                        </Typography>
                        <CheckCircleIcon color="success"></CheckCircleIcon>
                      </Stack>

                      <Typography>{responseResultData.numCorrect}</Typography>
                    </Stack>
                  </Box>
                </Grid2>
                <Grid2 size={3}>
                  <Box sx={BoxStyle}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.75}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            color: "red",
                            fontWeight: "500",
                          }}
                        >
                          Incorrect
                        </Typography>
                        <CancelIcon color="error"></CancelIcon>
                      </Stack>
                      <Typography>
                        {responseResultData.totalQuestion -
                          responseResultData.numCorrect}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid2>
                <Grid2 size={3}>
                  <Box sx={BoxStyle}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.75}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            color: "gray",
                            fontWeight: "500",
                          }}
                        >
                          Skip
                        </Typography>
                        <DoNotDisturbOnIcon color="secondary"></DoNotDisturbOnIcon>
                      </Stack>
                      <Typography>0</Typography>
                    </Stack>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={3}>
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
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default ResultPage;
