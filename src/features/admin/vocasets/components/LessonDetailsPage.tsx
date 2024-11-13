import {
  Box,
  Button,
  Divider,
  Grid2,
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
import { Link, useSearchParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { Add, AddPhotoAlternate, Delete, Edit } from "@mui/icons-material";
import DefaultLessonImage from "../assets/default-lesson-img.webp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LessonCard } from "./LessonCard";
import AdminTableContainer from "./AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import MOCK_VOCABULARIES from "../../../../utils/mockVocabularies";
import Vocabulary from "../../../../types/Vocabulary";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api/lesson-api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import RoundedFileInput from "./RoundedFileInput";
import { useEffect, useState } from "react";

interface LessonFormData {
  name: string;
  thumbnail: string;
}

const LessonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", { id: lessonId }],
    queryFn: () => getLessonById(lessonId!),
    enabled: !!lessonId,
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset: resetLessonForm,
    // formState: { errors },
  } = useForm<LessonFormData>({
    defaultValues: {
      name: lesson?.name,
      thumbnail: lesson?.thumbnail,
    },
  });

  const [lessonImageSrc, setLessonImageSrc] = useState<string | null>(
    lesson?.thumbnail || DefaultLessonImage,
  );

  const lessonName = watch("name");

  const { page, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<Vocabulary>(MOCK_VOCABULARIES, 10);

  const handleSaveForm: SubmitHandler<LessonFormData> = (data) => {
    console.log("Form data:", data);
  };

  useEffect(() => {
    if (lesson) {
      resetLessonForm({
        name: lesson.name,
        thumbnail: lesson.thumbnail,
      });
      setLessonImageSrc(lesson.thumbnail);
    }
  }, [lesson, resetLessonForm]);

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open />
      ) : (
        <Box sx={{ padding: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
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
                    <RoundedFileInput
                      register={register("thumbnail")}
                      label="Lesson image"
                      borderRadius={4}
                      gap={0.5}
                      labelColor="secondary.main"
                      padding="16.5px 14px"
                      defaultFileSrc={lesson?.thumbnail}
                      iconButton={<AddPhotoAlternate />}
                      onChangeFile={(newFileSrc) =>
                        setLessonImageSrc(newFileSrc)
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
            {lesson && (
              <LessonCard
                name={lessonName || ""}
                image={lessonImageSrc || ""}
              />
            )}
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
      )}
    </>
  );
};

export default LessonDetailsPage;
