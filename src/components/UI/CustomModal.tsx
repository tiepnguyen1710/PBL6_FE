import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, SxProps } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sx?: SxProps;
}
const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  sx,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          <Paper sx={sx}>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", right: 10, top: 10 }}
            >
              <Close />
            </IconButton>
            {children}
          </Paper>
        </motion.div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
