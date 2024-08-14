import router from "./index";
import {createUserController} from "../controllers/userController";

router.post('/', createUserController);
// router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.delete('/:userId', deleteUser);
// router.patch('/:userId', updateUser);

export const usersRoutes = router;
