import express from "express";
import {
    createMarketController,
    getMarketsByUserIdController
} from "../controllers/marketController";

const router = express.Router();

router.post('/', createMarketController);
router.get('/:userId', getMarketsByUserIdController);

// router.get('/', getAllMarket);
// router.delete('/:userId', deleteMarket);
// router.patch('/:userId', updateMarket);

export const marketRoutes = router;
