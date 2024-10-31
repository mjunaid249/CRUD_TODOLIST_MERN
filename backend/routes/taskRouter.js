import express from "express";
import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
  getAllTasks,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/new", addTask);
router.get("/all", getAllTasks);
router.put("/complete/:id", completeTask);
router.put("/edit/:id", editTask);
router.delete("/delete/:id", deleteTask);

export { router as taskRouter };
