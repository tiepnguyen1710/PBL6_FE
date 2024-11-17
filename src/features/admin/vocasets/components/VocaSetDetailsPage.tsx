import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
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
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VocaSet from "../../../../components/VocaSet";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import AdminTableContainer from "./AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import SearchInput from "../../../../components/UI/SearchInput";
import { Add, Delete, Tune } from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVocaSetById, updateVocaSet } from "../api/voca-set-api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import useFileInput from "../hooks/useFileInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import VocaSetLevel from "../../../../types/VocaSetLevel";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import UpdateVocaSetRequest from "../types/UpdateVocaSetRequest";
import { toast } from "react-toastify";
import { fileList2Base64 } from "../../../../utils/helper";
import NewLessonModal from "./NewLessonModal";
import LessonModel from "../../../../types/LessonModel";
import { deleteLesson } from "../api/lesson-api";
import { Image } from "../../../../components/UI/Image";

interface VocaSetFormData {
  id: string;
  name: string;
  level: string;
  thumbnail: string | FileList;
}

const LESSON_PAGE_SIZE = 2;

const VocaSetDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const vocaSetId = searchParams.get("id");

  const { data, isLoading } = useQuery({
    queryKey: ["vocaSet", { id: vocaSetId }],
    queryFn: () => getVocaSetById(vocaSetId!),
    enabled: !!vocaSetId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (request: UpdateVocaSetRequest) => {
      const responseData = await updateVocaSet(request);
      return responseData;
    },
    onSuccess: (responseData) => {
      toast.success("Update successfully!");
      queryClient.setQueryData(["vocaSet", { id: vocaSetId }], responseData);
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      toast.success("Delete lesson successfully!");
      queryClient.invalidateQueries({
        queryKey: ["vocaSet", { id: vocaSetId }],
        exact: true,
      });
      setPage(0);
    },
    onSettled: () => {
      // reset state
      setDeletedLessonId(null);
      deleteLessonMutation.reset();
    },
  });

  const {
    control,
    register,
    reset,
    getValues,
    // formState: { errors },
    handleSubmit,
  } = useForm<VocaSetFormData>();

  const [preview, setPreview] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const [searchLesson, setSearchLesson] = useState<string>("");
  const [deletedLessonId, setDeletedLessonId] = useState<string | null>(null);

  const openDeleteModal = Boolean(deletedLessonId);

  const lessons = data?.__topics__ || [];

  const filteredlessons = lessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchLesson),
  );
  const { page, setPage, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<LessonModel>(filteredlessons, LESSON_PAGE_SIZE);

  // console.log("pageData", pageData);
  // console.log("data.__topic__", data?.__topics__);
  // console.log("data", data);

  const {
    fileInputRef,
    fileSrc,
    setFileSrc,
    chooseFile,
    handleChangeFileInput,
  } = useFileInput();

  const formData = getValues();
  console.log("form data", formData);

  useEffect(() => {
    if (data) {
      const vocaSetFormData: VocaSetFormData = {
        id: data.id,
        name: data.name,
        level: data.level,
        thumbnail: data.thumbnail,
      };
      reset(vocaSetFormData);
      setFileSrc(data.thumbnail);
    }
  }, [data, reset, setFileSrc]);

  const handleSearchLessonInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchLesson(event.target.value);
    setPage(0);
  };

  const handleSaveVocaSet: SubmitHandler<VocaSetFormData> = async (data) => {
    console.log("Save voca set", data);

    const request: UpdateVocaSetRequest = {
      id: data.id,
      name: data.name,
      level: data.level as VocaSetLevel,
    };

    if (data.thumbnail instanceof FileList) {
      request.thumbnail = await fileList2Base64(data.thumbnail);
    }

    mutate(request);
  };

  const handleClickDeleteLesson = (lessonId: string) => {
    setDeletedLessonId(lessonId);
  };

  const handleDeleteLesson = () => {
    if (deletedLessonId) {
      deleteLessonMutation.mutate(deletedLessonId);
      // deleteLessonMutation.mutate("adjfalf");
    }
  };

  if (!vocaSetId) {
    return <Navigate to="/admin/voca-set/" />;
  }

  console.log("register level", register("level"));

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
              Vocabulary Set Details
            </Typography>
            <GoBackButton />
          </Stack>
          <form
            id="details-voca-set-form"
            onSubmit={handleSubmit(handleSaveVocaSet)}
            style={{ marginBottom: "2rem" }}
          >
            <Stack direction="row" spacing={2} alignItems="start">
              <Stack spacing={0.5}>
                <CardMedia
                  component="img"
                  src={fileSrc}
                  sx={{ width: "250px", height: "140px" }}
                />
                <input
                  type="file"
                  {...register("thumbnail")}
                  ref={(e) => {
                    register("thumbnail").ref(e);
                    fileInputRef.current = e;
                  }}
                  onChange={(e) => {
                    handleChangeFileInput(e);
                    register("thumbnail").onChange(e);
                  }}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  onClick={chooseFile}
                  style={{ marginTop: "12px" }}
                >
                  Choose Image
                </Button>
              </Stack>
              <Grid2 spacing={1} container sx={{ maxWidth: "500px" }}>
                <Grid2 size={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Name"
                        placeholder="Enter the filter name"
                        padding="16.5px 14px"
                        borderRadius={4}
                        gap={0.5}
                        labelColor="secondary.main"
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <BootstrapSelect
                        {...field}
                        label="Level"
                        itemLabels={Object.values(VocaSetLevel).map(
                          capitalizeFirstLetter,
                        )}
                        itemValues={Object.values(VocaSetLevel)}
                        defaultValue={data?.level}
                      />
                    )}
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
                      type="submit"
                      sx={{ float: "right", px: "24px", minWidth: "110px" }}
                      disabled={isPending}
                    >
                      {isPending ? <CircularProgress size={20} /> : "Save"}
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
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Number of vocabularies</TableCell>
                  <TableCell width={150} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((lesson: LessonModel) => (
                  <TableRow key={lesson.id}>
                    <TableCell
                      sx={{
                        maxWidth: "50px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {lesson.id}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={lesson.thumbnail}
                        sx={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                    <TableCell>{lesson.name}</TableCell>
                    <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5}>
                        <Link to={`/admin/lesson?id=${lesson.id}`}>
                          <Button startIcon={<Tune />}>Manage</Button>
                        </Link>
                        <Button
                          startIcon={<Delete />}
                          color="error"
                          onClick={() => handleClickDeleteLesson(lesson.id)}
                        >
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
                    rowsPerPageOptions={[LESSON_PAGE_SIZE]}
                    count={data?.__topics__?.length || 0}
                    rowsPerPage={LESSON_PAGE_SIZE}
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
            <></>
            <VocaSet
              title={formData.name}
              author={"EngFlash"}
              takenNumber="1.23m"
              qualification={formData.level}
              image={fileSrc}
            />
          </CustomModal>

          <NewLessonModal
            vocaSetId={vocaSetId}
            open={openNewModal}
            onClose={() => setOpenNewModal(false)}
            onCancel={() => setOpenNewModal(false)}
          />

          <CustomModal
            open={openDeleteModal}
            onClose={() => setDeletedLessonId(null)}
          >
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Do you want to delete this lesson?
              </Typography>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteLesson}
                  sx={{ width: "80px" }}
                >
                  {deleteLessonMutation.isPending ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    "Delete"
                  )}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setDeletedLessonId(null)}
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

export default VocaSetDetailsPage;
