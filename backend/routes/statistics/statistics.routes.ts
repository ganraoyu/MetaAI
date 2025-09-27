import express, { Router } from "express";
import { getAboveMasterChampionData, getUpdatedAboveMasterChampionData } from "../../controllers/statistics/master+/champions.controller";
import { getAboveMasterTraitsData, getUpdatedAboveMasterTraitsData } from "../../controllers/statistics/master+/traits.controller";
import { getAboveMasterItemsData } from "../../controllers/statistics/master+/items.controller";

import { getBelowMasterChampionData } from "../../controllers/statistics/master-/champions.controller";
import { getBelowMasterTraitsData } from "../../controllers/statistics/master-/traits.controller";
import { getBelowMasterItemsData } from "../../controllers/statistics/master-/items.controller";
import { updateAllStatistics } from "../../controllers/statistics/master+/allStatistics.controller";

const router: Router = express.Router();

router.get("/:rank/allStatistics", updateAllStatistics);

// Above Master endpoints
router.get("/:rank/champions", getAboveMasterChampionData);
router.get("/update/:rank/champions", getUpdatedAboveMasterChampionData);

router.get("/:rank/traits", getAboveMasterTraitsData);
router.get("/update/:rank/traits", getUpdatedAboveMasterTraitsData);

router.get("/:rank/items", getAboveMasterItemsData);

// Below Master endpoints
router.get("/:rank/:division/champions", getBelowMasterChampionData);
router.get("/:rank/:division/traits", getBelowMasterTraitsData);
router.get("/:rank/:division/items", getBelowMasterItemsData);

export default router;
