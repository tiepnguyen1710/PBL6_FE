import VocabularyFrontSide from "./VocabularyFrontSide";
import Vocabulary from "../../../../types/Vocabulary";
import VocabularyCardWrapper from "./VocabularyCardWrapper";

interface VocabularyCardProps {
  voca?: Vocabulary;
  state?: VocaburaryCardState;
}

export enum VocaburaryCardState {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ voca, state }) => {
  return (
    <VocabularyCardWrapper state={state}>
      <VocabularyFrontSide
        word={voca?.word || ""}
        phonetic={voca?.phonetic || ""}
        image={voca?.image}
      />
    </VocabularyCardWrapper>
  );
};

export default VocabularyCard;
