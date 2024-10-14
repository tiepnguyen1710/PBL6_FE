import { Container } from "@mui/material";
import styles from "./Part6.module.scss";
import Part6Content from "./Part6Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part6 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1900px" },
      }}
    >
      <div className={styles.content}>
        <Part6Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part6;
