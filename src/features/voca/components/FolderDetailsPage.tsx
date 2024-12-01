import { Box, Stack, Typography } from "@mui/material";
import Content from "../../../components/layout/Content";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUserFolderById } from "../api/user-folder";
import { FolderOpen } from "@mui/icons-material";
import ListWords from "./ListWords";
import { VocabularyCardState } from "../../../components/VocabularyCard";
import Link from "../../../components/UI/Link";

const FolderDetailsPage = () => {
  const { folderId } = useParams();

  const { data: folder } = useQuery({
    queryKey: ["userFolders", { id: folderId }],
    queryFn: () => getUserFolderById(folderId!),
    enabled: !!folderId,
  });

  if (!folder) {
    return <Navigate to="/personal-word-folder" />;
  }

  return (
    <Content withoutFooter>
      <Box sx={{ maxWidth: "878px", mx: "auto", padding: "27px 15px 48px" }}>
        {/* help info */}
        <Box
          sx={{
            padding: "20px 20px 20px 25px",
            borderRadius: "14px",
            border: "2px solid #ddd",
          }}
        >
          <Typography
            variant="inherit"
            sx={{ fontSize: "24px", fontWeight: "bold" }}
          >
            Learning and Practice
          </Typography>
          <Typography variant="inherit" sx={{ fontSize: "15px", marginTop: 1 }}>
            You can use EngFlash's vocabulary learning feature after you pin at
            least 4 words.
          </Typography>
        </Box>

        {/*  folder details */}
        <Box sx={{ marginTop: 1.5 }}>
          <Stack direction="row" spacing={0.5}>
            <FolderOpen />
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              {folder?.name}
            </Typography>
            <Link
              to="/personal-word-folder"
              sx={{
                color: "primary.main",
                lineHeight: 1.5,
                marginLeft: "auto !important",
              }}
            >
              All folders
            </Link>
          </Stack>
          <Typography>{folder?.description}</Typography>
        </Box>
      </Box>

      {/* List of pinned words */}
      <Box sx={{ backgroundColor: "#F8F8F8" }}>
        <Box sx={{ maxWidth: "878px", mx: "auto", padding: "27px 15px 48px" }}>
          <ListWords
            title="Pinned words"
            vocabularies={folder.words}
            status={VocabularyCardState.DEFAULT}
          />

          {folder.words.length == 0 && (
            <Typography>You haven't pinned any word yet</Typography>
          )}
        </Box>
      </Box>
    </Content>
  );
};

export default FolderDetailsPage;
