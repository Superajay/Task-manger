import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error(error.response?.data?.message || 'Error deleting task');
        }
    };

    return (
        <div>
            {tasks.map((task) => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <select
                        value={task.status}
                        onChange={(e) =>
                            axios.put(`http://localhost:5000/api/tasks/${task._id}`, { status: e.target.value }).then(fetchTasks)
                        }
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
