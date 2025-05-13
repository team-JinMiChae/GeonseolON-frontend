import React from 'react';
import ChatAiInfo from '../components/feature/Main/ChatAiInfo';
import WeatherCardCategory from "../components/feature/Main/WeatherCard_Category.jsx";
import styles from "./Main.module.css";
import MainCardNews from "../components/feature/Main/CardNewsCarousel.jsx";

const Main = () => {
    return (
        <div className={styles.wrapper}>
            <WeatherCardCategory />
            <ChatAiInfo />
            <MainCardNews />
        </div>
    );
};

export default Main;