import { AbstractModifier } from "./AbstractModifier";
import { Dataset } from "../Dataset";

export class MinMaxScalingDatasetModifier extends AbstractModifier {
  apply(dataset: Dataset): Dataset {
    dataset.data.replace(dataset.data.minMax());
    return dataset;
  }
}
