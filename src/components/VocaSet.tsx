import { CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import CardTitle from "../features/home/components/CardTitle";

import DefaultVocaSetImg from "../assets/images/voca/default.png";
import StudentIcon from "../features/home/components/StudentIcon";
import CustomCard from "../features/home/components/CustomCard";
import { capitalizeFirstLetter } from "../utils/stringFormatter";

export interface VocaSetProps {
  title: string;
  qualification?: string;
  topic?: string;
  author?: string;
  takenNumber: string;
  image?: string;
}

const VocaSet: React.FC<VocaSetProps> = ({
  title,
  qualification,
  topic,
  author,
  takenNumber,
  image = DefaultVocaSetImg,
}) => {
  const chipStyleTopic = {
    backgroundColor: "#ff6f00",
    color: "white",
  };

  const chipStyleQualification = {
    backgroundColor: "success.main",
    color: "white",
  };

  return (
    <CustomCard
      sx={{
        width: "250px",
      }}
    >
      <CardMedia component="img" height="140" image={image} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Stack direction="row" spacing={0.25}>
          {qualification && (
            <Chip
              label={capitalizeFirstLetter(qualification)}
              sx={{ ...chipStyleQualification }}
            />
          )}
          {topic && <Chip label={topic} sx={{ ...chipStyleTopic }} />}
        </Stack>

        <CardTitle>{title}</CardTitle>

        <Stack direction="row" justifyContent="space-between" alignItems="end">
          <Stack direction="row" spacing={0.5} alignItems="end">
            <StudentIcon sx={{ fontSize: 20 }} />
            <Typography component="span" sx={{ lineHeight: 1 }}>
              {takenNumber}
            </Typography>
          </Stack>
          <Typography fontSize={12} sx={{ fontWeight: "500" }}>
            by{" "}
            <Typography
              component="span"
              fontSize={12}
              sx={{ fontWeight: "500" }}
              color="primary.main"
            >
              {author || "EngFlash"}
            </Typography>
          </Typography>
        </Stack>
      </CardContent>
    </CustomCard>
  );
};

export default VocaSet;
