import { artifactItems } from "./artifactItems";
import { basicItems } from "./basicItems";
import { combinedItems } from "./combinedItems";
import { radiantItems } from "./radiantItems";

export interface ItemMap {
  [key: string]: {
    name: string;
    image: string;
  };
}

export const itemMap: ItemMap = {
  ...basicItems,
  ...combinedItems,
  ...radiantItems,
  ...artifactItems,
};
