import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  groupQuestionData,
  TOEIC_PARTS,
  validateState,
} from "../types/examType";
import Grid from "@mui/material/Grid2";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { uploadFile } from "../api/examApi";
import _ from "lodash";
import { convertExamData } from "../utils/helper";

interface CrPartProps {
  updateExamData: (data: groupQuestionData[], part: string) => void;
  isUpdate: boolean;
  examData: groupQuestionData[];
}

const CreatePart2: React.FC<CrPartProps> = ({
  updateExamData,
  isUpdate,
  examData,
}) => {
  console.log("part2", isUpdate, examData);
  const [group, setGroup] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const part2Group = Array.from({
    length: TOEIC_PARTS.Part2.groupQuestion,
  });
  const [part2Data, setPart2Data] = useState<groupQuestionData[]>(
    Array.from(
      { length: TOEIC_PARTS.Part2.groupQuestion },
      (_, groupIndex) => ({
        validate: validateState.blank,
        audioUrl: null,
        audioPreview: "",
        image: [],
        imagePreview: [],
        transcript: "",
        questionData: Array.from(
          { length: TOEIC_PARTS.Part2.questionPerGroup },
          (_, questionIndex) => ({
            questionNumber:
              TOEIC_PARTS.Part2.start +
              groupIndex * TOEIC_PARTS.Part2.questionPerGroup +
              questionIndex,
            question: "",
            explain: "",
            answer: Array.from(
              { length: TOEIC_PARTS.Part2.answerCount },
              (_, index) => `Statement ${String.fromCharCode(65 + index)}`,
            ),
            correctAnswer: "",
          }),
        ),
      }),
    ),
  );

  useEffect(() => {
    if (isUpdate) {
      console.log("kkk");
      const convertedExamData = convertExamData(examData);
      if (convertedExamData.length > 0) {
        setPart2Data(convertedExamData);
      }
    }
  }, [examData]);

  const getChipStyle = (state: validateState = validateState.blank) => {
    switch (state) {
      case validateState.blank:
        return {};
      case validateState.pending:
        return { backgroundColor: "orange", color: "white" };
      case validateState.fulfilled:
        return {
          backgroundColor: "green",
          color: "white",
          "&:hover": { backgroundColor: "green", color: "white" },
        };
      default:
        return {};
    }
  };

  const handleGroupQuestion = (groupQuestion: number) => {
    if (!show) {
      setGroup(groupQuestion);
      setShow(true);
    }
  };

  const handleCloseButton = (groupPara: number) => {
    if (show) {
      setShow(false);
    }

    //validate question
    let isValidQuestion = true;
    let indexQ = -1;
    for (let i = 0; i < part2Data[groupPara].questionData.length; i++) {
      if (!part2Data[groupPara].questionData[i].question) {
        isValidQuestion = false;
        indexQ = i;
        break;
      }
    }

    //validate answer
    let isValidAnswer = true;
    //let isFullBlank = true;
    let indexA = -1;
    for (let i = 0; i < part2Data[groupPara].questionData.length; i++) {
      for (
        let j = 0;
        j < part2Data[groupPara].questionData[i].answer.length;
        j++
      ) {
        if (!part2Data[groupPara].questionData[i].answer[j]) {
          isValidAnswer = false;
          indexA = j;
          break;
        } else {
          break;
          //isFullBlank = false;
        }
      }
      indexQ = i;
      if (!isValidAnswer) {
        break;
      }
    }

    if (!isValidAnswer) {
      toast.error(
        `Answer ${indexA + 1} Question ${indexQ + 1} group ${groupPara + 1}  cannot blank `,
      );
    }

    // if (!isValidQuestion) {
    //   toast.error(
    //     `Question ${indexQ + 1} group ${groupPara + 1}  cannot blank `,
    //   );
    //   let updateData = [...part2Data];
    //   updateData[groupPara].validate = validateState.pending;
    //   setPart2Data(updateData);
    // } else {
    //   let updateData = [...part2Data];
    //   updateData[groupPara].validate = validateState.blank;
    //   setPart2Data(updateData);
    // }

    if (isValidAnswer && isValidQuestion) {
      let updateData = [...part2Data];
      updateData[groupPara].validate = validateState.fulfilled;
      setPart2Data(updateData);
    } else if (indexQ < 0 && indexA < 0) {
      let updateData = [...part2Data];
      updateData[groupPara].validate = validateState.blank;
      setPart2Data(updateData);
    } else if (indexQ >= 0 && indexA >= 0) {
      let updateData = [...part2Data];
      updateData[groupPara].validate = validateState.pending;
      setPart2Data(updateData);
    }

    const part2DataUpdate = part2Data.map((item) =>
      _.omit(item, ["validate", "audioPreview", "imagePreview"]),
    );
    updateExamData(part2DataUpdate, "part2");
  };

  const handleQuestionChange = (
    groupIndex: number,
    questionDataIndex: number,
    value: string,
  ) => {
    let updatedData = [...part2Data];
    updatedData[groupIndex].questionData[questionDataIndex].question = value;
    setPart2Data(updatedData);
  };

  const handleAnswerChange = (
    groupIndex: number,
    questionDataIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    let updateData = [...part2Data];
    updateData[groupIndex].questionData[questionDataIndex].answer[answerIndex] =
      value;
    setPart2Data(updateData);
  };

  const handleChangeCorrectAnswer = (
    groupIndex: number,
    questionDataIndex: number,
    answerIndex: number,
  ) => {
    let updateData = [...part2Data];
    updateData[groupIndex].questionData[questionDataIndex].correctAnswer =
      `${updateData[groupIndex].questionData[questionDataIndex].answer[answerIndex]}`;
    setPart2Data(updateData);
  };

  const handleEditorChange = (
    groupIndex: number,
    questionDataIndex: number,
    newContent: string,
  ) => {
    let updateData = [...part2Data];
    console.log(groupIndex, questionDataIndex, newContent);
    updateData[groupIndex].questionData[questionDataIndex].explain = newContent;
    setPart2Data(updateData);
  };

  const handleEditorChangeScript = (groupIndex: number, newContent: string) => {
    let updateData = [...part2Data];
    updateData[groupIndex].transcript = newContent;
    setPart2Data(updateData);
  };

  // const handleAudioChange = (
  //   groupIndex: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     let updateData = [...part2Data];
  //     const file = event.target.files[0];
  //     console.log(file);
  //     updateData[groupIndex].audio = file;
  //     const previewUrl = URL.createObjectURL(file);
  //     updateData[groupIndex].audioPreview = previewUrl;
  //     setPart2Data(updateData);
  //   }
  // };

  const handleAudioChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let dataUpdate = [...part2Data];
      const file = event.target.files[0];

      let data = await uploadFile(file);

      const audioUrl = data.secure_url;
      dataUpdate[groupIndex].audioUrl = audioUrl;
      dataUpdate[groupIndex].audioPreview = audioUrl;
      setPart2Data(dataUpdate);
    }
  };

  const handleClearImage = (groupIndex: number) => {
    let dataUpdate = [...part2Data];
    dataUpdate[groupIndex].image = [];
    dataUpdate[groupIndex].imagePreview = [];
    setPart2Data(dataUpdate);
  };

  const handleImageChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let dataUpdate = [...part2Data];
      const filesArray = Array.from(event.target.files);
      // Upload từng file lên Cloudinary
      for (let file of filesArray) {
        let data = await uploadFile(file);
        const imageUrl = data.secure_url;

        dataUpdate[groupIndex].image = [
          ...(dataUpdate[groupIndex].image || []),
          {
            fileUrl: imageUrl,
            index: dataUpdate[groupIndex].image
              ? dataUpdate[groupIndex].image.length
              : 0,
          },
        ];

        dataUpdate[groupIndex].imagePreview = [
          ...(dataUpdate[groupIndex].imagePreview || []),
          imageUrl,
        ];
      }
      setPart2Data(dataUpdate);
    }
  };

  // const handleImageChange = (
  //   groupIndex: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     console.log(event.target.files);
  //     let dataUpdate = [...part2Data];
  //     const filesArray = Array.from(event.target.files);
  //     //setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
  //     dataUpdate[groupIndex].image = [
  //       ...(dataUpdate[groupIndex].image || []),
  //       ...filesArray,
  //     ];

  //     const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
  //     //setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  //     dataUpdate[groupIndex].imagePreview = [
  //       ...(dataUpdate[groupIndex].imagePreview || []),
  //       ...previewUrls,
  //     ];

  //     // const file = event.target.files[0];
  //     // setSelectedImage(file);
  //     // const previewUrl = URL.createObjectURL(file);
  //     // setImagePreview(previewUrl);
  //     setPart2Data(dataUpdate);
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          mx: 5.5,
          mb: 2,
        }}
      >
        {part2Group.map((_, groupIndex) => {
          return (
            <Chip
              key={groupIndex}
              sx={{
                mr: 0.5,
                py: 1,
                mb: 0.5,
                width: 85,
                ...getChipStyle(part2Data[groupIndex]?.validate),
              }}
              label={`Question ${TOEIC_PARTS.Part2.start + groupIndex}`}
              onClick={() => handleGroupQuestion(groupIndex)}
            />
          );
        })}
      </Box>

      {show && (
        <Box
          sx={{
            py: 1,
            px: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid size={3}>
              <Stack>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <input
                    accept="audio/*"
                    type="file"
                    onChange={(event) => handleAudioChange(group, event)}
                    style={{ display: "none" }}
                    id={`audio-upload-2-${group}`}
                  />
                  <label htmlFor={`audio-upload-2-${group}`}>
                    <Button variant="contained" component="span">
                      Upload Audio
                    </Button>
                  </label>
                  {part2Data[group].audioUrl && (
                    <audio
                      controls
                      style={{ marginTop: "15px", width: "250px" }}
                    >
                      <source
                        src={part2Data[group].audioUrl}
                        type="audio/mpeg"
                      />
                    </audio>
                  )}
                  {/* <Typography variant="body1" my={0.5}>
                    {part2Data[group].audioUrl && part2Data[group].audioUrl}
                  </Typography> */}
                  <input
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={(event) => handleImageChange(group, event)}
                    style={{ display: "none" }}
                    id={`image-upload-2-${group}`}
                  />
                  <label htmlFor={`image-upload-2-${group}`}>
                    <Button variant="contained" component="span" sx={{ mt: 1 }}>
                      Upload Image
                    </Button>
                  </label>
                  {part2Data[group].imagePreview &&
                    part2Data[group].imagePreview.map((previewUrl, index) => (
                      <Box key={index} mt={2} textAlign="center">
                        <Avatar
                          src={previewUrl}
                          alt={`Image Preview ${index}`}
                          sx={{ width: 150, height: "auto", borderRadius: 1 }}
                        />
                        {/* <Typography variant="body1" mt={1}>
                          {part2Data[group].image &&
                            part2Data[group].image[index].imageUrl}
                        </Typography> */}
                      </Box>
                    ))}
                  {part2Data[group].image &&
                    part2Data[group].image?.length > 0 && (
                      <Button
                        variant="contained"
                        component="span"
                        sx={{ mt: 1 }}
                        onClick={() => handleClearImage(group)}
                      >
                        Clear Image
                      </Button>
                    )}
                </Box>
              </Stack>
            </Grid>
            <Grid size={9}>
              <Typography my={0.75}>Transcript</Typography>
              <Stack flexDirection="column" flexGrow={1}>
                <Editor
                  apiKey={import.meta.env.VITE_TINY_KEY}
                  value={part2Data[group].transcript}
                  init={{
                    height: 200,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={(newContent) =>
                    handleEditorChangeScript(group, newContent)
                  }
                />
              </Stack>
              {part2Data[group].questionData.map(
                (questionData, questionDataIndex) => {
                  return (
                    <Box key={questionDataIndex} mb={1}>
                      <Stack direction="row" spacing={0.5} sx={{ my: 1 }}>
                        <Box
                          sx={{
                            background: "var(--color-primary-main)",
                            color: "white",
                            fontWeight: "400",
                            borderRadius: "50%",
                            padding: "15px",
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {TOEIC_PARTS.Part2.start +
                            group * TOEIC_PARTS.Part2.questionPerGroup +
                            questionDataIndex}
                        </Box>
                        <TextField
                          label="Question"
                          value={questionData.question}
                          onChange={(e) =>
                            handleQuestionChange(
                              group,
                              questionDataIndex,
                              e.target.value,
                            )
                          }
                          fullWidth
                          size="small"
                        />
                      </Stack>

                      <Typography>Answers</Typography>
                      {questionData.answer.map((answer, answerIndex) => (
                        <Stack direction="row" key={answerIndex}>
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                checked={
                                  answer != "" &&
                                  questionData.correctAnswer === answer
                                }
                                onChange={() =>
                                  handleChangeCorrectAnswer(
                                    group,
                                    questionDataIndex,
                                    answerIndex,
                                  )
                                }
                              />
                            }
                            label=""
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          />
                          <TextField
                            label={`Answer ${String.fromCharCode(65 + answerIndex)}`} // A, B, C, D
                            value={answer || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                group,
                                questionDataIndex,
                                answerIndex,
                                e.target.value,
                              )
                            }
                            size="small"
                            fullWidth
                            margin="dense"
                            disabled
                          />
                        </Stack>
                      ))}
                      <Typography my={0.75}>Explain</Typography>
                      <Stack flexDirection="column" flexGrow={1}>
                        <Editor
                          apiKey={import.meta.env.VITE_TINY_KEY}
                          value={questionData.explain}
                          init={{
                            height: 200,
                            width: "100%",
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={(newContent) =>
                            handleEditorChange(
                              group,
                              questionDataIndex,
                              newContent,
                            )
                          }
                        />
                      </Stack>
                    </Box>
                  );
                },
              )}
              {show && (
                <Button
                  variant="contained"
                  onClick={() => handleCloseButton(group)}
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CreatePart2;
