import { Container } from "@mui/material";
import styles from "./Part2.module.scss";
import Part2Content from "./Part2Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part2 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1500px" },
      }}
    >
      <div className={styles.content}>
        <Part2Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part2;
