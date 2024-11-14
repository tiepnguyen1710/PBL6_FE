import { Menu, MenuItem, MenuList, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import VocaSetModel from "../../../../types/VocaSetModel";

const VocaSetRow: React.FC<{ vocaSet: VocaSetModel }> = ({ vocaSet }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow>
      <TableCell>{vocaSet.id}</TableCell>
      <TableCell>{vocaSet.name}</TableCell>
      <TableCell>{capitalizeFirstLetter(vocaSet.level)}</TableCell>
      <TableCell align="right">{0}</TableCell>
      <TableCell align="right">{vocaSet?.__topics__?.length || 0}</TableCell>
      <TableCell
        onClick={handleClick}
        sx={{
          color: !open ? "inherit" : "primary.main",
          cursor: "pointer",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        Action
      </TableCell>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          transform: "translateY(-10px)",
          "& .MuiList-dense": { py: 0 },
          "& a": { textDecoration: "none", color: "inherit" },
        }}
      >
        <MenuList dense>
          <Link to={`details?id=${vocaSet.id}`}>
            <MenuItem>Manage</MenuItem>
          </Link>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    </TableRow>
  );
};

export default VocaSetRow;