import { Container } from "@mui/material";
import ExamsList from "../ExamsList/ExamsList";
import Skills from "../Skills/Skills";
import styles from "./ExamsListPage.module.scss";
import Paginate from "../Paginate/Paginate";
import InforUserBox from "../InforUserBox/InforUserBox";

const ExamsListPage = () => {
  return (
    //style={{ background: "#F8F9FA" }}
    <div>
      <Container
        maxWidth="lg"
        className={styles.mainContent}
        sx={{
          maxWidth: { lg: "1000px", xl: "1300px" },
        }}
      >
        <div className={styles.leftContent}>
          <div className={styles.skillsContainer}>
            <Skills />
          </div>
          <div className={styles.examsList}>
            <ExamsList />
          </div>
          <div className={styles.paginate}>
            <Paginate />
          </div>
        </div>
        <div className={styles.rightContent}>
          <InforUserBox />
        </div>
      </Container>
    </div>
  );
};

export default ExamsListPage;
