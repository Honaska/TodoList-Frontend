import React, { useState } from "react";
import "./index.css"; // Assuming you have some basic CSS

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", details: "" });
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        setSelectedTaskIndex(null);
    };

    const addTask = () => {
        if (newTask.title.trim() === "") return;
        setTasks([...tasks, newTask]);
        setNewTask({ title: "", details: "" });
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleTaskClick = (index) => {
        setSelectedTaskIndex(index);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setNewTask(tasks[selectedTaskIndex]);
        setShowForm(true);// Populate form with task details
    };

    const handleUpdateTask = () => {
        if (newTask.title.trim() === "") return;
        const updatedTasks = tasks.map((task, index) =>
            index === selectedTaskIndex ? { ...newTask } : task
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setSelectedTaskIndex(null);
        setNewTask({ title: "", details: "" });
    };

    return (
        <div className="app-container">
            <h1>To Do List</h1>

            <div className="todo-container">
                {!showForm && (
                    <button onClick={() => setShowForm(true)}>Add Task</button>
                )}

                {showForm && (
                    <div className="task-form">
                        <h2>Add New Task</h2>
                        <div className="form-group">
                            <label htmlFor="title">Task name:*</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter task title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="details">Task details:*</label>
                            <textarea
                                id="details"
                                name="details"
                                placeholder="Enter task details"
                                value={newTask.details}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* You can add more fields here if needed, like Priority, Due Date, etc. */}
                        <div className="form-actions">
                            <button onClick={addTask}>
                                {isEditing ? "Update Task" : "Add Task"}
                            </button>
                            <button type="button" onClick={() => { setShowForm(false); setIsEditing(false); setNewTask({ title: "", details: "" }); }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <h2>Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No tasks yet!</p>
                ) : (
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index} onClick={() => handleTaskClick(index)} className={selectedTaskIndex === index ? 'selected' : ''}>
                                {task.title}
                            </li>
                        ))}
                    </ul>
                )}

                {selectedTaskIndex !== null && (
                    <div className="task-details">
                        <h3>Task Details</h3>
                        <h4>{tasks[selectedTaskIndex].title}</h4>
                        <p>{tasks[selectedTaskIndex].details}</p>
                        <div className="task-actions">
                            <button onClick={() => removeTask(selectedTaskIndex)}>Delete</button>
                            <button onClick={handleEditClick}>Edit</button>
                        </div>
                    </div>
                )}

                {isEditing && selectedTaskIndex !== null && showForm && (
                    <div className="task-form">
                        <h2>Edit Task</h2>
                        <div className="form-group">
                            <label htmlFor="edit-title">Task name:*</label>
                            <input
                                type="text"
                                id="edit-title"
                                name="title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-details">Task details:*</label>
                            <textarea
                                id="edit-details"
                                name="details"
                                value={newTask.details}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button onClick={handleUpdateTask}>Update Task</button>
                            <button type="button" onClick={() => { setIsEditing(false); setSelectedTaskIndex(null); setNewTask({ title: "", details: "" }); setShowForm(false); }}>
                                Cancel Edit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
