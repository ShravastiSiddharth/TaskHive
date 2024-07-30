// components/Layout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
