import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  if (value != index) {
    return <></>;
  }

  return <Box {...other}>{children}</Box>;
};

export default TabPanel;
