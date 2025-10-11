import { artifactItems } from "./itemMapping/artifactItems";
import { basicItems } from "./itemMapping/basicItems";
import { radiantItems } from "./itemMapping/radiantItems";

export interface ItemMap {
  [key: string]: {
    name: string;
    image: string;
  };
}

export const itemMap: ItemMap = {
  ...basicItems,
  ...radiantItems,
  ...artifactItems,
};
