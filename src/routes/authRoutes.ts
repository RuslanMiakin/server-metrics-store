import {loginController, registrationController, validateTokenController} from "../controllers/authController";
import express from "express";

const router = express.Router();

router.post('/login', loginController);
router.post('/registration', registrationController);
router.get('/validateToken/:token', validateTokenController);

export const authRoutes = router;
