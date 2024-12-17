import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { uploadFile } from "../../new_exams/api/examApi";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from "react-toastify";
import { UpdateListenLesson } from "../types/ListenLesson.type";
import { deleteListenSentence } from "../api/listenSentenceAdminApi";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import {
  getLessonDetailById,
  updateListenLesson,
} from "../api/listenLessonAdminApi";

const ListenLessonUpdateAdmin = () => {
  const { pathname } = useLocation();
  const createMode = pathname.includes("create");
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async (data: UpdateListenLesson) => {
      const responseData = await updateListenLesson(data, lessonId!);
      return responseData;
    },
    onSuccess: (data: UpdateListenLesson) => {
      const newListSentence = Array.isArray(data.listenSentences)
        ? data.listenSentences.map((sentence, index) => ({
            id: sentence.id,
            sentence: sentence.sentence,
            audioUrl: sentence.audio!,
            fileName: sentence.audio!,
            index: index,
            sentenceError: "",
            fileError: "",
          }))
        : [];
      setListSentence(newListSentence);
      toast.success("Update listen lesson successfully!");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!lessonId) return;
      setLoading(true);
      try {
        const data = await getLessonDetailById(lessonId);
        setLesson({
          id: data.id,
          name: data.name,
          nameError: "",
        });
        const newListSentence = Array.isArray(data.listenSentences)
          ? data.listenSentences.map((sentence, index) => ({
              id: sentence.id,
              sentence: sentence.sentence,
              audioUrl: sentence.audio!,
              fileName: sentence.audio!,
              index: index,
              sentenceError: "",
              fileError: "",
            }))
          : [];
        setListSentence(newListSentence);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        toast.error("Failed to fetch lesson details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lessonId]);

  const [listSentence, setListSentence] = useState<
    {
      id?: string;
      sentence: string;
      audioUrl: string;
      fileName: string;
      index: number;
      sentenceError: string;
      fileError: string;
    }[]
  >([]);

  const [lesson, setLesson] = useState({
    id: "",
    name: "",
    nameError: "",
  });

  if (!lessonId) {
    return <Navigate to="/admin/listen-group" />;
  }

  const handleAddEmptySentence = () => {
    setListSentence([
      ...listSentence,
      {
        sentenceError: "",
        fileError: "",
        fileName: "",
        sentence: "",
        audioUrl: "",
        index: listSentence[listSentence.length - 1]?.index + 1 || 1,
      },
    ]);
  };

  const handleSetSentence = (index: number, value: string) => {
    const newListSentence = [...listSentence];
    newListSentence[index].sentence = value;
    newListSentence[index].sentenceError = "";

    setListSentence(newListSentence);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * 10) {
      toast.error("File size is too large");
      return;
    }
    const data = await uploadFile(file);

    const audioUrl = data.secure_url;

    const newListSentence = [...listSentence];
    newListSentence[index].audioUrl = audioUrl;
    newListSentence[index].fileName = file.name;
    newListSentence[index].fileError = "";
    setListSentence(newListSentence);
  };
  // const handleFileLessonChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  //   if (file.size > 1024 * 1024 * 10) {
  //     toast.error("File size is too large");
  //     return;
  //   }
  //   const data = await uploadFile(file);
  //   const audioUrl = data.secure_url;
  //   const newLesson = {
  //     ...lesson,
  //     audioUrl: audioUrl,
  //     fileName: file.name,
  //     fileError: "",
  //   };
  //   setLesson(newLesson);
  // };
  const handleDeleteSentence = async (index: number) => {
    const id = listSentence.find((item) => item.index === index)?.id;
    if (id) {
      await deleteListenSentence(id);
    }
    console.log("id", id);
    const newListSentence = listSentence.filter((item) => item.index !== index);
    setListSentence(newListSentence);
  };

  const resetInput = () => {
    // setLesson({
    //   name: "",
    //   audioUrl: "",
    //   fileName: "",
    //   nameError: "",
    //   fileError: "",
    // });
    // setListSentence([]);
  };
  const handleSubmit = async () => {
    const valid = handleValidateInput();
    if (valid) {
      const data: UpdateListenLesson = {
        id: lesson.id,
        name: lesson.name,
        // audioUrl: lesson.audioUrl,
        listenSentences: listSentence.map((sentence) => {
          return {
            id: sentence.id,
            sentence: sentence.sentence.trim(),
            audioUrl: sentence.audioUrl,
            index: sentence.index,
          };
        }),
      };
      mutate(data);
      resetInput();
    }
  };
  const handleValidateInput = () => {
    let isValid = true;
    const newLesson = { ...lesson };
    // if (!lesson.audioUrl) {
    //   isValid = false;
    //   newLesson.fileError = "Lesson audio is required";
    //   setLesson({ ...newLesson, fileError: "Lesson audio is required" });
    // }
    if (!lesson.name.trim()) {
      isValid = false;
      newLesson.nameError = "Lesson name is required";
      setLesson({ ...newLesson, nameError: "Lesson name is required" });
    }
    let validSentence = 0;
    const newSentence = listSentence.map((sentence) => {
      if (!sentence.audioUrl && !sentence.sentence.trim()) {
        return sentence;
      }
      if (!sentence.audioUrl) {
        isValid = false;
        sentence.fileError = "Sentence audio is required";
      }
      if (!sentence.sentence.trim()) {
        isValid = false;
        sentence.sentenceError = "Sentence is required";
      }
      if (sentence.audioUrl && sentence.sentence.trim()) {
        validSentence++;
      }
      return sentence;
    });
    if (validSentence == 0) {
      isValid = false;
      toast.error("Cannot create lesson with 0 sentence");
    }
    setListSentence(newSentence);
    return isValid;
  };
  return (
    <>
      {loading ? (
        <CustomBackdrop open />
      ) : (
        <Stack sx={{ padding: "32px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              {createMode ? "Create new lesson" : "Lesson detail"}
            </Typography>
            <GoBackButton />
          </Stack>
          <Stack display={"flex"} direction="row" spacing={4}>
            <Stack flex={2}>
              <Stack
                marginTop={"20px"}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                  Lesson info:
                </Typography>
              </Stack>
              <Stack display={"flex"} flexDirection={"column"} gap={"8px"}>
                {/* <audio style={{ width: "100%" }} key={lesson.audioUrl} controls>
                  <source src={lesson.audioUrl || ""} />
                  Your browser does not support the audio element.
                </audio> */}
                <TextField
                  onChange={(e) => {
                    setLesson({
                      ...lesson,
                      name: e.target.value,
                      nameError: "",
                    });
                  }}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={lesson.name}
                  error={!!lesson.nameError}
                  helperText={lesson.nameError}
                />
                {/* <TextField
                  id="outlined-basic"
                  label="Audio name"
                  variant="outlined"
                  error={!!lesson.fileError}
                  helperText={lesson.fileError}
                  value={lesson.fileName}
                  slotProps={{
                    input: {
                      readOnly: true,
                      style: {
                        userSelect: "none",
                      },
                    },
                  }}
                /> */}
                {/* <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Audio
                  <input
                    onChange={(e) => handleFileLessonChange(e)}
                    accept="audio/*"
                    type="file"
                    hidden
                  />
                </Button> */}
              </Stack>
              <Stack
                marginTop={"20px"}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                  Sentence info:
                </Typography>
              </Stack>
              {listSentence.map((sentence, index) => {
                return (
                  <Stack
                    key={index}
                    sx={{
                      border: "1px dashed #ccc",
                      width: "100%",
                      padding: "16px",
                      borderRadius: "8px",
                      gap: "8px",
                      marginBottom: "16px",
                      position: "relative",
                    }}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <HighlightOffIcon
                      sx={{
                        position: "absolute",
                        top: "0",
                        right: "0px",
                        color: "red",
                      }}
                      onClick={() => {
                        handleDeleteSentence(sentence.index);
                      }}
                    />
                    <audio
                      key={sentence.index + sentence.audioUrl}
                      style={{
                        width: "100%",
                        height: "30px",
                        marginTop: "8px",
                      }}
                      controls
                    >
                      <source src={sentence.audioUrl || ""} />
                      Your browser does not support the audio element.
                    </audio>
                    <TextField
                      id="outlined-multiline-static"
                      label="Sentence"
                      multiline
                      value={sentence.sentence}
                      onChange={(event) => {
                        handleSetSentence(index, event.target.value);
                      }}
                      error={!!sentence.sentenceError}
                      helperText={sentence.sentenceError}
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="Audio name"
                      multiline
                      rows={1}
                      value={sentence.fileName}
                      contentEditable={false}
                      error={!!sentence.fileError}
                      helperText={sentence.fileError}
                      slotProps={{
                        input: {
                          readOnly: true,
                          style: {
                            userSelect: "none", // Disable text selection
                          },
                        },
                      }}
                    />
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Audio
                      <input
                        onChange={(e) => handleFileChange(e, index)}
                        accept="audio/*"
                        type="file"
                        hidden
                      />
                    </Button>
                  </Stack>
                );
              })}
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<AddIcon />}
                sx={{ marginTop: "20px" }}
                onClick={handleAddEmptySentence}
              >
                Add
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                sx={{ marginTop: "20px" }}
              >
                Save
              </Button>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Stack flex={1} spacing={2}>
              <Typography variant="h4" sx={{ marginBottom: 1 }}>
                Lesson preview
              </Typography>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {lesson.name || "Lesson name"}
              </Typography>
              {/* <audio key={Date.now() + lesson.audioUrl} controls>
                <source src={lesson.audioUrl || ""} />
                Your browser does not support the audio element.
              </audio> */}
              <Stack
                sx={{
                  border: "1px dashed #ccc",
                  width: "100%",
                  padding: "16px",
                  borderRadius: "8px",
                }}
                display={listSentence.length > 0 ? "flex" : "none"}
                flexDirection={"column"}
              >
                {listSentence.map((sentence, index) => {
                  return (
                    <Stack
                      key={index}
                      borderBottom={
                        index !== listSentence.length - 1
                          ? "1px dashed #ccc"
                          : ""
                      }
                      display={"flex"}
                      padding={"10px 0"}
                      flexDirection={"column"}
                      gap={"8px"}
                    >
                      <audio
                        key={sentence.index + Date.now() + sentence.audioUrl}
                        style={{ height: "30px" }}
                        controls
                      >
                        <source src={sentence.audioUrl || ""} />
                        Your browser does not support the audio element.
                      </audio>
                      <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {sentence.sentence || "sentence"}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ListenLessonUpdateAdmin;
