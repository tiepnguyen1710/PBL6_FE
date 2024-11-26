import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import InforUserBox from "./InforUserBox";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const ResultPage = () => {
  const BoxStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    padding: "30px",
  };
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
                    <Stack direction="column" spacing={1}>
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

                        <Typography>%</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={0.25}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography>Time</Typography>
                        </Stack>
                        <Typography>12:00</Typography>
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
                    >
                      <Typography>Correct</Typography>
                      <Typography>6</Typography>
                    </Stack>
                  </Box>
                </Grid2>
                <Grid2 size={3}>
                  <Box sx={BoxStyle}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography>Incorrect</Typography>
                      <Typography>0</Typography>
                    </Stack>
                  </Box>
                </Grid2>
                <Grid2 size={3}>
                  <Box sx={BoxStyle}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography>Skip</Typography>
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
