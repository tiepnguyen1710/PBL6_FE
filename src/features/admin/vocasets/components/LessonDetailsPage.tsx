import {
  Box,
  Button,
  CircularProgress,
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
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { Add, AddPhotoAlternate, Delete, Edit } from "@mui/icons-material";
import DefaultLessonImage from "../assets/default-lesson-img.webp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LessonCard } from "../../../../components/LessonCard";
import AdminTableContainer from "./AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLessonById, updateLesson } from "../api/lesson-api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import RoundedFileInput from "./RoundedFileInput";
import { useEffect, useState } from "react";
import VocabularyModel from "../../../../types/VocabularyModel";
import UpdateLessonRequest from "../types/UpdateLessonRequest";
import { toast } from "react-toastify";
import {
  fileList2Base64,
  vocaWordClassFullName2Abbr,
} from "../../../../utils/helper";
import queryClient from "../../../../queryClient";
import UpdateLessonResponse from "../types/UpdateLessonResponse";
import LessonModel from "../../../../types/LessonModel";
import CustomModal from "../../../../components/UI/CustomModal";
import { deleteVoca } from "../api/vocabulary-api";
import { Image } from "../../../../components/UI/Image";

interface LessonFormData {
  name: string;
  thumbnail: string | FileList;
}

const VOCA_PAGE_SIZE = 4;

const LessonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const navigate = useNavigate();

  const [deletedVocaId, setDeletedVocaId] = useState<string | null>(null);
  const openDeleteModal = Boolean(deletedVocaId);

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

  const updateLessonMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: (responseData: UpdateLessonResponse) => {
      toast.success("Lesson updated successfully");
      // queryClient.invalidateQueries({
      //   queryKey: ["lesson", { id: lessonId }],
      //   exact: true,
      // });
      queryClient.setQueryData(
        ["lesson", { id: lessonId }],
        (oldData: LessonModel) => ({
          ...oldData,
          name: responseData.name,
          thumbnail: responseData.thumbnail,
        }),
      );
    },
  });

  const [lessonImageSrc, setLessonImageSrc] = useState<string | null>(
    lesson?.thumbnail || DefaultLessonImage,
  );

  const lessonName = watch("name");

  const vocabularies = lesson?.listWord || [];

  const { page, setPage, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<VocabularyModel>(vocabularies, VOCA_PAGE_SIZE);

  const deleteVocaMutation = useMutation({
    mutationFn: deleteVoca,
    onSuccess: () => {
      toast.success("Delete word successfully!");
      queryClient.invalidateQueries({
        queryKey: ["lesson", { id: lessonId }],
        exact: true,
      });
      setPage(0);
    },
    onSettled: () => {
      // reset state
      setDeletedVocaId(null);
      deleteVocaMutation.reset();
    },
  });

  const handleSaveForm: SubmitHandler<LessonFormData> = async (data) => {
    console.log("Form data:", data);

    const updateRequest: UpdateLessonRequest = {
      id: lessonId!,
      name: data.name,
    };

    if (data.thumbnail instanceof FileList) {
      updateRequest.thumbnail = await fileList2Base64(data.thumbnail);
    }

    updateLessonMutation.mutate(updateRequest);
  };

  const handleClickNewVocaBtn = () => {
    navigate("/admin/voca/create?lessonId=" + lessonId);
  };

  const handleClickDeleteVoca = (vocaId: string) => {
    setDeletedVocaId(vocaId);
  };

  const handleDeleteLesson = () => {
    if (deletedVocaId) {
      deleteVocaMutation.mutate(deletedVocaId);
    }
  };

  useEffect(() => {
    if (lesson) {
      console.log("Lesson changes, reset form and lesson image src");
      resetLessonForm({
        name: lesson.name,
        thumbnail: lesson.thumbnail,
      });
      setLessonImageSrc(lesson.thumbnail);
    }
  }, [lesson, resetLessonForm]);

  if (!lessonId) {
    return <Navigate to="/admin/voca-set" />;
  }

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
            <Button
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={handleClickNewVocaBtn}
            >
              New
            </Button>
          </Stack>
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Word</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Meaning</TableCell>
                  <TableCell width={150} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((voca: VocabularyModel) => (
                  <TableRow>
                    <TableCell
                      sx={{
                        maxWidth: "50px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {voca.id}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={voca.thumbnail}
                        sx={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                    <TableCell>{voca.word}</TableCell>
                    <TableCell>
                      {vocaWordClassFullName2Abbr(voca.wordClass)}
                    </TableCell>
                    <TableCell>{voca.translate}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5}>
                        <Link to={`/admin/voca?id=${voca.id}`}>
                          <Button startIcon={<Edit />}>Edit</Button>
                        </Link>
                        <Button
                          startIcon={<Delete />}
                          color="error"
                          onClick={() => handleClickDeleteVoca(voca.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 73 * emptyRows, backgroundColor: "white" }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[VOCA_PAGE_SIZE]}
                    count={vocabularies.length}
                    rowsPerPage={VOCA_PAGE_SIZE}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>

          <CustomModal
            open={openDeleteModal}
            onClose={() => setDeletedVocaId(null)}
          >
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Do you want to delete this word?
              </Typography>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteLesson}
                  sx={{ width: "80px" }}
                >
                  {deleteVocaMutation.isPending ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    "Delete"
                  )}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setDeletedVocaId(null)}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </CustomModal>
        </Box>
      )}
    </>
  );
};

export default LessonDetailsPage;
