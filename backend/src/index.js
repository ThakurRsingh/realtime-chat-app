import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Load environment variables
dotenv.config();

// Resolve __dirname (since you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-app.vercel.app"
  ],
  credentials: true,
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Test route for debugging
app.get("/api/test", (req, res) => {
  res.json({ message: "API working fine 👌" });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

 // app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
 // });
}

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
app.get("/api/test", (req, res) => {
  res.json({ message: "API working fine 👌" });
});
