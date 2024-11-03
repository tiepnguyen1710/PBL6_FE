import { Box, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import Content from "../../../components/layout/Content";
import VocaSet from "../../../components/VocaSet";
import TabPanel from "../../../components/UI/TabPanel";
import { mockVocaSets } from "../utils/data";
import VocaSetInfo from "../types/VocaSetInfo";

const VOCA_TABS = [
  {
    index: 0,
    qualification: "all",
    label: "All",
  },
  {
    index: 1,
    qualification: "beginner",
    label: "Beginner",
  },
  {
    index: 2,
    qualification: "intermediate",
    label: "Intermediate",
  },
  {
    index: 3,
    qualification: "advanced",
    label: "Advanced",
  },
];

const VocaLibraryPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Content>
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
        <Box></Box>
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Vocabulary Library
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          sx={{
            "& .MuiTab-root": { px: 0.75 },
            "& .MuiTabs-indicator": {
              height: "4px",
              bottom: "-2px",
            },
            "& .MuiTabs-scroller": {
              overflowX: "visible",
            },
            borderBottom: 2,
            borderColor: "divider",
            overflowY: "visible",
            overflow: "initial",
          }}
        >
          <Tab label="All" />
          <Tab label="Beginner" />
          <Tab label="Intermediate" />
          <Tab label="Advanced" />
        </Tabs>
        {VOCA_TABS.map((tab) => (
          <TabPanel
            key={tab.index}
            value={tabIndex}
            index={tab.index}
            sx={{ marginTop: 1 }}
          >
            <Grid2 container rowGap={1.5}>
              {mockVocaSets
                .filter((vocaSet: VocaSetInfo) =>
                  tab.qualification === "all"
                    ? true
                    : vocaSet.qualification === tab.qualification
                )
                .map((vocaSet: VocaSetInfo) => (
                  <Grid2 sx={{ width: "250px", marginRight: 1 }}>
                    <VocaSet
                      key={vocaSet.id}
                      title={vocaSet.title}
                      qualification={vocaSet.qualification}
                      topic={vocaSet.topic}
                      author={vocaSet.author}
                      takenNumber={vocaSet.takenNumber}
                    />
                  </Grid2>
                ))}
            </Grid2>
          </TabPanel>
        ))}
      </Box>
    </Content>
  );
};

export default VocaLibraryPage;
