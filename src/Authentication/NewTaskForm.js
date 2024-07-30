// client/src/components/NewTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NewTaskForm = ({ onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To-Do',
        priority: 'Low',
        deadline: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const { title, description, status, priority, deadline } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateForm = () => {
        const errors = {};
        if (!title) errors.title = 'Title is required';
        return errors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/tasks', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Task added successfully!');
            setErrors({});
            onTaskAdded(response.data);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'An error occurred. Please try again.';
            setErrors({ server: errorMsg });
            setSuccess('');
        }
    };

    return (
        <div className="new-task-form">
            <h2>Add New Task</h2>
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                    />
                    {errors.title && <div className="error">{errors.title}</div>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={status} onChange={onChange}>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select name="priority" value={priority} onChange={onChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={deadline}
                        onChange={onChange}
                    />
                </div>
                {errors.server && <div className="error">{errors.server}</div>}
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default NewTaskForm;
