import { Stack } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import LearningLessonProgress from "./LearningLessonProgress";
import LessonPopup from "./LessonPopup";
import { useRef, useState } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpenPopup(!openPopup);

    // onClick?.();
  };

  return (
    <Stack spacing={1.25} sx={{ width: "205px", position: "relative" }}>
      <LessonCard
        name={name}
        image={thumbnail}
        onClickCard={handleClickCard}
        cardRef={cardRef}
      />
      <LearningLessonProgress sx={{ width: "173px" }} fullProgress={false} />
      <LessonPopup
        anchorEle={cardRef.current}
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
