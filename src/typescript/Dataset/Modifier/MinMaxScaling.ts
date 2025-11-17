import { AbstractModifier } from "./AbstractModifier";
import { Dataset } from "../Dataset";

export class MinMaxScalingDatasetModifier extends AbstractModifier {
  apply(dataset: Dataset): Dataset {
    const newData = dataset.data.minMax();
    dataset.data = newData;
    return dataset;
  }
}
