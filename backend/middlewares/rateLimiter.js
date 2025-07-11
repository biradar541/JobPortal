// middleware/rateLimiter.js
import rateLimit from "express-rate-limit";


export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    return res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again later.",
    });
  },
});




export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests allowed
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    return res.status(429).json({
      success: false,
      message: "Too many attempts. Please try again after 5 minutes.",
    });
  },
});
