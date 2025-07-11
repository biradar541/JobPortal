import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import { singleUpload } from "../middlewares/multer.js";
import { loginLimiter } from "../middlewares/rateLimiter.js"; 


const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(loginLimiter,login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
