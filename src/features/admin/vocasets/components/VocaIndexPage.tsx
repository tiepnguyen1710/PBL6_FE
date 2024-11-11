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
import { useState } from "react";

import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import VocaSet, { mockVocaSets } from "../types/VocaSet";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import VocaSetRow from "./VocaSetRow";
import AdminTableContainer from "./AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination.ts";
import { Add, AddPhotoAlternate, FilterAlt } from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal.tsx";
import VocaSetLevel from "../../../../types/VocaSetLevel.ts";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter.ts";
import TextFieldFileInput from "./TextFieldFileInput.tsx";
import { useForm } from "react-hook-form";
import { Image } from "../../../../components/UI/Image.tsx";
import {
  fileList2Base64,
  getPlaceholderImage,
} from "../../../../utils/helper.ts";
import { useMutation } from "@tanstack/react-query";
import { createVocaSet } from "../api/voca-set-api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewVocaSetResponse from "../types/NewVocaSetResponse.ts";

interface NewVocaSetFormData {
  name: string;
  level: string;
  thumbnail: string | FileList;
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

const VocaIndexPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState("All");
  const [openNewModal, setOpenNewModal] = useState(false);

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

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: NewVocaSetFormData) => {
      const responseData = await createVocaSet({
        name: data.name,
        level: data.level,
        thumbnail: data.thumbnail as string,
      });

      return responseData;
    },
    onSuccess: (responseData: NewVocaSetResponse) => {
      console.log("Post successfull, reponseData", responseData);
      navigate(`/admin/voca-set/${responseData.id}/details`);
      toast.success("Create new vocabulary set successfully!");
    },
  });

  const { page, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<VocaSet>(mockVocaSets, 10);

  const handleCreateVocaSet = async (data: NewVocaSetFormData) => {
    console.log("Submit new voca set");
    data.thumbnail = await fileList2Base64(data.thumbnail as FileList);
    console.log(data);

    mutate(data);
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

        <form id="filter-voca-sets-form" style={{ marginBottom: "2rem" }}>
          <Grid2 spacing={1} container sx={{ maxWidth: "800px" }}>
            <Grid2 size={7}>
              <RoundedInput
                name="name"
                label="Name"
                placeholder="Enter the filter name"
                padding="16.5px 14px"
                borderRadius={4}
                gap={0.5}
                labelColor="secondary.main"
              />
            </Grid2>
            {/* <Grid2 size={6}>
              <RoundedInput
                name="author"
                label="Author"
                placeholder="Enter the filter author"
                padding="16.5px 14px"
                borderRadius={4}
                gap={0.5}
                labelColor="secondary.main"
              />
            </Grid2> */}
            <Grid2 size={3}>
              <BootstrapSelect
                label="Level"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value as string)}
                itemLabels={["All", "Beginner", "Intermediate", "Advanced"]}
                itemValues={["All", "Beginner", "Intermediate", "Advanced"]}
              />
            </Grid2>
            <Grid2 size={2} display="flex" alignItems="end">
              <Button
                variant="contained"
                startIcon={<FilterAlt />}
                sx={{ py: "12px", px: 3, marginBottom: "3px" }}
              >
                Filter
              </Button>
            </Grid2>
          </Grid2>
        </form>

        <AdminTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Taken Students</TableCell>
                <TableCell>Lessons</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData.map((vocaSet: VocaSet) => (
                <VocaSetRow key={vocaSet.id} vocaSet={vocaSet} />
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{ height: 53 * emptyRows, backgroundColor: "white" }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  count={mockVocaSets.length}
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
                sx={{ width: "250px", height: "140px", mx: "auto !important" }}
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
    </>
  );
};

export default VocaIndexPage;
