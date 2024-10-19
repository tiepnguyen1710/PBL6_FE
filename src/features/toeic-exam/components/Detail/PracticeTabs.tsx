import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PracticeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [limit, setLimit] = React.useState("");

  const handleChangeLimit = (event: SelectChangeEvent) => {
    setLimit(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Practice" {...a11yProps(0)} />
          <Tab label="Full test" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack>
          <Box
            sx={{
              background: "#D8F0E2",
              py: 1,
              px: 2,
              borderRadius: 2,
              mb: 1,
            }}
          >
            <Stack>
              <Typography sx={{ color: "#1F5E39" }}>
                Practicing by individual sections and choosing appropriate
                timing will help you focus on answering the questions correctly,
                as you are under the pressure to complete the test.
              </Typography>
            </Stack>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Part 1 (6 questions)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Part 2 (25 questions)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Part 3 (39 questions)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Part 4 (30 questions)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Part 5 (30 questions)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Part 6 (16 questions)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Part 7 (54 questions)"
            />
          </FormGroup>

          <Typography variant="h6" sx={{ my: 1, color: "black" }}>
            Time limit (Blank for unlimit)
          </Typography>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Limit</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Age"
                onChange={handleChangeLimit}
                placeholder="Time limit"
                displayEmpty
              >
                <MenuItem value="">
                  <em>Time limit</em> {/* Placeholder option */}
                </MenuItem>
                <MenuItem value={10}>10 minutes</MenuItem>
                <MenuItem value={20}>20 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={40}>40 minutes</MenuItem>
                <MenuItem value={50}>50 minutes</MenuItem>
                <MenuItem value={60}>60 minutes</MenuItem>
                <MenuItem value={70}>70 minutes</MenuItem>
                <MenuItem value={80}>80 minutes</MenuItem>
                <MenuItem value={90}>90 minutes</MenuItem>
                <MenuItem value={100}>100 minutes</MenuItem>
                <MenuItem value={110}>110 minutes</MenuItem>
                <MenuItem value={120}>120 minutes</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              mt: 2,
              px: 2,
              py: 0.5,
            }}
          >
            Practice
          </Button>
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack>
          <Box
            sx={{
              background: "#FFEFD8",
              py: 1,
              px: 2,
              borderRadius: 2,
              mb: 0.5,
            }}
          >
            <Stack>
              <Typography sx={{ color: "#855A1F" }}>
                Ready to start the full test? To achieve the best results, you
                need to set aside 120 minutes for this test.
              </Typography>
            </Stack>
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              mt: 2,
              px: 2,
              py: 0.5,
            }}
          >
            Start
          </Button>
        </Stack>
      </CustomTabPanel>
    </>
  );
}
