import React, { useState } from "react";
import { addTask } from "../api/tasks";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }

    const newTask = { title, description, status };
    try {
      const task = await addTask(newTask);
      onTaskAdded(task);
      setTitle("");
      setDescription("");
      setStatus(false);
      setError("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="mr-2"
          />
          <label>Completed</label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
