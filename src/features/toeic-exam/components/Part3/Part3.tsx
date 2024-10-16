import { Container } from "@mui/material";
import styles from "./Part3.module.scss";
import Part3Content from "./Part3Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part3 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1500px" },
      }}
    >
      <div className={styles.content}>
        <Part3Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part3;
