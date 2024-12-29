import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../api/tasks";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setTaskToEdit(null);
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Task List</h1>
      <AddTaskForm onTaskAdded={handleAddTask} />

      {taskToEdit ? (
        <EditTaskForm
          task={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ul className="space-y-4 mt-6">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600">
                  {task.description || "No description"}
                </p>
                <p
                  className={`text-sm ${
                    task.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {task.status ? "Completed" : "Incomplete"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditTask(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
