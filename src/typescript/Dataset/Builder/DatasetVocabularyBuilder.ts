import { AbstractVocabularySource } from "./VocabularySource/AbstractVocabularySource";
import { DatasetVocabulary } from "../DatasetVocabulary";

export class DatasetVocabularyBuilder {
  static fromSource(sourcePromise: Promise<AbstractVocabularySource>): Promise<DatasetVocabulary> {
    return new Promise((resolve) => {
      sourcePromise.then((source) => {
        const str = source.parse();
        resolve(new DatasetVocabulary(str));
      });
    });
  }
}
