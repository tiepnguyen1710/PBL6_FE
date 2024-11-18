import { Box, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import Content from "../../../components/layout/Content";
import VocaSet from "../../../components/VocaSet";
import TabPanel from "../../../components/UI/TabPanel";
import VocaSetInfo from "../types/VocaSetInfo";
import SearchInput from "../../../components/UI/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { getAllVocaSets } from "../../shared-apis/vocaset-api";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";

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
  const [tabIndex, setTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const { data: vocaSetData, isLoading } = useQuery({
    queryKey: ["vocaSet"],
    queryFn: getAllVocaSets,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  return (
    <Content>
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
        <Box></Box>
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Vocabulary Library
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            sx={{
              "& .MuiTab-root": { px: 0.75 },
              borderColor: "divider",
            }}
          >
            <Tab label="All" />
            <Tab label="Beginner" />
            <Tab label="Intermediate" />
            <Tab label="Advanced" />
          </Tabs>
          <Box sx={{ position: "absolute", right: 0, top: 0 }}>
            <SearchInput onChange={handleSearchInputChange} />
          </Box>
        </Box>
        {isLoading && (
          <Box sx={{ marginTop: 2 }}>
            <DotLoadingProgress />
          </Box>
        )}
        {VOCA_TABS.map((tab) => (
          <TabPanel
            key={tab.index}
            value={tabIndex}
            index={tab.index}
            sx={{ marginTop: 1 }}
          >
            <Grid2 container rowGap={1.5}>
              {vocaSetData
                ?.map((vocaSetModel) => {
                  const vocaSetInfo: VocaSetInfo = {
                    id: vocaSetModel.id,
                    title: vocaSetModel.name,
                    qualification: vocaSetModel.level,
                    takenNumber: "0",
                    image: vocaSetModel.thumbnail,
                  };

                  return vocaSetInfo;
                })
                .filter((vocaSet: VocaSetInfo) => {
                  const title = vocaSet.title.toLowerCase();
                  const author = vocaSet.author?.toLowerCase();

                  let isRendered = true;

                  if (searchValue) {
                    isRendered =
                      author?.includes(searchValue) ||
                      title.includes(searchValue);
                  }

                  if (tab.qualification !== "all") {
                    isRendered &&= vocaSet.qualification === tab.qualification;
                  }

                  return isRendered;
                })
                .map((vocaSet: VocaSetInfo) => (
                  <Grid2 sx={{ width: "250px", marginRight: 1 }}>
                    <VocaSet
                      key={vocaSet.id}
                      id={vocaSet.id}
                      title={vocaSet.title}
                      qualification={vocaSet.qualification}
                      topic={vocaSet.topic}
                      author={vocaSet.author}
                      takenNumber={vocaSet.takenNumber}
                      image={vocaSet.image}
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
