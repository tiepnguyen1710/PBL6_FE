import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../components/UI/CustomModal";
import BoldStrokeButton from "./BoldStrokeButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import FolderSelectItem from "./FolderSelectItem";
import { AddCircle } from "@mui/icons-material";
import { getUserFolders, pinWordToFolder } from "../api/user-folder";
import { useState } from "react";
import { toast } from "react-toastify";

interface PinWordModalModalProps extends CustomModalProps {
  onClickNewFolderButton?: () => void;
  vocaId: string;
}

const PinWordModalModal: React.FC<PinWordModalModalProps> = ({
  open,
  onClose,
  onClickNewFolderButton,
  vocaId,
}) => {
  const { data: folders } = useQuery({
    queryKey: ["userFolders"],
    queryFn: getUserFolders,
  });

  const [validateError, setValidateError] = useState<string | null>(null);

  const pinWordMutation = useMutation({
    mutationFn: (folderId: string) => pinWordToFolder(folderId, vocaId),
    onSuccess: () => {
      onClose();
      toast.success("Word has been pinned");
    },
  });

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const handlePinWord = () => {
    if (!selectedFolderId) {
      setValidateError("Please select a folder");
      return;
    }

    pinWordMutation.mutate(selectedFolderId);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      containerSx={{
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ padding: 3, minWidth: "578px", py: 2 }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: 1.5, textAlign: "center" }}
        >
          Pin Word
        </Typography>

        {validateError && (
          <Alert
            severity="error"
            onClose={() => setValidateError("")}
            sx={{ marginBottom: "15px" }}
          >
            {validateError}
          </Alert>
        )}

        <Typography sx={{ fontSize: "18px", marginBottom: "35px" }}>
          Select the folder you want to save to
        </Typography>

        {/* Folder List */}
        <Box sx={{ marginBottom: 1, maxHeight: "255px", overflowY: "auto" }}>
          <Stack spacing="15px" sx={{}}>
            {folders?.map((folder) => (
              <FolderSelectItem
                key={folder.id}
                name={folder.name}
                totalWords={folder.words.length}
                onSelect={() => setSelectedFolderId(folder.id)}
                selected={folder.id === selectedFolderId}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{ textAlign: "center", marginTop: "25px", marginBottom: "80px" }}
        >
          <Button
            startIcon={<AddCircle />}
            sx={{
              fontSize: "19px",
              mx: "auto",
              "& .MuiSvgIcon-root": {
                fontSize: "48px",
              },
            }}
            onClick={onClickNewFolderButton}
          >
            New folder
          </Button>
        </Box>

        <Box sx={{ marginTop: "10px" }}>
          <BoldStrokeButton
            type="submit"
            variant="contained"
            sx={{
              px: 3,
              display: "block",
              marginLeft: "auto",
              borderBottomWidth: "4px",
            }}
            disabled={pinWordMutation.isPending}
            onClick={handlePinWord}
          >
            {pinWordMutation.isPending ? <CircularProgress size={20} /> : "Pin"}
          </BoldStrokeButton>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default PinWordModalModal;
