import React from 'react';
import WeatherCard from '../../common/WeatherCard/WeatherCard.jsx';
import Category from "../../common/Category/Category.jsx";
import styles from "./WeatherCard_Category.module.css";

const WeatherCardCategory = () => {
    return (
        <div className={styles.WeaterCategory}>
            <WeatherCard/>
            <Category/>
        </div>
    );
};

export default WeatherCardCategory;