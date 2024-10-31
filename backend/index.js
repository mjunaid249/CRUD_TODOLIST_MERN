import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import { taskRouter } from "./routes/taskRouter.js";
import cors from "cors";

connectDB();

const app = express();

//Midelwares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/task", taskRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
