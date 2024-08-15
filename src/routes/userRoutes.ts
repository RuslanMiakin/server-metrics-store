import {createUserController} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post('/', createUserController);
// router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.delete('/:userId', deleteUser);
// router.patch('/:userId', updateUser);

export const usersRoutes = router;
