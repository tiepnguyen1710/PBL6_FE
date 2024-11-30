import { Box, Typography } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import DefaultFolderImage from "../assets/default-folder.svg";
import React from "react";

interface FolderProps {
  name: string;
  pinnedWords: number;
}

const Folder: React.FC<FolderProps> = ({ name, pinnedWords }) => {
  return (
    <Box sx={{ display: "inline-block", textAlign: "center" }}>
      <LessonCard
        name={name}
        image={DefaultFolderImage}
        nameSx={{ fontSize: "18px" }}
      />
      <Typography
        component="span"
        sx={{ fontSize: "12px", color: "#afafaf", textAlign: "center" }}
      >
        Pinned: {pinnedWords || 0}
      </Typography>
    </Box>
  );
};
export default Folder;
