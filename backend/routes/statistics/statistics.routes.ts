import express, { Router } from "express";
import { getAboveMasterChampionData, getUpdatedAboveMasterChampionData } from "../../controllers/statistics/champions.controller";
import { getAboveMasterTraitsData, getUpdatedAboveMasterTraitsData } from "../../controllers/statistics/traits.controller";
import { getAboveMasterItemsData, getUpdatedAboveMasterItemsData } from "../../controllers/statistics/items.controller";

import { updateAllStatistics } from "../../controllers/statistics/allStatistics.controller";
import { getChampionItemData, getUpdatedChampionItemData } from "../../controllers/statistics/championItem.controller";

const router: Router = express.Router();

router.get("/allStatistics", updateAllStatistics);

// Above Master endpoints
router.get("/champions", getAboveMasterChampionData);
router.get("/update/champions", getUpdatedAboveMasterChampionData);

router.get("/traits", getAboveMasterTraitsData);
router.get("/update/traits", getUpdatedAboveMasterTraitsData);

router.get("/items", getAboveMasterItemsData);
router.get("/update/items", getUpdatedAboveMasterItemsData);

router.get("/championItems" , getChampionItemData);
router.get("/update/championItems", getUpdatedChampionItemData);

export default router;
