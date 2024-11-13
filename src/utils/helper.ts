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
