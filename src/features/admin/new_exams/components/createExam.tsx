import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Box, Button, Stack, TextField } from "@mui/material";
import { groupQuestionData, part, partData } from "../types/examType";
import CreatePart1 from "./CreatePart1";
import CreatePart3 from "./CreatePart3";
import CreatePart2 from "./CreatePart2";
import CreatePart4 from "./CreatePart4";
import CreatePart5 from "./CreatePart5";
import CreatePart6 from "./CreatePart6";
import { createExam, fetchExamById, getListPart } from "../api/examApi";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export default function CreateExam() {
  const navigate = useNavigate();
  const initExamData: partData[] = [
    {
      part: "part1",
      groupQuestionData: [],
    },
    {
      part: "part2",
      groupQuestionData: [],
    },
    {
      part: "part3",
      groupQuestionData: [],
    },
    {
      part: "part4",
      groupQuestionData: [],
    },
    {
      part: "part5",
      groupQuestionData: [],
    },
    {
      part: "part6",
      groupQuestionData: [],
    },
    {
      part: "part7",
      groupQuestionData: [],
    },
  ];
  const [examData, setExamData] = useState<partData[]>(initExamData);
  const [name, setName] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [listPart, setListPart] = useState<part[]>([]);
  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;

  const { isPending, data: ExamSetData } = useQuery({
    queryKey: ["FetchExamSet", examId],
    queryFn: () => fetchExamById(examId!),
  });

  useEffect(() => {
    if (examId && ExamSetData) {
      setIsUpdate(true);
      console.log("exam ", ExamSetData?.name);
      setName(ExamSetData?.name ?? "");
    }
  }, [ExamSetData]);

  if (ExamSetData) {
    console.log(ExamSetData);
  }

  useEffect(() => {
    fetchListPart();
  }, [name]);

  const fetchListPart = async () => {
    const res = await getListPart();
    if (res.status === 200) {
      console.log("part", res.data);
      setListPart(res.data);
    }
  };

  const updateExamData = (data: groupQuestionData[], part: string) => {
    //console.log("data", data);
    let updateExamData = [...examData];
    const partExamData = updateExamData.find(
      (partExamDataObj) => partExamDataObj.part === part,
    );
    //console.log("part exam data", partExamData);
    if (
      partExamData?.groupQuestionData &&
      partExamData.groupQuestionData.length >= 0
    ) {
      partExamData.groupQuestionData = data;
    }
    setExamData(updateExamData);
    //console.log("exam data", examData);
  };

  const handleCreateTest = async () => {
    const examDataClone = [...examData];
    const transferPart = examDataClone.map((item) => {
      const matchedPart = listPart.find((part) => part.name === item.part);
      return {
        ...item,
        part: matchedPart?.id,
      };
    });
    const validExamData = transferPart.filter(
      (item) => item.groupQuestionData.length > 0,
    );
    const buildData = {
      name: name,
      partData: validExamData,
    };
    console.log(buildData);
    const res = await createExam(buildData);
    console.log("res", res);
    if (res) {
      setExamData(initExamData);
      navigate("/admin/exam-set");
      toast.success("Exam created successfully");
    } else {
      toast.error("Error");
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Typography color="primary.main" variant="h5">
          Create Exam
        </Typography>
        <GoBackButton />
      </Stack>

      <Stack spacing={0.25} sx={{ my: 1 }}>
        <Typography color="primary.main" variant="caption">
          Name
        </Typography>
        <TextField
          value={name}
          size="small"
          sx={{ width: "50%" }}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
      </Stack>

      <Stack spacing={0.25} sx={{ my: 1 }}>
        <Typography color="primary.main" variant="caption">
          Tag
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: "50%" }}
          placeholder="Tag"
        />
      </Stack>

      <Stack spacing={0.25} sx={{ my: 1 }}>
        <Typography color="primary.main" variant="caption">
          Import Data
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreatePart1 updateExamData={updateExamData} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreatePart2 updateExamData={updateExamData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreatePart3 updateExamData={updateExamData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 4</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreatePart4 updateExamData={updateExamData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 5</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreatePart5 updateExamData={updateExamData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 6</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreatePart6 updateExamData={updateExamData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Part 7</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack>
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={() => handleCreateTest()}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
}
