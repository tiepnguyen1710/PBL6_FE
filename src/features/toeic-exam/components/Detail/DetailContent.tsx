import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PersonIcon from "@mui/icons-material/Person";
import ResultTable from "./ResultTable";

import PracticeTabs from "./PracticeTabs";

const DetailContent = () => {
  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h4" color="primary.main">
          2024 Practice Set TOEIC Test 10
        </Typography>
        <Button
          variant="contained"
          sx={{
            my: 2,
            px: 1,
            py: 0.25,
            borderRadius: 3,
          }}
        >
          Test information
        </Button>
        <Stack direction="row" spacing={0.5}>
          <AccessAlarmIcon />
          <Typography variant="subtitle1">
            Time: 120 minutes | 7 parts | 200 questions | 798 comment
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <PersonIcon />
          <Typography variant="subtitle1">
            123 users have practiced this test
          </Typography>
        </Stack>
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
        <ResultTable />
      </Box>

      <Box sx={{ width: "100%" }}>
        <PracticeTabs />
      </Box>
    </>
  );
};

export default DetailContent;
