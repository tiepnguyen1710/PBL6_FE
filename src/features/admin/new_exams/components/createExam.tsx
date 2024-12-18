import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Box, Button, Stack, TextField } from "@mui/material";
import { groupQuestionData, part } from "../types/examType";
import CreatePart1 from "./CreatePart1";
import CreatePart3 from "./CreatePart3";
import CreatePart2 from "./CreatePart2";
import CreatePart4 from "./CreatePart4";
import CreatePart5 from "./CreatePart5";
import CreatePart6 from "./CreatePart6";
import {
  createExam,
  fetchExamById,
  fetchListTags,
  getListPart,
} from "../api/examApi";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import NewExamRequest from "../types/NewExamRequest";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import { convertExamResponse } from "../utils/helper";
import TagSelect from "./TagSelect";

export default function CreateExam() {
  const navigate = useNavigate();
  const initExamData: NewExamRequest = {
    name: "",
    tags: [],
    partData: [
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
    ],
  };
  const [examData, setExamData] = useState<NewExamRequest>(initExamData);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [listPart, setListPart] = useState<part[]>([]);
  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;

  const { isPending, data: ExamSetData } = useQuery({
    queryKey: ["FetchExamSet", examId],
    queryFn: () => fetchExamById(examId!),
    enabled: !!examId,
  });

  const { data: tags } = useQuery({
    queryKey: ["FetchListTags"],
    queryFn: () => fetchListTags(),
  });

  useEffect(() => {
    if (examId && ExamSetData) {
      setIsUpdate(true);
      console.log("exam ", ExamSetData);
      console.log("converve data", convertExamResponse(ExamSetData));
      const convertedData = convertExamResponse(ExamSetData);
      setExamData(convertedData);
    }
  }, [ExamSetData]);

  console.log("examData", examData, ExamSetData);

  useEffect(() => {
    fetchListPart();
    console.log(listPart);
  }, []);

  const fetchListPart = async () => {
    const res = await getListPart();
    if (res.status === 200) {
      console.log("part", res.data);
      setListPart(res.data);
    }
  };

  const updateExamData = (data: groupQuestionData[], part: string) => {
    let updateExamData = { ...examData };
    let { partData: partDataClone } = updateExamData;
    const partExamData = partDataClone.find(
      (partExamDataObj) => partExamDataObj.part === part,
    );
    if (
      partExamData?.groupQuestionData &&
      partExamData.groupQuestionData.length >= 0
    ) {
      partExamData.groupQuestionData = data;
    }
    setExamData(updateExamData);
  };

  const handleChangeName = (value: string) => {
    const updatedExamData = { ...examData, name: value };
    setExamData(updatedExamData);
  };

  const handleChangeTag = (value: string) => {
    const selectedTag = tags?.find((tag) => tag?.id === value);
    console.log(selectedTag);
    if (!selectedTag) {
      console.log("cannot find tag");
      return;
    }
    const selectedTagModel = {
      id: selectedTag.id,
      name: selectedTag.name,
    };
    const updatedExamData = {
      ...examData,
      tags: [selectedTagModel],
    };
    setExamData(updatedExamData);
  };

  const createExamMuatation = useMutation({
    mutationFn: async (newExam: NewExamRequest) => {
      return await createExam(newExam);
    },
    onSuccess() {
      setExamData(initExamData);
      navigate("/admin/exam-set");
      toast.success("Exam created successfully");
    },
    onError(error) {
      console.log("error", error);
      toast.error("Create Exam Error");
    },
  });

  const handleCreateTest = () => {
    const examDataClone = { ...examData };
    const {
      name: nameClone,
      tags: tagClone,
      partData: partDataClone,
    } = examDataClone;
    const transferPart = partDataClone.map((item) => {
      const matchedPart = listPart.find((part) => part.key === item.part);
      return {
        ...item,
        part: matchedPart?.id ?? "",
      };
    });
    const validExamData = transferPart.filter(
      (item) => item.groupQuestionData.length > 0,
    );
    console.log(validExamData);
    const newExam = {
      name: nameClone,
      tags: tagClone,
      partData: validExamData,
    };
    console.log(newExam);
    createExamMuatation.mutate(newExam);
  };

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Typography color="primary.main" variant="h5">
          {!isUpdate ? "Create Exam" : "Update Exam"}
        </Typography>
        <GoBackButton />
      </Stack>

      <Stack spacing={0.25} sx={{ my: 1 }}>
        <Typography color="primary.main" variant="caption">
          Name
        </Typography>
        <TextField
          value={examData.name}
          size="small"
          sx={{ width: "50%" }}
          onChange={(event) => handleChangeName(event.target.value)}
          placeholder="Name"
        />
      </Stack>

      <Stack spacing={0.25} sx={{ my: 1 }}>
        <Typography color="primary.main" variant="caption">
          Tag
        </Typography>
        {/* <TextField
          variant="outlined"
          size="small"
          sx={{ width: "50%" }}
          placeholder="Tag"
        /> */}
        <TagSelect
          labels={tags?.map((tag) => tag.name) || []}
          values={tags?.map((tag) => tag?.id) || []}
          selectedValue={examData?.tags?.[0]?.id ?? ""}
          onChange={handleChangeTag}
          sx={{
            width: "50%",
          }}
        />
      </Stack>

      {isPending && isUpdate ? (
        <CustomBackdrop open />
      ) : (
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
              <CreatePart1
                updateExamData={updateExamData}
                isUpdate={isUpdate}
                examData={examData.partData[0].groupQuestionData}
              />
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
              <CreatePart2
                updateExamData={updateExamData}
                isUpdate={isUpdate}
                examData={examData.partData[1].groupQuestionData}
              />
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
              <CreatePart3
                updateExamData={updateExamData}
                isUpdate={isUpdate}
                examData={examData.partData[2].groupQuestionData}
              />
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
              <CreatePart4
                updateExamData={updateExamData}
                isUpdate={isUpdate}
                examData={examData.partData[3].groupQuestionData}
              />
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
              <CreatePart5
                updateExamData={updateExamData}
                isUpdate={isUpdate}
                examData={examData.partData[4].groupQuestionData}
              />
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
              <CreatePart6
                updateExamData={updateExamData}
                isUpdate={isUpdate}
                examData={examData.partData[5].groupQuestionData}
              />
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
      )}

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
