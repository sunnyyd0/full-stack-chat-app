import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv, { config } from "dotenv";
import cookieParese from "cookie-parser";
import cors from "cors";
import { conncetDb } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import path from "path";
dotenv.config();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParese());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log("server is running at " + PORT);
  conncetDb();
});
