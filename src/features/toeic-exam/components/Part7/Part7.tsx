import { Container } from "@mui/material";
import styles from "./Part7.module.scss";
import Part7Content from "./Part7Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part7 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1900px" },
      }}
    >
      <div className={styles.content}>
        <Part7Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part7;
