import { Container } from "@mui/material";
import styles from "./Part5.module.scss";
import Part5Content from "./Part5Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part5 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1500px" },
      }}
    >
      <div className={styles.content}>
        <Part5Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part5;
