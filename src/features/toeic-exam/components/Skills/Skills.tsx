import { FormControl, OutlinedInput } from "@mui/material";
import styles from "./Skills.module.scss";
import Button from "@mui/material/Button";
import { FaBook, FaBorderAll, FaHeadphones } from "react-icons/fa6";

interface Skill {
  name: string;
  icon: JSX.Element;
}

const skills_arr: Skill[] = [
  {
    name: "All Skills",
    icon: <FaBorderAll />,
  },
  {
    name: "Listening",
    icon: <FaHeadphones />,
  },
  {
    name: "Reading",
    icon: <FaBook />,
  },
];

const Skills = () => {
  return (
    <>
      <div className={styles.title}>TOEIC EXAM LIBRARY</div>
      <div className={styles.skills}>
        {skills_arr.map((skill, index) => {
          return (
            <div id={`button ${index}`}>
              <Button
                variant="outlined"
                sx={{
                  padding: "6px 30px",
                  borderRadius: "20px",
                  fontSize: "20px",
                  gap: "8px",
                  "&:hover": {
                    color: "white",
                    background: "var(--color-primary-main)",
                  },
                }}
              >
                <span className={styles.skillIcon}>{skill.icon}</span>
                <span className={styles.skillName}>{skill.name}</span>
              </Button>
            </div>
          );
        })}
      </div>
      <div className={styles.search}>
        <FormControl sx={{ width: "85ch" }}>
          <OutlinedInput
            sx={{ height: "5ch", borderRadius: "20px" }}
            placeholder="Enter test name"
          />
        </FormControl>
      </div>
    </>
  );
};

export default Skills;
