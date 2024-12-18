import express from "express";
const router = express.Router();
import * as UserController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";


//Users

router.post("/registrationUser", UserController.registrationUser);
router.post("/loginUser", UserController.loginUser);
router.get("/getOneProfile", AuthMiddleware, UserController.getOneProfile);
router.get("/getAllProfiles", AuthMiddleware, UserController.getAllProfiles);
router.put("/updateProfile", AuthMiddleware, UserController.updateProfile);
router.post("/deleteUser", AuthMiddleware, UserController.deleteUser);


export default router;