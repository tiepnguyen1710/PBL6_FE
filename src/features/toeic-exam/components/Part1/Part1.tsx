import { Container } from "@mui/material";
import styles from "./Part1.module.scss";
import Part1Content from "./Part1Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part1 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1500px" },
      }}
    >
      <div className={styles.content}>
        <Part1Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part1;
