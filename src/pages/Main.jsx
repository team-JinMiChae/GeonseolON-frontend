import React from 'react';
import ChatAiInfo from '../components/feature/Main/ChatAiInfo';
import styles from "./Main.module.css";

const Main = () => {
    return (
        <div className={styles.wrapper}>
            <ChatAiInfo />
            main page
        </div>
    );
};

export default Main;