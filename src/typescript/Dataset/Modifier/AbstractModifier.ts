import { Dataset } from "../Dataset";

export abstract class AbstractModifier {
  protected dataset: Dataset = null;

  constructor(dataset: Dataset) {
    this.dataset = dataset;
  }

  abstract apply(dataset: Dataset): Dataset | Array<Dataset>;
}
