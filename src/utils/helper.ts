import {
  VocabularyWordClass,
  VocabularyWordClassAbbr,
} from "../types/VocabularyModel";

export function getPlaceholderImage(width: number, height: number) {
  return `https://placehold.co/${width}x${height}`;
}

export function file2Base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function fileList2Base64(fileList: FileList): Promise<string> {
  return file2Base64(fileList[0]);
}

export function vocaWordClassAbrr2FullName(abbr: string) {
  switch (abbr) {
    case VocabularyWordClassAbbr.NOUN:
      return VocabularyWordClass.NOUN;
    case VocabularyWordClassAbbr.VERB:
      return VocabularyWordClass.VERB;
    case VocabularyWordClassAbbr.ADJECTIVE:
      return VocabularyWordClass.ADJECTIVE;
    case VocabularyWordClassAbbr.ADVERB:
      return VocabularyWordClass.ADVERB;
    case VocabularyWordClassAbbr.PRONOUN:
      return VocabularyWordClass.PRONOUN;
    case VocabularyWordClassAbbr.PREPOSITION:
      return VocabularyWordClass.PREPOSITION;
    case VocabularyWordClassAbbr.CONJUNCTION:
      return VocabularyWordClass.CONJUNCTION;
    case VocabularyWordClassAbbr.INTERJECTION:
      return VocabularyWordClass.INTERJECTION;
    default:
      return abbr;
  }
}

export function vocaWordClassFullName2Abbr(wordClassFullName: string) {
  switch (wordClassFullName) {
    case VocabularyWordClass.NOUN:
      return VocabularyWordClassAbbr.NOUN;
    case VocabularyWordClass.VERB:
      return VocabularyWordClassAbbr.VERB;
    case VocabularyWordClass.ADJECTIVE:
      return VocabularyWordClassAbbr.ADJECTIVE;
    case VocabularyWordClass.ADVERB:
      return VocabularyWordClassAbbr.ADVERB;
    case VocabularyWordClass.PRONOUN:
      return VocabularyWordClassAbbr.PRONOUN;
    case VocabularyWordClass.PREPOSITION:
      return VocabularyWordClassAbbr.PREPOSITION;
    case VocabularyWordClass.CONJUNCTION:
      return VocabularyWordClassAbbr.CONJUNCTION;
    case VocabularyWordClass.INTERJECTION:
      return VocabularyWordClassAbbr.INTERJECTION;
    default:
      return wordClassFullName;
  }
}

export function isValidVocaWordClass(wordClass: string) {
  return (
    Object.values(VocabularyWordClass).includes(
      wordClass as VocabularyWordClass,
    ) ||
    Object.values(VocabularyWordClass).includes(
      vocaWordClassAbrr2FullName(wordClass) as VocabularyWordClass,
    )
  );
}

export function hasFileData(data: unknown) {
  return data instanceof FileList && data.length > 0;
}

export function checkFileTypeIfExistValue(
  fileList: FileList | undefined,
  fileType: string,
) {
  if (fileList && fileList.length > 0) {
    const file = fileList[0];
    return file.type.includes(fileType);
  }

  return true;
}

export function mustBeImageIfExistValue(fileList?: FileList) {
  return checkFileTypeIfExistValue(fileList, "image");
}

export function mustBeAudioIfExistValue(fileList?: FileList) {
  return checkFileTypeIfExistValue(fileList, "audio");
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
