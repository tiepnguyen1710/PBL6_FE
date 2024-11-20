import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface TagSelectProps {
  labels: string[]; // Danh sách tên tag (labels)
  values: number[]; // Danh sách giá trị tag (values) tương ứng với labels
  selectedValue: number; // Giá trị tag đang được chọn (ID của tag)
  onChange: (value: number) => void; // Hàm xử lý thay đổi giá trị
  sx?: React.CSSProperties; // Tùy chọn cho style của Select
}

const TagSelect: React.FC<TagSelectProps> = ({
  labels,
  values,
  selectedValue,
  onChange,
  sx,
}) => {
  return (
    <FormControl fullWidth sx={sx}>
      <Select
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
        size="small"
      >
        {values.map((value, index) => (
          <MenuItem key={value} value={value}>
            {labels[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagSelect;
