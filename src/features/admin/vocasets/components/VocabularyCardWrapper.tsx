import { Paper } from "@mui/material";
import { VocaburaryCardState } from "./VocabularyCard";
import React from "react";

function getCardStyle(state: VocaburaryCardState) {
  switch (state) {
    case "success":
      return {
        borderColor: "#A5ED6E",
        backgroundColor: "#EAFFD9",
        color: "#58CC02",
      };
    case "error":
      return {
        borderColor: "#D33113",
        backgroundColor: "#FFEEEE",
        color: "#FF4B4B",
      };
    default:
      return {
        backgroundColor: "white",
      };
  }
}

const VocabularyCardWrapper: React.FC<{
  children: React.ReactNode;
  state?: VocaburaryCardState;
}> = ({ children, state = VocaburaryCardState.DEFAULT }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "184px",
        height: "240px",
        borderRadius: "10px",
        borderWidth: "2px",
        cursor: "pointer",
        // backgroundColor: "white",
        position: "relative",
        ...getCardStyle(state),
      }}
    >
      {children}
    </Paper>
  );
};

export default VocabularyCardWrapper;
