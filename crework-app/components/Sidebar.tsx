// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHouse, faChessBoard, faGear, faUserPlus, faChartSimple, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className={styles.sidebar}>
            <div className={styles.userInfoCont}>
            <div className={styles.userInfo}>
            <FontAwesomeIcon icon={faUser} style={{fontSize:'2rem',}}/>
                <h2>{user?.name}</h2>
             
               
               
            </div>
            </div>
            <nav className={styles.sidenav}>
                <ul>
                    <li> <FontAwesomeIcon icon={faHouse} style={{color: "#7d7d7d",}} />
                        <Link href="/dashboard" legacyBehavior>
                       
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faChessBoard} style={{color: "#7d7d7d",}}/>
                        <Link href="#" legacyBehavior>
                            <a>Boards</a>
                        </Link>
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faGear} style={{color: "#7d7d7d",}}/>
                        <Link href="#" legacyBehavior>
                            <a>Settings</a>
                        </Link>
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faUserPlus} style={{color: "#7d7d7d",}}/>
                        <Link href="#" legacyBehavior>
                            <a>Teams</a>
                        </Link>
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faChartSimple} style={{color: "#7d7d7d",}}/>
                        <Link href="#" legacyBehavior>
                            <a>Analytics</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.createTask}>
                <Link href="/add-task" legacyBehavior>
                    <a>Create new task</a>
                </Link>
            </div>
            <button onClick={logout} className={styles.logoutbtn}><FontAwesomeIcon icon={faRightFromBracket} />Logout</button>
        </div>
    );
};

export default Sidebar;
