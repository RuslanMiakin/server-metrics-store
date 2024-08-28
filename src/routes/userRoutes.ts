import {changePasswordController, createUserController} from "../controllers/userController";
import express from "express";
import {authMiddleware} from "../controllers/authController";

const router = express.Router();

router.post('/', createUserController);
router.post('/changePassword', authMiddleware, changePasswordController);

// router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.delete('/:userId', deleteUser);
// router.patch('/:userId', updateUser);

export const usersRoutes = router;
