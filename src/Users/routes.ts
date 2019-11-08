import { Router } from "express";
import { Validate } from "../validation/validation";
import { UserController } from "./UsersController";
import { usersSchema } from "./usersValidateSchema";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", Validate.validateBody(usersSchema), UserController.updateUser);
router.post("/", Validate.validateBody(usersSchema), UserController.createUser);
router.delete("/:id", UserController.deleteUser);

export const UsersRouter = router;
