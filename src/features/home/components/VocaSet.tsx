import { CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import CardTitle from "./CardTitle";

import DefaultVocaSetImg from "../../../assets/images/voca/default.png";
import StudentIcon from "./StudentIcon";
import CustomCard from "./CustomCard";

interface VocaSetProps {
  title: string;
  qualification?: string;
  topic?: string;
  author?: string;
  takenNumber: string;
}

const VocaSet: React.FC<VocaSetProps> = ({
  title,
  qualification,
  topic,
  author,
  takenNumber,
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
        maxWidth: "250px",
      }}
    >
      <CardMedia component="img" height="140" image={DefaultVocaSetImg} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={0.25}>
            {qualification && (
              <Chip label={qualification} sx={{ ...chipStyleQualification }} />
            )}
            {topic && <Chip label={topic} sx={{ ...chipStyleTopic }} />}
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
        <CardTitle>{title}</CardTitle>
        <Stack direction="row" spacing={0.5} alignItems="end">
          <StudentIcon sx={{ fontSize: 20 }} />
          <Typography component="span" sx={{ lineHeight: 1 }}>
            {takenNumber}
          </Typography>
        </Stack>
      </CardContent>
    </CustomCard>
  );
};

export default VocaSet;
