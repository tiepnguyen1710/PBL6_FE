import Content from "../../../components/layout/Content";
import { Box, Chip, Grid2, Tab, Tabs, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { fetchAllListenGroup } from "../api/ListListenGroupApi";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import { IListenGroupSetInfor } from "../types/ListenGroup.type";
import { useState } from "react";
import SearchInput from "../../../components/UI/SearchInput";
import TabPanel from "../../../components/UI/TabPanel";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";
const LISTEN_TABS = [
  {
    index: 0,
    value: "",
    qualification: "all",
    label: "All",
  },
  {
    index: 1,
    value: "beginner",
    qualification: "beginner",
    label: "Beginner",
  },
  {
    index: 2,
    qualification: "intermediate",
    value: "intermediate",

    label: "Intermediate",
  },
  {
    index: 3,
    qualification: "advanced",
    value: "advanced",

    label: "Advanced",
  },
];
const ListListenGroup = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabValue, setTabValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data: listenGroupSetData, isLoading } = useQuery({
    queryKey: ["fetchListenGroup", tabValue, searchValue],
    queryFn: () => fetchAllListenGroup(tabValue, searchValue),
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setTabValue(LISTEN_TABS[newValue].value);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Content>
        <Box sx={{ maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
          <Box></Box>
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Listen Library
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
          {LISTEN_TABS.map((tab) => (
            <TabPanel
              key={tab.index}
              value={tabIndex}
              index={tab.index}
              sx={{ marginTop: 1 }}
            >
              <Grid2 container columnGap={1.5} rowGap={1.5} my={3}>
                {listenGroupSetData?.data
                  .map((listenGroup) => {
                    const listenGroupSetInfo: IListenGroupSetInfor = {
                      id: listenGroup.id,
                      name: listenGroup.name,
                      level: listenGroup.level,
                      listenLessons: listenGroup.listenLessons.map(
                        (listenLesson) => {
                          const listenLessonSetInfo = {
                            id: listenLesson.id,
                            name: listenLesson.name,
                          };
                          return listenLessonSetInfo;
                        },
                      ),
                    };
                    return listenGroupSetInfo;
                  })
                  .map((listenGroup) => {
                    return (
                      <Grid2 size={12} key={listenGroup.id}>
                        <Accordion
                          sx={{
                            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px",
                            border: "1px solid #E0E0E0",
                            marginBottom: "4px",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "4px",
                                  width: "100%",
                                  alignItems: "center",
                                  maxWidth: "fit-content",
                                }}
                              >
                                <AutoStoriesIcon sx={{ marginRight: "4px" }} />
                                <Typography
                                  sx={{
                                    color: "black",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {listenGroup.name}
                                </Typography>
                                <Chip
                                  label={listenGroup.level}
                                  sx={{
                                    backgroundColor:
                                      listenGroup.level == "beginner"
                                        ? "success.main"
                                        : listenGroup.level == "advanced"
                                          ? "warning.main"
                                          : "info.main",
                                    color: "white",
                                    marginLeft: "4px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "gray", fontSize: "14px" }}
                              >
                                ({listenGroup.listenLessons.length} Lesson)
                              </Typography>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid
                              container
                              columnGap={1}
                              rowGap={0.5}
                              spacing={2}
                            >
                              {listenGroup.listenLessons.map(
                                (listenLesson, index) => {
                                  return (
                                    <>
                                      <Grid2 size={3} key={listenLesson.id}>
                                        <Link to={`/listen/${listenLesson.id}`}>
                                          <Chip
                                            variant="outlined"
                                            sx={{
                                              padding: "10px 12px",
                                              width: "100%",
                                              boxSizing: "border-box",
                                              textAlign: "center",
                                              backgroundColor: "#F0F8FF",
                                              borderRadius: "10px",
                                              color: "#203A90",
                                            }}
                                            size="medium"
                                            label={
                                              "#" +
                                              (index + 1) +
                                              ". " +
                                              listenLesson.name
                                            }
                                          />
                                        </Link>
                                      </Grid2>
                                    </>
                                  );
                                },
                              )}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid2>
                    );
                  })}
              </Grid2>
            </TabPanel>
          ))}
        </Box>
      </Content>
    </>
  );
};

export default ListListenGroup;
