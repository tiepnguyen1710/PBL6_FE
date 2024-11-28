import VocabularyModel from "./VocabularyModel";

export interface UserFolder {
  id: string;
  name: string;
  description: string;

  words: VocabularyModel[];
}
