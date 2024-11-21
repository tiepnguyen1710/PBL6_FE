import VocabularyModel from "../../../types/VocabularyModel";
import { shuffleArray } from "../../../utils/helper";
import { Exercise } from "../types/Exercise";
import { ExerciseType } from "../types/ExerciseType";

export function generateRandomExercises(
  practiceVocas: VocabularyModel[],
  numberOfQuestions: number,
): Exercise[] {
  const questions = [];

  for (let i = 0; i < numberOfQuestions; i++) {
    const voca = practiceVocas[i % practiceVocas.length];
    const type = Math.floor(Math.random() * 4) + 1;

    let actualType = ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO;
    switch (type) {
      case 1: {
        actualType = ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO;
        break;
      }
      case 2: {
        actualType = ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION;
        break;
      }
      case 3: {
        actualType = ExerciseType.CHOOSE_MEANING_BASED_ON_WORD;
        break;
      }
      case 4: {
        actualType = ExerciseType.FILL_WORD_BASED_ON_SUGGESTION;
        break;
      }
    }
    const question = generateQuestion(voca, actualType, practiceVocas);
    questions.push(question);
  }

  return shuffleArray(questions);
}

export function generateQuestion(
  voca: VocabularyModel,
  type: ExerciseType,
  practiceVocas: VocabularyModel[],
): Exercise {
  switch (type) {
    case ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO:
    case ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION: {
      return {
        question: getQuestion(type),
        voca: voca,
        type: type,
        correctAnswer: voca.word,
        options: getAnswerOptions(voca, practiceVocas, "word"),
      };
    }
    case ExerciseType.CHOOSE_MEANING_BASED_ON_WORD: {
      return {
        question: getQuestion(type),
        voca: voca,
        type: type,
        correctAnswer: voca.translate,
        options: getAnswerOptions(voca, practiceVocas, "translate"),
      };
    }
    case ExerciseType.FILL_WORD_BASED_ON_SUGGESTION: {
      return {
        question: getQuestion(type),
        voca: voca,
        type: type,
        correctAnswer: voca.word,
      };
    }
  }

  // default choose word based on suggestion
  return {
    question: getQuestion(type),
    voca: voca,
    type: type,
    correctAnswer: voca.word,
    options: getAnswerOptions(voca, practiceVocas, "word"),
  };
}

export function getAnswerOptions(
  voca: VocabularyModel,
  practiceVocas: VocabularyModel[],
  prop: keyof VocabularyModel,
): string[] {
  const anotherVocas = practiceVocas.filter((v) => v.id !== voca.id);
  const options = shuffleArray(anotherVocas)
    .slice(0, 3)
    .map((v) => v[prop]);

  options.push(voca[prop]);

  return shuffleArray(options);
}

export function getQuestion(exerciseType: ExerciseType) {
  switch (exerciseType) {
    case ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO:
      return "Choose the word that is correct with the following pronunciation:";
    case ExerciseType.CHOOSE_MEANING_BASED_ON_WORD:
      return "Choose the correct meaning for the following vocabulary:";
    case ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION:
      return "Choose the appropriate word from the following suggestions:";
    case ExerciseType.CHOOSE_WORD_BASED_ON_DEFINITION:
      return "Choose the word that matches the following definition:";
    case ExerciseType.CHOOSE_WORD_BASED_ON_MEANING:
      return "Choose the correct word based on the meaning";
    case ExerciseType.CHOOSE_DEFINITION_BASED_ON_WORD:
      return "Choose the correct definition based on the word";
    case ExerciseType.FILL_WORD_BASED_ON_AUDIO:
      return "Type the correct word with the following pronunciation:";
    case ExerciseType.FILL_WORD_BASED_ON_DEFINITION:
      return "Type the word that matches the following definition:";
    case ExerciseType.FILL_WORD_BASED_ON_SUGGESTION:
      return "Type the appropriate word according to the following suggestions:";
    default:
      return "";
  }
}
