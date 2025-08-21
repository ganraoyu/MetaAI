import express, { Router, Request, Response } from 'express';
import { getAboveMasterChampionData } from '../../controllers/statistics/master+/champions.controller';
import { getAboveMasterTraitsData } from '../../controllers/statistics/master+/traits.controller';
import { getAboveMasterItemsData } from '../../controllers/statistics/master+/items.controller';

import { getBelowMasterChampionData } from '../../controllers/statistics/master-/champions.controller';
import { getBelowMasterTraitsData } from '../../controllers/statistics/master-/traits.controller';
import { getBelowMasterItemsData } from '../../controllers/statistics/master-/items.controller';

const router: Router = express.Router();

// Above Master endpoints
router.get('/:rank/champions', getAboveMasterChampionData);
router.get('/:rank/traits', getAboveMasterTraitsData);
router.get('/:rank/items', getAboveMasterItemsData);

// Below Master endpoints
router.get('/:rank/:division/champions', getBelowMasterChampionData);
router.get('/:rank/:division/traits', getBelowMasterTraitsData);
router.get('/:rank/:division/items', getBelowMasterItemsData);

export default router;
