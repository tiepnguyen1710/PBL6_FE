import {
  Select,
  SelectProps,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";

interface BootstrapSelectProps {
  itemLabels: string[];
  itemValues: Array<string | number>;
  gap?: number;
}

const BootstrapSelect: React.FC<BootstrapSelectProps & SelectProps> = (
  props,
) => {
  const { itemLabels, itemValues, gap = 0.5, label, ...rest } = props;
  return (
    <Stack spacing={gap}>
      <Typography component="label" htmlFor={props.id}>
        {label}
      </Typography>
      <Select displayEmpty {...rest}>
        {itemLabels.map((label, index) => (
          <MenuItem key={index} value={itemValues[index]}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default BootstrapSelect;
