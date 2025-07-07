import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); // ✅ Fix here

const app = express();
connectDB();

// ✅ CORS Setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobportal-gun0.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
