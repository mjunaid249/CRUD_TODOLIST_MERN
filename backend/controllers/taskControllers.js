import { taskModel } from "../models/taskModel.js";

const addTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await taskModel.create({ title });
    res.status(201).json({
      message: "Task added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in adding task",
      success: false,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      success: false,
    });
  }
};

const completeTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findById(id);

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      message: "Task completed ",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error completing task",
      success: false,
    });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const task = await taskModel.findById(id);
    task.title = title;
    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      success: false,
    });
  }
};

export { addTask, getAllTasks, completeTask, editTask, deleteTask };
