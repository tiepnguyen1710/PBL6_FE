import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { Link, useParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { MOCK_LESSONS } from "../types/Lesson";
import { Add, AddPhotoAlternate, Delete, Edit } from "@mui/icons-material";
import DefaultLessonImage from "../assets/default-lesson-img.webp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useFileInput from "../hooks/useFileInput";
import { LessonCard } from "./LessonCard";
import AdminTableContainer from "./AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import MOCK_VOCABULARIES from "../../../../utils/mockVocabularies";
import Vocabulary from "../../../../types/Vocabulary";

interface LessonFormData {
  name?: string;
  image?: string;
}

const LessonDetailsPage = () => {
  // Mock get lesson by id
  const routeParams = useParams<{ lessonId: string }>();
  const lessonId = routeParams.lessonId;
  const lesson = MOCK_LESSONS.find((lesson) => lesson.id === lessonId);

  const {
    register,
    control,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<LessonFormData>({
    defaultValues: {
      name: lesson?.name,
    },
  });

  const lessonName = watch("name");
  console.log("Lesson name:", lessonName);

  const {
    fileInputRef: imageInputRef,
    fileSrc: lessonImage,
    fileName: lessonImageFileName,
    chooseFile: chooseImage,
    handleChangeFileInput: handleImageChange,
  } = useFileInput(lesson?.image || DefaultLessonImage);

  console.log("Image files:", lessonImageFileName);

  const { page, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<Vocabulary>(MOCK_VOCABULARIES, 10);

  const handleSaveForm: SubmitHandler<LessonFormData> = (data) => {
    console.log("Form data:", data);
  };

  console.log("register", register("image"));

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Lesson Details
        </Typography>
        <GoBackButton />
      </Stack>

      <Stack direction="row" spacing={4}>
        <form
          id="details-lesson-form"
          style={{ marginBottom: "2rem" }}
          onSubmit={handleSubmit(handleSaveForm)}
        >
          <input
            type="file"
            {...register("image")}
            ref={(e) => {
              // temporary solution, can separate the register("image") in the component
              register("image").ref(e); // Register input with React Hook Form
              imageInputRef.current = e; // Store ref in imageInputRef
            }}
            onChange={(e) => {
              register("image").onChange(e); // Call React Hook Form onChange to update form state
              handleImageChange(e);
            }}
            style={{ display: "none" }}
          />
          <Stack direction="row" spacing={2} alignItems="start">
            <Grid2 spacing={1} container sx={{ maxWidth: "400px" }}>
              <Grid2 size={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Name"
                      placeholder="Enter the lesson name"
                      padding="16.5px 14px"
                      borderRadius={4}
                      gap={0.5}
                      labelColor="secondary.main"
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={12}>
                <RoundedInput
                  label="Lesson image"
                  borderRadius={4}
                  gap={0.5}
                  labelColor="secondary.main"
                  padding="16.5px 14px"
                  value={lessonImageFileName}
                  readOnly
                  endAdornment={
                    <IconButton onClick={chooseImage}>
                      <AddPhotoAlternate />
                    </IconButton>
                  }
                />
              </Grid2>

              <Grid2 size={12}>
                <Stack direction="row" spacing={0.5} justifyContent="end">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ float: "right", px: "24px", minWidth: "110px" }}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid2>
            </Grid2>
          </Stack>
        </form>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        {lesson && <LessonCard name={lessonName || ""} image={lessonImage} />}
      </Stack>

      {/* Vocabularies */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        sx={{ marginBottom: 1 }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Vocabularies
          </Typography>
        </Stack>
        <Button variant="outlined" startIcon={<Add />} size="small" sx={{}}>
          New
        </Button>
      </Stack>
      <AdminTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Word</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Meaning</TableCell>
              <TableCell width={150} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((voca: Vocabulary) => (
              <TableRow>
                <TableCell>{voca.id}</TableCell>
                <TableCell>{voca.word}</TableCell>
                <TableCell>{voca.type}</TableCell>
                <TableCell>{voca.meaning}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5}>
                    <Link to={`/admin/voca/${voca.id}`}>
                      <Button startIcon={<Edit />}>Edit</Button>
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
                count={MOCK_VOCABULARIES.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </AdminTableContainer>
    </Box>
  );
};

export default LessonDetailsPage;
