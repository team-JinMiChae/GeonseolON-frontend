import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Cloudy.module.css";

import cloudyBackImg from "../../../../../assets/WeatherImg/Cloudy/cloudyBackImg.png";
import sunImg from "../../../../../assets/WeatherImg/Cloudy/cloudy_SunImg.png";
import cloud1 from "../../../../../assets/WeatherImg/ClearDay/clearDay_Cloud1.png";
import cloud2 from "../../../../../assets/WeatherImg/ClearDay/clearDay_Cloud2.png";

const ClearDay = () => {
    const [showSun, setShowSun] = useState(false);
    const sunRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowSun(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={styles["clear-background"]}
            style={{
                backgroundImage: `url(${cloudyBackImg})`,
            }}
        >
            <img src={cloud1} alt="구름1" className={styles.cloud1} />
            <img src={cloud2} alt="구름2" className={styles.cloud2} />

            <CSSTransition
                in={showSun}
                timeout={800}
                classNames={{
                    enter: styles["sun-enter"],
                    enterActive: styles["sun-enter-active"],
                    exit: styles["sun-exit"],
                    exitActive: styles["sun-exit-active"],
                }}
                unmountOnExit
                nodeRef={sunRef}
            >
                <img
                    ref={sunRef}
                    src={sunImg}
                    alt="태양"
                    className={styles["sun-image"]}
                />
            </CSSTransition>
        </div>
    );
};

export default ClearDay;
