import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { globalLimiter } from "./middlewares/rateLimiter.js"; // ✅ Import limiter


dotenv.config();

const app = express();
connectDB();

// ✅ CORS setup for local + deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://portal-m082.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Apply global rate limiter before routes
app.set("trust proxy", 1); // trust proxy (important for production)
app.use(globalLimiter); // ✅ Global rate limiter applied here


// ✅ Route Mounting — Double check all are correct and NO extra colons
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at port ${port}`);
});

