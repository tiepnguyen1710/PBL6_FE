import { styled, TableContainer } from "@mui/material";

const AdminTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiTableHead-root": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiTableCell-head": {
    color: theme.palette.common.white,
  },
  "& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default AdminTableContainer;
