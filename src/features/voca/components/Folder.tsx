import { Box, Typography } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import DefaultFolderImage from "../assets/default-folder.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

interface FolderProps {
  id: string; // folderId
  name: string;
  pinnedWords: number;
}

const Folder: React.FC<FolderProps> = ({ name, pinnedWords, id }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "inline-block", textAlign: "center" }}>
      <LessonCard
        name={name}
        image={DefaultFolderImage}
        nameSx={{ fontSize: "18px" }}
        onClickCard={() => navigate(`/personal-word-folder/${id}`)}
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
