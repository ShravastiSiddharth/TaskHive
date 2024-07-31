// components/TaskCard.tsx
import React, { useState } from 'react';
import styles from '../styles/TaskCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Draggable } from 'react-beautiful-dnd';


interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}

interface TaskCardProps {
    task: Task;
    onTaskMoved: (task: Task, newStatus: string) => void;
    onTaskUpdated: () => void;
    fetchTasks: () => void;
    index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskMoved, onTaskUpdated,index,fetchTasks }) => {
    const { user } = useAuth();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
    });

    const priorityClass = task.priority ? styles[task.priority.toLowerCase()] : '';
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format as MM/DD/YYYY or DD/MM/YYYY based on locale
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`, editFormData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEditModalOpen(false);
            onTaskUpdated(); 
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    if (typeof window !== 'undefined') {
        Modal.setAppElement('#__next');
    }
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    className={styles.taskCard}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.title}>{task.title}</h3>
                        {task.priority && (
                            <span className={`${styles.priority} ${priorityClass}`}>
                                {task.priority}
                            </span>
                        )}
                    </div>
                    <p className={styles.description}>{task.description}</p>
                    {task.deadline && (
                        <div className={styles.deadline}>
                            <span className={styles.deadlineLabel}><FontAwesomeIcon icon={faHourglassStart} /></span> {formatDate(task.deadline)}
                        </div>
                    )}
                    {user && (
                        <button onClick={() => setEditModalOpen(true)}>Edit</button>
                    )}
                    <Modal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)}>
                        <h2>Edit Task</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" value={editFormData.description} onChange={handleEditChange}></textarea>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="priority">Priority</label>
                                <select name="priority" value={editFormData.priority} onChange={handleEditChange}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="deadline">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={editFormData.deadline ? new Date(editFormData.deadline).toISOString().substr(0, 10) : ''}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                        </form>
                    </Modal>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
