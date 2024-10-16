import { Box, Button, Typography } from "@mui/material";

const ListQuestion = () => {
  return (
    <>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          margin: "15px 0",
        }}
      >
        Part 1
      </Typography>
      <Box>
        {[0, 1, 2, 3, 4, 5].map((_, index) => {
          return (
            <Button
              sx={{
                minWidth: "30px",
                width: "30px",
                height: "30px",
                border: "1px solid var(--color-primary-main)",
                marginRight: "10px",
                marginBottom: "10px",
                "&:hover": {
                  border: "1px solid #F9A95A",
                },
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default ListQuestion;
