import React from 'react';
import WeatherSidebar from '../components/common/WeatherDetail/WeatherSidebar.jsx';
import WeatherInfo from '../components/common/WeatherDetail/WeatherInfo.jsx';
import styles from './WeatherDetaill.module.css';
import { useNavigate } from "react-router-dom";

const WeatherDetail = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.weatherDetailLayout}>
            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}>
                ⟵ 뒤로 가기
            </button>
            <div className={styles.weatherInfo}>
                <WeatherInfo />
            </div>
        </div>
    );
};

export default WeatherDetail;
