import {
  Box,
  Button,
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
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import VocaSetRow from "./VocaSetRow";
import AdminTableContainer from "./AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination.ts";
import {
  Add,
  AddPhotoAlternate,
  FilterAlt,
  FilterAltOff,
} from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal.tsx";
import VocaSetLevel from "../../../../types/VocaSetLevel.ts";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter.ts";
import TextFieldFileInput from "./TextFieldFileInput.tsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image } from "../../../../components/UI/Image.tsx";
import {
  fileList2Base64,
  getPlaceholderImage,
} from "../../../../utils/helper.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVocaSet, deleteVocaSet } from "../api/voca-set-api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VocaSetModel from "../../../../types/VocaSetModel.ts";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop.tsx";
import { getAllVocaSets } from "../../../shared-apis/vocaset-api.ts";

interface NewVocaSetFormData {
  name: string;
  level: string;
  thumbnail: string | FileList;
}

interface VocaSetFilterFormData {
  filterName: string;
  filterLevel: string;
}

const newVocaSetRules = {
  name: {
    required: "Name is required",
  },
  level: {
    required: "Level is required",
  },
  thumbnail: {
    required: "Thumbnail is required",
  },
};

const DEFAULT_FILTER_FORM_DATA: VocaSetFilterFormData = {
  filterName: "",
  filterLevel: "all",
};

const VOCASET_PAGE_SIZE = 4;

const VocaIndexPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [deletedVocaSet, setDeletedVocaSet] = useState<string | null>(null);

  const openDeleteModal = deletedVocaSet !== null;

  const {
    register,
    // control,
    formState: { errors: validationErrors },
    handleSubmit,
  } = useForm<NewVocaSetFormData>();

  const [newThumbnail, setNewThumbnail] = useState<string>(
    getPlaceholderImage(250, 140),
  );

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewVocaSetFormData) => {
      const responseData = await createVocaSet({
        name: data.name,
        level: data.level,
        thumbnail: data.thumbnail as string,
      });

      return responseData;
    },
    onSuccess: (responseData: VocaSetModel) => {
      console.log("Post successfull, reponseData", responseData);
      navigate(`/admin/voca-set/details?id=${responseData.id}`);
      queryClient.setQueryData(
        ["vocaSet", { id: responseData.id }],
        responseData,
      );
      toast.success("Create new vocabulary set successfully!");
    },
  });

  const { data: vocaSetData, isLoading } = useQuery({
    queryKey: ["vocaSet"],
    queryFn: getAllVocaSets,
  });

  const [vocaSets, setVocaSets] = useState<VocaSetModel[] | null>();

  const {
    page,
    setPage,
    emptyRows,
    pageData,
    handleChangePage,
    invalidatePage,
  } = useAdminTablePagination<VocaSetModel>(vocaSets || [], VOCASET_PAGE_SIZE);

  const {
    reset: resetFilterForm,
    control,
    handleSubmit: handleFilter,
  } = useForm<VocaSetFilterFormData>({
    defaultValues: DEFAULT_FILTER_FORM_DATA,
  });

  const deleteVocaSetMutation = useMutation({
    mutationFn: deleteVocaSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocaSet"] });
      toast.success("Delete vocabulary set successfully!");

      invalidatePage(vocaSets!.length - 1);
    },
    onSettled: () => {
      // reset state
      setDeletedVocaSet(null);
      deleteVocaSetMutation.reset();
    },
  });

  useEffect(() => {
    setVocaSets(vocaSetData);
  }, [vocaSetData]);

  const handleCreateVocaSet = async (data: NewVocaSetFormData) => {
    console.log("Submit new voca set");
    data.thumbnail = await fileList2Base64(data.thumbnail as FileList);
    console.log(data);

    mutate(data);
  };

  const handleFilterTable: SubmitHandler<VocaSetFilterFormData> = (
    formData,
  ) => {
    const { filterName, filterLevel } = formData;

    const filteredData = vocaSetData?.filter(
      (vocaSet) =>
        (filterName === "" ||
          vocaSet.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (filterLevel === "all" || vocaSet.level === filterLevel),
    );

    setVocaSets(filteredData);
    setPage(0);
  };

  const handleResetFilter = () => {
    setVocaSets(vocaSetData);
    setPage(0);

    resetFilterForm(DEFAULT_FILTER_FORM_DATA);
  };

  const handleDeleteVocaSet = () => {
    if (deletedVocaSet) {
      deleteVocaSetMutation.mutate(deletedVocaSet);
    }
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Vocabulary Sets
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setOpenNewModal(true)}
          >
            New
          </Button>
        </Stack>

        <form
          id="filter-voca-sets-form"
          style={{ marginBottom: "2rem" }}
          onSubmit={handleFilter(handleFilterTable)}
        >
          <Grid2 spacing={1} container sx={{ maxWidth: "900px" }}>
            <Grid2 size={5}>
              <Controller
                name="filterName"
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
            <Grid2 size={3}>
              <Controller
                name="filterLevel"
                control={control}
                render={({ field }) => (
                  <BootstrapSelect
                    {...field}
                    label="Level"
                    defaultValue="all"
                    itemLabels={["All", "Beginner", "Intermediate", "Advanced"]}
                    itemValues={["all", "beginner", "intermediate", "advanced"]}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={2} display="flex" alignItems="end">
              <Button
                type="submit"
                variant="contained"
                startIcon={<FilterAlt />}
                sx={{ py: "12px", px: 3, marginBottom: "3px" }}
              >
                Filter
              </Button>
            </Grid2>
            <Grid2 size={2} display="flex" alignItems="end">
              <Button
                onClick={handleResetFilter}
                type="reset"
                variant="outlined"
                startIcon={<FilterAltOff />}
                sx={{ py: "12px", px: 3, marginBottom: "3px" }}
              >
                Clear
              </Button>
            </Grid2>
          </Grid2>
        </form>

        {isLoading ? (
          <CustomBackdrop open />
        ) : (
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={100}>ID</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell align="right">Taken Students</TableCell>
                  <TableCell align="right">Lessons</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((vocaSet: VocaSetModel) => (
                  <VocaSetRow
                    key={vocaSet.id}
                    vocaSet={vocaSet}
                    onDelete={() => setDeletedVocaSet(vocaSet.id)}
                  />
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                      backgroundColor: "white",
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[VOCASET_PAGE_SIZE]}
                    count={vocaSets?.length || 0}
                    rowsPerPage={VOCASET_PAGE_SIZE}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>
        )}
      </Box>

      {/*  New voca set modal */}
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
            New Vocabulary Set
          </Typography>

          <form
            id="new-voca-set-form"
            onSubmit={handleSubmit(handleCreateVocaSet)}
          >
            <Stack spacing={1}>
              <TextField
                label="Name"
                helperText={validationErrors.name?.message}
                error={!!validationErrors.name}
                {...register("name", newVocaSetRules.name)}
                sx={{ width: "100%" }}
              />
              <TextField
                label="Level"
                select
                helperText={validationErrors.level?.message}
                error={!!validationErrors.level}
                {...register("level", newVocaSetRules.level)}
                sx={{ width: "100%" }}
              >
                {Object.values(VocaSetLevel).map((level) => (
                  <MenuItem key={level} value={level}>
                    {capitalizeFirstLetter(level)}
                  </MenuItem>
                ))}
              </TextField>
              <TextFieldFileInput
                label="Thumbnail"
                helperText={validationErrors.thumbnail?.message}
                error={!!validationErrors.thumbnail}
                sx={{ width: "100%" }}
                iconButton={<AddPhotoAlternate />}
                onChangeFile={(newFileSrc) => setNewThumbnail(newFileSrc)}
                register={register("thumbnail", newVocaSetRules.thumbnail)}
              />

              <Image
                src={newThumbnail}
                sx={{
                  width: "250px",
                  height: "140px",
                  mx: "auto !important",
                }}
              />

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
                  disabled={isPending}
                >
                  {isPending ? <CircularProgress size={20} /> : "Create"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </CustomModal>

      {/* Delete voca set modal */}
      <CustomModal
        open={openDeleteModal}
        onClose={() => setDeletedVocaSet(null)}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to delete this voca set?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteVocaSet}
              sx={{ width: "80px" }}
            >
              {deleteVocaSetMutation.isPending ? (
                <CircularProgress size={20} color="error" />
              ) : (
                "Delete"
              )}
            </Button>
            <Button variant="contained" onClick={() => setDeletedVocaSet(null)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default VocaIndexPage;
