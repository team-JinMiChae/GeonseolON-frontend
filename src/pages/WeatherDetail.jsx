import React from 'react';
import WeatherSidebar from '../components/common/WeatherDetail/WeatherSidebar.jsx';
import WeatherInfo from '../components/common/WeatherDetail/WeatherInfo.jsx';
import styles from './WeatherDetaill.module.css'; // 모듈 CSS로 변경

const WeatherDetail = () => {
    return (
        <div className={styles.weatherDetailLayout}>
            <div className={styles.weatherInfo}>
                <WeatherInfo />
            </div>
        </div>
    );
};

export default WeatherDetail;
