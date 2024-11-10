import {
  Box,
  Button,
  CardMedia,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import { mockVocaSets } from "../types/VocaSet";
import { Link, useParams } from "react-router-dom";
import React, { useRef, useState } from "react";
import VocaSet from "../../../../components/VocaSet";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import AdminTableContainer from "./AdminTableContainer";
import Lesson, { MOCK_LESSONS } from "../types/Lesson";
import useAdminTablePagination from "../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import SearchInput from "../../../../components/UI/SearchInput";
import { Add, Delete, Tune } from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal";
import VocaSetLevel from "../../../../types/VocaSetLevel";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";

interface VocaSetFormData {
  name: string;
  author: string;
  level: string;
  image: string;
}

const DEFAULT_VOCA_SET_IMAGE =
  "https://www.voca.vn/assets/file_upload/images/lets-go.png";

const VocaSetDetailsPage = () => {
  // Mock get voca set by id
  const routeParams = useParams<{ vocaSetId: string }>();
  const vocaSetId = Number(routeParams.vocaSetId);
  const vocaSet = mockVocaSets[vocaSetId];

  const [vocaSetFormData, setVocaSetFormData] = useState<VocaSetFormData>({
    name: vocaSet.name,
    author: vocaSet.author,
    level: vocaSet.level,
    image: vocaSet.image || DEFAULT_VOCA_SET_IMAGE,
  });

  const [preview, setPreview] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { page, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<Lesson>(MOCK_LESSONS, 10);

  const [searchLesson, setSearchLesson] = useState<string>("");

  const handleChangeFormInput = (field: string, newValue: unknown) => {
    setVocaSetFormData({
      ...vocaSetFormData,
      [field]: newValue,
    });
  };

  const handleClickChooseImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        handleChangeFormInput("image", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSearchLessonInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchLesson(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Vocabulary Set Details
        </Typography>
        <GoBackButton />
      </Stack>

      <form id="details-voca-set-form" style={{ marginBottom: "2rem" }}>
        <Stack direction="row" spacing={2} alignItems="start">
          <Stack spacing={0.5}>
            <CardMedia
              component="img"
              src={vocaSetFormData.image}
              sx={{ width: "250px", height: "140px" }}
            />
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              onClick={handleClickChooseImage}
              style={{ marginTop: "12px" }}
            >
              Choose Image
            </Button>
          </Stack>
          <Grid2 spacing={1} container sx={{ maxWidth: "600px" }}>
            <Grid2 size={12}>
              <RoundedInput
                name="name"
                label="Name"
                placeholder="Enter the filter name"
                padding="16.5px 14px"
                borderRadius={4}
                gap={0.5}
                labelColor="secondary.main"
                value={vocaSetFormData.name}
                onChange={(e) => handleChangeFormInput("name", e.target.value)}
              />
            </Grid2>
            <Grid2 size={8}>
              <RoundedInput
                name="author"
                label="Author"
                placeholder="Enter the filter author"
                padding="16.5px 14px"
                borderRadius={4}
                gap={0.5}
                labelColor="secondary.main"
                value={vocaSetFormData.author}
                onChange={(e) =>
                  handleChangeFormInput("author", e.target.value)
                }
              />
            </Grid2>
            <Grid2 size={4}>
              <BootstrapSelect
                label="Level"
                value={vocaSetFormData.level}
                onChange={(e) =>
                  handleChangeFormInput("level", e.target.value as string)
                }
                itemLabels={["All", "Beginner", "Intermediate", "Advanced"]}
                itemValues={["All", "Beginner", "Intermediate", "Advanced"]}
              />
            </Grid2>
            <Grid2 size={12}>
              <Stack direction="row" spacing={0.5} justifyContent="end">
                <Button
                  variant="outlined"
                  sx={{ float: "right", px: "24px" }}
                  onClick={() => setPreview(true)}
                >
                  Preview
                </Button>
                <Button
                  variant="contained"
                  sx={{ float: "right", px: "24px", minWidth: "110px" }}
                >
                  Save
                </Button>
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </form>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        sx={{ marginBottom: 1 }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Lessons
          </Typography>
          <SearchInput
            placeholder="Filter lessons by name"
            onChange={handleSearchLessonInputChange}
            sx={{ "& > input": { py: "4px" } }}
          />
        </Stack>
        <Button
          variant="outlined"
          startIcon={<Add />}
          size="small"
          onClick={() => setOpenNewModal(true)}
        >
          New
        </Button>
      </Stack>
      <AdminTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Number of vocabularies</TableCell>
              <TableCell width={150} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((lesson: Lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.id}</TableCell>
                <TableCell>{lesson.name}</TableCell>
                <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5}>
                    <Link to={`/admin/lesson/${lesson.id}`}>
                      <Button startIcon={<Tune />}>Manage</Button>
                    </Link>
                    <Button startIcon={<Delete />} color="error">
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{ height: 53 * emptyRows, backgroundColor: "white" }}
              >
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                count={MOCK_LESSONS.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </AdminTableContainer>

      <CustomModal
        open={preview}
        onClose={() => setPreview(false)}
        sx={{
          width: "400px",
          height: "400px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <VocaSet
          title={vocaSetFormData.name}
          author={vocaSetFormData.author}
          takenNumber="1.23m"
          qualification={vocaSetFormData.level}
          image={vocaSetFormData.image}
        />
      </CustomModal>

      <CustomModal
        open={openNewModal}
        onClose={() => setOpenNewModal(false)}
        sx={{ minWidth: "500px", padding: 4 }}
      >
        <Box sx={{}}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 2.5, textAlign: "center" }}
          >
            New Lesson
          </Typography>

          <form id="new-voca-set-form">
            <Stack spacing={1}>
              <TextField
                label="Lesson Name"
                helperText="Lesson name is required"
                error
                sx={{ width: "100%" }}
              />
              {/* <TextField label="Level" select sx={{ width: "100%" }}>
                {Object.values(VocaSetLevel).map((level) => (
                  <MenuItem key={level} value={level}>
                    {capitalizeFirstLetter(level)}
                  </MenuItem>
                ))}
              </TextField> */}
              <Stack direction="row" spacing={0.5} justifyContent="end">
                <Button
                  variant="outlined"
                  sx={{ px: "24px" }}
                  onClick={() => setOpenNewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ px: "24px", minWidth: "110px" }}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default VocaSetDetailsPage;
