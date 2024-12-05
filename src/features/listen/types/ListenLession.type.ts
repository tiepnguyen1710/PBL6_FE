import { IListenSentence } from "./ListenSentence.type";

export interface IListenLession {
  id: string;
  name: string;
  audio: string;
  listenSentences: IListenSentence[];
}
