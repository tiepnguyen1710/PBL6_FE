import { Stack } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import LearningLessonProgress from "./LearningLessonProgress";

interface LessonCourseProps {
  name: string;
  thumbnail: string;
  onClick?: () => void;
}

const LessonCourse: React.FC<LessonCourseProps> = ({
  name,
  thumbnail,
  onClick,
}) => {
  return (
    <Stack spacing={1.25} sx={{ width: "205px" }}>
      <LessonCard name={name} image={thumbnail} onClickCard={onClick} />
      <LearningLessonProgress sx={{ width: "173px" }} fullProgress={false} />
    </Stack>
  );
};

export default LessonCourse;
