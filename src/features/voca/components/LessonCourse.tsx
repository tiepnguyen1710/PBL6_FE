import { Stack } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import LearningLessonProgress from "./LearningLessonProgress";
import LessonPopup from "./LessonPopup";
import { useState } from "react";

interface LessonCourseProps {
  id: string; // lesson id
  name: string;
  thumbnail: string;
  onClick?: () => void;
}

const LessonCourse: React.FC<LessonCourseProps> = ({
  id,
  name,
  thumbnail,
  onClick,
}) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpenPopup(true);

    // onClick?.();
  };

  return (
    <Stack spacing={1.25} sx={{ width: "205px", position: "relative" }}>
      <LessonCard name={name} image={thumbnail} onClickCard={handleClickCard} />
      <LearningLessonProgress sx={{ width: "173px" }} fullProgress={false} />
      <LessonPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        lessonId={id}
        lessonName={name}
        retainedWords={0}
        totalWords={0}
      />
    </Stack>
  );
};

export default LessonCourse;
