import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "../../../components/UI/TabPanel";

const FormTabs: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        // sx={{ "& .MuiTab-root": { px: "3rem" } }}
      >
        <Tab label="Profile" />
        <Tab label="Change Password" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        Tab 1
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Tab 2
      </TabPanel>
    </>
  );
};

export default FormTabs;
