import { Stack } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import LearningLessonProgress from "./LearningLessonProgress";

interface LessonCourseProps {
  name: string;
  thumbnail: string;
}

const LessonCourse: React.FC<LessonCourseProps> = ({ name, thumbnail }) => {
  return (
    <Stack spacing={1.25} sx={{ width: "205px" }}>
      <LessonCard name={name} image={thumbnail} />
      <LearningLessonProgress sx={{ width: "173px" }} fullProgress={false} />
    </Stack>
  );
};

export default LessonCourse;
