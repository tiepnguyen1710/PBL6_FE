import { Add, FilterAlt, FilterAltOff } from "@mui/icons-material";
import {
  Button,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { useQuery } from "@tanstack/react-query";
import { fetchAllExam } from "../api/examApi";
import { useNavigate } from "react-router-dom";
import { IExamModel } from "../types/Exam";
import { useEffect, useState } from "react";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import useAdminTablePagination from "../hooks/useAdminTablePagination";
import ExamSetRow from "./ExamSetRow";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";

const ExamSet = () => {
  const EXAMSET_PAGE_SIZE = 3;
  const navigate = useNavigate();
  const [examSets, setExamSets] = useState<IExamModel[] | null>();

  interface IFilterExamForm {
    filterName: string;
    filterStatus: string;
  }

  const DEFAULT_EXAM_FILTER_FORM: IFilterExamForm = {
    filterName: "",
    filterStatus: "all",
  };

  const { isPending, data: examSetData } = useQuery({
    queryKey: ["fetchExam"],
    queryFn: () => fetchAllExam(""),
  });

  useEffect(() => {
    setExamSets(examSetData?.data);
  }, [examSetData]);

  const {
    reset: resetFilterForm,
    control,
    handleSubmit: handleFilter,
  } = useForm<IFilterExamForm>({
    defaultValues: DEFAULT_EXAM_FILTER_FORM,
  });

  const handleFilterExam: SubmitHandler<IFilterExamForm> = (data) => {
    const { filterName, filterStatus } = data;
    const filteredData = examSetData?.data.filter(
      (examSet) =>
        (filterName === "" ||
          examSet.name.toLowerCase().includes(filterName as string)) &&
        (filterStatus === "all" || filterStatus === "inactive"),
    );

    setExamSets(filteredData);
    setPage(0);
  };

  const handleResetFilter = () => {
    setExamSets(examSetData?.data);
    setPage(0);

    resetFilterForm(DEFAULT_EXAM_FILTER_FORM);
  };

  const { page, setPage, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<IExamModel>(examSets || [], EXAMSET_PAGE_SIZE);

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Exam Sets
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate("/admin/createExam")}
          >
            New
          </Button>
        </Stack>

        <form
          id="filter-exam-form"
          style={{ marginBottom: "2rem" }}
          onSubmit={handleFilter(handleFilterExam)}
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
                name="filterStatus"
                control={control}
                render={({ field }) => (
                  <BootstrapSelect
                    {...field}
                    label="Status"
                    defaultValue="all"
                    itemLabels={["All", "Active", "Inactive"]}
                    itemValues={["all", "active", "inactive"]}
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

        {isPending ? (
          <CustomBackdrop open />
        ) : (
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="30%">ID</TableCell>
                  <TableCell width="15%">Name</TableCell>
                  <TableCell width="10%">Time</TableCell>
                  <TableCell width="10%">Taken</TableCell>
                  <TableCell width="10%">Tag</TableCell>
                  <TableCell width="10%">Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((examSet: IExamModel) => (
                  <ExamSetRow key={examSet.id} examSet={examSet} />
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
                    rowsPerPageOptions={[EXAMSET_PAGE_SIZE]}
                    count={examSets?.length || 0}
                    rowsPerPage={EXAMSET_PAGE_SIZE}
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
    </>
  );
};

export default ExamSet;
