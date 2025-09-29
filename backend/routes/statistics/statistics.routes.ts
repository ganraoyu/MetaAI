import express, { Router } from "express";
import { getAboveMasterChampionData, getUpdatedAboveMasterChampionData } from "../../controllers/statistics/champions.controller";
import { getAboveMasterTraitsData, getUpdatedAboveMasterTraitsData } from "../../controllers/statistics/traits.controller";
import { getAboveMasterItemsData, getUpdatedAboveMasterItemsData } from "../../controllers/statistics/items.controller";

import { updateAllStatistics } from "../../controllers/statistics/allStatistics.controller";
import { getChampionItemData, getUpdatedChampionItemData } from "../../controllers/statistics/championItem.controller";

const router: Router = express.Router();

router.get("/:rank/allStatistics", updateAllStatistics);

// Above Master endpoints
router.get("/:rank/champions", getAboveMasterChampionData);
router.get("/update/:rank/champions", getUpdatedAboveMasterChampionData);

router.get("/:rank/traits", getAboveMasterTraitsData);
router.get("/update/:rank/traits", getUpdatedAboveMasterTraitsData);

router.get("/:rank/items", getAboveMasterItemsData);
router.get("/update/:rank/items", getUpdatedAboveMasterItemsData);

router.get("/:rank/championItems" , getChampionItemData);
router.get("/update/:rank/championItems", getUpdatedChampionItemData);

export default router;
