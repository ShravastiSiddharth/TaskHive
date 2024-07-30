import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/NewTaskForm.module.css';

interface NewTaskFormProps {
    onTaskAdded: (task: any) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'low',
        deadline: '',
    });

    const { title, description, status, priority, deadline } = formData;
    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/tasks',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onTaskAdded(response.data);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className={styles.newTaskForm}>
            <h2>Add New Task</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={status} onChange={onChange}>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Completed">Finished</option>
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
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default NewTaskForm;
