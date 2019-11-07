import { Router } from "express";
import { UserController } from "./UsersController";
import { usersSchema, UsersValidator } from "./usersValidator";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UsersValidator.validateBody(usersSchema), UserController.updateUser);
router.post("/", UsersValidator.validateBody(usersSchema), UserController.createUser);
router.delete("/:id", UserController.deleteUser);

export const UsersRouter = router;
