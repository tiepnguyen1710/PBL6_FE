import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import { getExerciseSet } from "../../voca/utils/exercise-helper";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Navigate,
  // useNavigate,
  useParams,
  // useSearchParams,
} from "react-router-dom";
// import { getLessonById } from "../../admin/vocasets/api/lesson-api";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import Content from "../../../components/layout/Content";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { getListenLessonById } from "../api/ListenLessonApi";
const ListenPractice: React.FC = () => {
  // const navigate = useNavigate();
  const { lessonId } = useParams();

  //   const [vocabularies, setVocabularies] = useState<VocabularyModel[]>([]);
  //   // console.log("vocabularies", vocabularies);

  //   const [correctVocaIds, setCorrectVocaIds] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState([""]);
  const [answerState, setAnswerState] = useState<
    { state: "success" | "error" | "info"; checked: boolean }[]
  >([
    {
      state: "info",
      checked: false,
    },
  ]);
  type SentenceCheck = { sentence: string; state: "success" | "error" };

  const [sentenceCheck, setSentenceCheck] = useState<SentenceCheck[][]>([[]]);
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["listenLesson", { id: lessonId }],
    queryFn: () => getListenLessonById(lessonId!),
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
  });

  //   const [exerciseIdx, setExerciseIdx] = useState(0);

  //   const repeatTimes = useMemo(() => {
  //     const numOfVocabularies = vocabularies.length;
  //     return Math.ceil(MIN_NUMBER_OF_EXERCISES / (2 * numOfVocabularies));
  //   }, [vocabularies]);

  //   const exercises = useMemo(() => {
  //     if (vocabularies.length === 0) {
  //       return [];
  //     }

  //     return getExerciseSet(vocabularies, repeatTimes);
  //   }, [vocabularies, repeatTimes]);

  //   const activeExercise: Exercise | undefined = exercises[exerciseIdx];

  //   const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  //   const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  //   const clockTimerRef = useRef<ClockTimerRef>(null);

  //   const postLearningResultMutation = useMutation({
  //     mutationFn: createLearningResult,
  //     onSuccess: () => {
  //       console.log("Post learning result successfully");
  //       navigate(
  //         `/lesson/learning-result?id=${lessonId}&vocaSetId=${lesson?.groupTopic.id}`,
  //       );
  //     },
  //   });

  //   const playWrongAnswerAudio = () => {
  //     wrongAnswerAudioRef.current?.play();
  //   };

  //   const playCorrectAnswerAudio = async () => {
  //     await correctAnswerAudioRef.current?.play();
  //     // Add a little delay
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 500);
  //     });
  //   };

  //   const handleCorrectAnswer = async (correctVocaId: string) => {
  //     setCorrectVocaIds((prev) => [...prev, correctVocaId]);
  //     await playCorrectAnswerAudio();
  //   };

  //   const handleWrongAnswer = () => {
  //     playWrongAnswerAudio();
  //   };

  //   const postLearningResult = useCallback(() => {
  //     const listCorrectWord = new Set<string>();
  //     const listIncorrectWord = new Set<string>();

  //     for (const {
  //       voca: { id },
  //     } of exercises) {
  //       // As each voca has been repeated `repeatTimes` times
  //       // So, a voca is considered correct if it is answered correctly `repeatTimes` times
  //       if (
  //         correctVocaIds.filter((vocaId) => vocaId === id).length == repeatTimes
  //       ) {
  //         listCorrectWord.add(id);
  //       } else {
  //         listIncorrectWord.add(id);
  //       }
  //     }

  //     const request: PostLearningResultRequest = {
  //       idTopic: lessonId!,
  //       listCorrectWord: [...listCorrectWord],
  //       listIncorrectWord: [...listIncorrectWord],
  //       time: takenTime,
  //     };

  //     console.log(request);

  //     postLearningResultMutation.mutate(request);
  //   }, [
  //     exercises,
  //     correctVocaIds,
  //     lessonId,
  //     postLearningResultMutation,
  //     repeatTimes,
  //     takenTime,
  //   ]);

  //   useEffect(() => {
  //     if (lesson) {
  //       setVocabularies(lesson.listWord || []);
  //     }
  //   }, [lesson]);

  //   const handleFulFillExercise = useCallback(() => {
  //     // The callback is re-defined in each time `exerciseIdx` changes, so the `exerciseIdx` is always the latest
  //     if (exercises.length > 0 && exerciseIdx + 1 >= exercises.length) {
  //       // Finish lesson
  //       postLearningResult();
  //     } else {
  //       setExerciseIdx((prev) => prev + 1);
  //     }
  //   }, [exercises.length, exerciseIdx, postLearningResult]);

  //   const handleAnswerExercise = useCallback(() => {
  //     const remainingTime = clockTimerRef.current?.stop() || 0;
  //     const implementTime = DURATION_PER_EXERCISE - remainingTime;

  //     setTakenTime((prev) => prev + implementTime);
  //   }, [clockTimerRef, setTakenTime]);
  const handleNextSentence = () => {
    setShowAnswer(false);
    setCurrIndex((prev) => {
      if (prev < (lesson?.listenSentences.length ?? 0)) {
        if (answer.length < prev + 1) {
          setAnswer([...answer, ""]);
          setAnswerState((prev) => {
            return [...prev, { state: "info", checked: false }];
          });
          setSentenceCheck((pre) => {
            const newValue = [...pre, []];
            return newValue;
          });
        }
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevSentence = () => {
    setShowAnswer(false);
    setCurrIndex((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAnswer((prev) => {
      const newAnswer = [...prev];
      newAnswer[currIndex - 1] = value;
      return newAnswer;
    });
  };

  const handleCheckAnswer = () => {
    console.log(sentenceCheck);
    let userAnswer = answer[currIndex - 1].trim().split(" ");
    userAnswer = userAnswer.filter((item) => item !== "");
    const correctAnswer = lesson?.listenSentences[currIndex - 1]
      ?.sentence!.toLocaleLowerCase()
      .split(" ");
    if (!correctAnswer) return;
    let index = 0;
    let rs = true;
    const currentSentenceCheck = [...sentenceCheck];
    currentSentenceCheck[currIndex - 1] = [];
    for (let i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i].toLocaleLowerCase() === correctAnswer[index]) {
        currentSentenceCheck[currIndex - 1].push({
          sentence: userAnswer[i],
          state: "success",
        });
        index++;
      } else {
        if (
          correctAnswer[index].length < userAnswer[i].length ||
          correctAnswer[index].length - 1 > userAnswer[i].length
        ) {
          rs = false;
          currentSentenceCheck[currIndex - 1].push({
            sentence: userAnswer[i],
            state: "error",
          });
          continue;
        }
        let currCheck = true;
        for (let j = 0; j < correctAnswer[index].length; j++) {
          if (
            (!userAnswer[i].toLocaleLowerCase()[j] &&
              correctAnswer[index][j] != "." &&
              correctAnswer[index][j] != "," &&
              correctAnswer[index][j] != "!" &&
              correctAnswer[index][j] != "?") ||
            (userAnswer[i].toLocaleLowerCase()[j] &&
              userAnswer[i].toLocaleLowerCase()[j] != correctAnswer[index][j])
          ) {
            rs = false;
            currCheck = false;
          }
        }
        if (currCheck) {
          currentSentenceCheck[currIndex - 1].push({
            sentence: userAnswer[i],
            state: "success",
          });
        } else {
          currentSentenceCheck[currIndex - 1].push({
            sentence: userAnswer[i],
            state: "error",
          });
        }
        index++;
      }
    }
    setSentenceCheck(currentSentenceCheck);
    if (userAnswer.length != correctAnswer.length) {
      rs = false;
    }
    if (rs) {
      setAnswerState((prev) => {
        const newAnswerState = [...prev];
        newAnswerState[currIndex - 1] = { state: "success", checked: true };
        return newAnswerState;
      });
    } else {
      setAnswerState((prev) => {
        const newAnswerState = [...prev];
        newAnswerState[currIndex - 1] = { state: "error", checked: true };
        return newAnswerState;
      });
    }
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  if (!lessonId) {
    return <Navigate to="/listen" />;
  }

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open={isLoading} />
      ) : (
        <Content
          sx={{ display: "flex", flexDirection: "column" }}
          withoutFooter={true}
        >
          <Box
            sx={{
              maxWidth: "962px",
              minHeight: "100% ",
              width: "100%",
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Card
              sx={{
                width: "80%",
                height: "70%",
                minHeight: "480px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                padding: "30px 20px",
              }}
            >
              <Breadcrumbs
                sx={{
                  marginLeft: "20px",
                  fontSize: "12px",
                  marginBottom: "10px",
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="breadcrumbs"
              >
                {/* <LinkIcon /> */}
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  color="black"
                  to="/listen"
                >
                  Listen Practice
                </Link>

                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  color="black"
                  to="/listen"
                >
                  {lesson?.listenGroup.name}
                </Link>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/listen/${lesson?.id}`}
                >
                  {lesson?.name}
                </Link>
              </Breadcrumbs>
              <Typography
                sx={{ marginBottom: "40px", marginLeft: "20px" }}
                variant="h4"
              >
                {lesson?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                  alignItems: "center",
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
              >
                <Typography variant="h5">
                  Sentence: {currIndex} / {lesson?.listenSentences.length}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                  alignItems: "center",
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
              >
                <audio controls>
                  <source
                    src={lesson?.listenSentences[currIndex - 1]?.audio || ""}
                  />
                  Your browser does not support the audio element.
                </audio>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                  alignItems: "center",
                  marginLeft: "2px",
                }}
              >
                <TextField
                  label="Type your answer"
                  sx={{ m: 1, width: "100%" }}
                  // color="secondary"
                  // color="success"
                  color={answerState[currIndex - 1].state}
                  focused
                  rows={2}
                  multiline
                  value={answer[currIndex - 1]}
                  onChange={handleChangeInput}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                  alignItems: "center",
                  marginLeft: "20px",
                  marginBottom: "20px",
                  minHeight: "60px",
                }}
              >
                <TipsAndUpdatesIcon
                  sx={{ width: "18px", height: "18px" }}
                ></TipsAndUpdatesIcon>
                {showAnswer ? (
                  <>
                    <Typography variant="h6">Answer:</Typography>
                    <Typography variant="h6">
                      {lesson?.listenSentences[currIndex - 1]?.sentence}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">Check1:</Typography>
                    {answerState[currIndex - 1].checked &&
                      sentenceCheck[currIndex - 1].map((sentence, index) => {
                        return (
                          <Typography
                            key={index}
                            color={sentence.state}
                            variant="h6"
                          >
                            {sentence.sentence}
                          </Typography>
                        );
                      })}
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ background: "#478ECC" }}
                  startIcon={<NavigateBeforeIcon />}
                  onClick={handlePrevSentence}
                  disabled={currIndex == 1}
                >
                  Prev
                </Button>
                <Button
                  onClick={handleCheckAnswer}
                  variant="outlined"
                  sx={{ color: "#203a90", borderColor: "#203a90" }}
                >
                  Check
                </Button>
                <Button onClick={handleShowAnswer} variant="contained">
                  Answer
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: "#478ECC" }}
                  endIcon={<NavigateNextIcon />}
                  onClick={handleNextSentence}
                  disabled={currIndex >= (lesson?.listenSentences.length ?? 0)}
                >
                  Next
                </Button>
              </Box>
            </Card>
          </Box>
        </Content>
      )}
    </>
  );
};

export default ListenPractice;
