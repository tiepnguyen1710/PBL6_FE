import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import userIcon from "../../assets/user_icon.webp";

const InforUserBox = () => {
  return (
    <>
      <Box sx={{ mb: 1 }}>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <span style={{ width: "50px", height: "auto" }}>
            <img src={userIcon} />
          </span>
          <Typography variant="h6">TienZe</Typography>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ my: 1 }}>
        <Stack direction="column" spacing={0.25}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography>Days until exam</Typography>
            <Typography color="secondary.dark" fontWeight="bold">
              111 days
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography>Exam day</Typography>
            <Typography color="secondary.dark" fontWeight="bold">
              31/12/2024
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography>Target score</Typography>
            <Typography color="secondary.dark" fontWeight="bold">
              800
            </Typography>
          </Stack>
          <Button variant="contained">Analysis your result</Button>
        </Stack>
      </Box>
    </>
  );
};

export default InforUserBox;
