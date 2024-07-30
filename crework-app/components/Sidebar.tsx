// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className={styles.sidebar}>
            <div className={styles.userInfo}>
                <h2>{user?.name}</h2>
                <button onClick={logout}>Logout</button>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/dashboard" legacyBehavior>
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/add-task" legacyBehavior>
                            <a>Add New Task</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
