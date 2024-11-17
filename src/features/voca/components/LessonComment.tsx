import { Avatar, Box, Stack, Typography } from "@mui/material";
import StarIcon from "./StarIcon";

const LessonComment = () => {
  const rate = 3;
  return (
    <Box sx={{ px: "15px", py: "20px", borderBottom: "1px solid #e5e5e5" }}>
      {/* Rate header */}
      <Stack direction="row" spacing="10px">
        <Avatar
          src="https://www.voca.vn/assets/avatar/default.png"
          sx={{ width: "60px", height: "60px" }}
        />
        <Box>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "medium", marginTop: "10px" }}
          >
            Nguyễn Thị Thanh Hằng
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              color: "var(--text-light)",
              marginTop: "5px",
            }}
          >
            Comment at 07/09/2024
          </Typography>
        </Box>
      </Stack>

      {/* rate star */}
      <Stack direction="row" spacing={0.25} sx={{ marginTop: "15px" }}>
        {[1, 1, 1, 1, 1].map((_, index) => (
          <StarIcon key={index} active={index < rate} sx={{ width: "17px" }} />
        ))}
      </Stack>

      {/* rate comment */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography fontSize={13}>quá là hay!</Typography>
      </Box>
    </Box>
  );
};
export default LessonComment;
