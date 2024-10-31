import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/task/new", {
        title,
      });
      setTitle("");
      toast.success(res.data.message);
      getTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/task/all");
      setTasks(res.data.tasks);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/task/delete/${id}`
      );
      toast.success(res.data.message);
      getTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editTask = async (id, title) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/task/edit/${id}`, {
        title,
      });
      toast.success(res.data.message);
      getTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const completeTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/task/complete/${id}`
      );

      getTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <main>
      {/* //Add Todo */}
      <section className="addTodo">
        <h1>Add Task</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Todo"
            required
            autoFocus
          />
          <button type="submit">Add</button>
        </form>
      </section>
      {/* //Display Todos */}
      <section className="displayTodos">
        <h1>Your Tasks</h1>
        {tasks.map((task) => {
          return (
            <div className="allTodos" key={task._id}>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  value={task._id}
                  onChange={() => completeTask(task._id)}
                />
                <p className={task.isCompleted ? "complete" : ""}>
                  {task.title}
                </p>
              </div>

              <div className="todoBtns">
                <button
                  className="editBtn"
                  onClick={() =>
                    editTask(task._id, prompt("Enter new title", task.title))
                  }
                >
                  Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default App;
