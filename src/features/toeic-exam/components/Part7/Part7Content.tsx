import { Box, Paper, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

const answers = [0, 1, 2, 3];
const questions = [0, 1, 2];
const groups = [0, 1, 2, 3];
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

const Part7Content = () => {
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
        Part 7
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: "500", padding: "0 20px" }}
      >
        Directions: In this part, you will read a selection of texts, such as
        magazine and newspaper articles, e-mails, and instant messages. Each
        text or set of texts is followed by several questions. Select the best
        answer for each question and mark the letter (A), (B), (C) or (D) on
        your answer sheet.
      </Typography>

      {groups.map((_, index) => {
        return (
          <Box sx={{ display: "flex", gap: "30px", height: "80vh" }}>
            {/* Left Side: Scrollable passage */}
            <Box
              sx={{
                width: "55%",
                height: "600px",
                border: "1px solid #ddd",
                padding: "30px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Passage</Typography>
              <PerfectScrollbar style={{ flexGrow: 1 }}>
                <Typography>
                  {/* Add your passage text here */}
                  Company Announcement: New Employee Shuttle Service GlobalTech
                  Solutions is excited to announce the launch of our new
                  Employee Shuttle Service starting October 1st. This initiative
                  is part of our ongoing commitment to sustainable practices and
                  aims to provide a convenient, eco-friendly transportation
                  option for our team. The shuttle service will operate between
                  key residential areas and the office, with multiple routes
                  designed to cover the majority of our employees' residences.
                  The service schedule will align with standard office hours,
                  ensuring availability during peak commuting times.
                  Additionally, the shuttle buses are equipped with modern
                  amenities, including WiFi and charging stations, to make your
                  journey more comfortable and productive. We believe this
                  service will not only benefit our employees by reducing
                  commuting stress but also contribute significantly to our
                  environmental sustainability goals by decreasing the number of
                  cars on the road. For more details on routes and schedules,
                  please refer to the intranet or contact our HR department.
                </Typography>
              </PerfectScrollbar>
            </Box>

            {/* Right Side: Scrollable answer options */}
            <Box
              sx={{
                width: "45%",
                height: "600px",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Answers</Typography>
              <PerfectScrollbar style={{ flexGrow: 1 }}>
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
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          marginBottom: "15px",
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
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          1
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "18px",
                          }}
                        >
                          What problem is the woman facing?
                        </Typography>
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
                                      activeIndex === index
                                        ? "#0071F9"
                                        : "#F3F4F6",
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
                                  She is unable to access her email account.
                                </Typography>
                              </Item>
                            );
                          })}
                        </Stack>
                      </Box>
                    </Box>
                  );
                })}
              </PerfectScrollbar>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Part7Content;
