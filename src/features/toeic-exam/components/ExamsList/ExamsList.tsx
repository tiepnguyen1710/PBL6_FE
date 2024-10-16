import { Box, Paper, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import bookImg from "../../assets/toeic24.png";
import styles from "./ExamsList.module.scss";

const ExamsList = () => {
  const tests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const years = [1, 2, 3];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    //textAlign: "center",
    //color: theme.palette.text.secondary,
    border: "1px solid #32B4C8",
    boxShadow: "none",
    borderRadius: "20px",
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
    "&:hover": {
      //backgroundColor: "#f0f0f0",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      border: "1px solid #F9A95A",
      cursor: "pointer",
    },
  }));

  return (
    <>
      {years.length > 0 &&
        years.map((year, index) => {
          return (
            <div className={styles.examByYear}>
              <div className={styles.leftContent}>
                <div className="img-book">
                  <img src={bookImg} alt="" />
                </div>
              </div>
              <div className={styles.rightContent}>
                <div className={styles.title}>2024 Practice set TOEIC</div>
                <div className={styles.innerExamsContainer}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                      {tests.length > 0 &&
                        tests.map((test, index) => {
                          return (
                            <Grid size={6} className={styles.innerTest}>
                              <Item>
                                <div className={styles.testName}>
                                  2024 Practice set TOEIC Test 1
                                </div>
                                <div className={styles.testTaken}>
                                  3 tests taken
                                </div>
                              </Item>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Box>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ExamsList;
