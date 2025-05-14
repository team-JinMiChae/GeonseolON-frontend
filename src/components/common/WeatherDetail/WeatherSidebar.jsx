import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WeatherSidebar.module.css";
import { LuSun } from "react-icons/lu";
import {
    TiWeatherPartlySunny,
    TiWeatherCloudy,
    TiWeatherDownpour,
    TiWeatherStormy,
    TiWeatherSnow,
    TiWeatherWindy,
} from "react-icons/ti";

const weatherIcons = {
    hot: <LuSun size={82} color="#2E2E2E" />,
    clearDay: <TiWeatherPartlySunny size={82} color="#2E2E2E" />,
    cloudy: <TiWeatherCloudy size={82} color="#2E2E2E" />,
    rain: <TiWeatherDownpour size={82} color="#2E2E2E" />,
    lightning: <TiWeatherStormy size={82} color="#2E2E2E" />,
    snowy: <TiWeatherSnow size={82} color="#2E2E2E" />,
    wind: <TiWeatherWindy size={82} color="#4767FFFF" />,
};

const WeatherSidebar = ({
                            weatherType = "wind",
                            onScrollToSection,
                            currentSection = "prevent", // 현재 선택된 섹션: 'prevent' 또는 'case'
                        }) => {
    const icon = weatherIcons[weatherType] || weatherIcons.clearDay;
    const navigate = useNavigate();


    const sectionList = [
        { id: "prevent", title: "낙상사고 대처 및 예방책" },
        { id: "case", title: "낙상 사고 사례" },
    ];

    return (
        <div className={styles.weatherSidebar}>
            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}>
                ⟵ 뒤로 가기
            </button>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.iconBox}>{icon}</div>
                    <div className={styles.textBlock}>
                        <div className={styles.title}>오늘은 강풍이 불어요.</div>
                        <div className={styles.subtext}>
                            고소 작업시 낙상 사고에 주의 하세요!
                        </div>
                    </div>
                </div>
                <div className={styles.detail_Category}>
                    {sectionList.map((section) => (
                        <p
                            key={section.id}
                            className={
                                section.id === currentSection
                                    ? styles.activeText
                                    : styles.inactiveText
                            }
                            onClick={() => onScrollToSection(section.id)}
                            style={{ cursor: "pointer" }}
                        >
                            {section.title}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WeatherSidebar;