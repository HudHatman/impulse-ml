import * as fs from "fs";
import { AbstractVocabularySource } from "./AbstractVocabularySource";

export class TextFile extends AbstractVocabularySource {
  protected data: string = "";

  constructor(data: string) {
    super();
    this.data = data;
  }

  static fromLocalFile(path: string): Promise<TextFile> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, buffer) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(new TextFile(buffer.toString("utf-8")));
      });
    });
  }

  parse(): string {
    return this.data;
  }
}
