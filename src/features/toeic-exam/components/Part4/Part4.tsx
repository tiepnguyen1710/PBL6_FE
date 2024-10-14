import { Container } from "@mui/material";
import styles from "./Part4.module.scss";
import Part4Content from "./Part4Content";
import SubMitBox from "../SubmitBox/SubmitBox";
const Part4 = () => {
  return (
    <Container
      maxWidth="lg"
      className={styles.mainContent}
      sx={{
        maxWidth: { lg: "1000px", xl: "1500px" },
      }}
    >
      <div className={styles.content}>
        <Part4Content />
      </div>
      <div className={styles.submitBox}>
        <SubMitBox />
      </div>
    </Container>
  );
};

export default Part4;
