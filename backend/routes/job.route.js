import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAdminJobs,GetAllJobs,GetJobById} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(GetAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(GetJobById);


export default router;