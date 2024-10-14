import image from "../../assets/p11.webp";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useState } from "react";

const questions = [0, 1, 2, 3, 4, 5];
const answers = [0, 1, 2];
const Item = styled(Paper)(({ isActive }: { isActive: boolean }) => ({
  backgroundColor: isActive ? "#EBF5FF" : "#fff",
  //...theme.typography.body2,
  //padding: theme.spacing(1),
  padding: "15px",
  border: isActive ? "1px solid #0071F9" : "1px solid #f0f0f0",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: isActive ? "#EBF5FF" : "#F9FAFB",
    border: isActive ? "1px solid #0071F9" : "1px solid #F9A95A",
    cursor: "pointer",
    "& .innerBox": {
      backgroundColor: isActive ? "#0071F9" : "#6B7280",
      color: "white",
    },
  },
}));

const Part2Content = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "var(--color-primary-main)",
          padding: " 0 20px",
        }}
      >
        Part 2
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: "500", padding: "0 20px" }}
      >
        Directions: You will hear a question or statement and three responses
        spoken in English. They will not be printed in your test book and will
        be spoken only one time. Select the best response to the question or
        statement and mark the letter (A), (B), or (C).
      </Typography>

      {/* Group Questions */}
      {questions.map((_, index) => {
        return (
          <Box
            sx={{
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
              mb: 1,
              padding: "20px",
            }}
          >
            <Box
              sx={{
                background: "var(--color-primary-main)",
                color: "white",
                fontWeight: "400",
                borderRadius: "50%",
                padding: "15px",
                width: "35px",
                height: "35px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              1
            </Box>
            {/* Image */}
            {/* <Box sx={{ mb: 2 }}>
              <img
                src={image}
                alt="Test"
                style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
              />
            </Box> */}

            {/* List of Items */}
            <Box sx={{ width: "100%" }}>
              <Stack spacing={1}>
                {answers.map((_, index) => {
                  return (
                    <Item
                      key={index}
                      isActive={activeIndex === index}
                      onClick={() => handleClick(index)}
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        key={index}
                        className="innerBox"
                        sx={{
                          background:
                            activeIndex === index ? "#0071F9" : "#F3F4F6",
                          color: activeIndex === index ? "white" : "",
                          fontWeight: "500",
                          borderRadius: "50%",
                          padding: "15px",
                          width: "35px",
                          height: "35px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        A
                      </Box>
                      <Typography sx={{ fontWeight: "500" }}>
                        Statement A
                      </Typography>
                    </Item>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Part2Content;
