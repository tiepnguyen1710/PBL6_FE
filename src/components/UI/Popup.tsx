import { Box, SxProps } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";

export interface PopupProps {
  open?: boolean;
  onClose: () => void;
  sx?: SxProps;
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  open = true,
  onClose,
  sx,
  children,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside or losing focus
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Box
      ref={popupRef}
      sx={{
        position: "absolute",
        display: open ? "block" : "none",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Popup;
