import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Wind.module.css";

import windBackImg from "../../../../../assets/WeatherImg/Wind/wind_BackImg.png";
import cloud1 from "../../../../../assets/WeatherImg/Wind/wind_Cloud1.png";
import cloud2 from "../../../../../assets/WeatherImg/Wind/wind_Cloud2.png";
import cloud3 from "../../../../../assets/WeatherImg/Wind/wind_Cloud3.png";
import cloud4 from "../../../../../assets/WeatherImg/Wind/wind_Cloud4.png";
import windTrees from "../../../../../assets/WeatherImg/Wind/wind_Trees.png";
import windLeaf from "../../../../../assets/WeatherImg/Wind/wind_Leaf.png";

import wind1 from "../../../../../assets/WeatherImg/Wind/wind_1.png";
import wind2 from "../../../../../assets/WeatherImg/Wind/wind_2.png";
import wind3 from "../../../../../assets/WeatherImg/Wind/wind_3.png";
import wind4 from "../../../../../assets/WeatherImg/Wind/wind_4.png";


const Wind = () => {
    const [show, setShow] = useState(false);
    const windRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={styles["wind-background"]}
            style={{ backgroundImage: `url(${windBackImg})` }}
        >
            <CSSTransition
                in={show}
                timeout={800}
                classNames={{
                    enter: styles["cloud-enter"],
                    enterActive: styles["cloud-enter-active"],
                    exit: styles["cloud-exit"],
                    exitActive: styles["cloud-exit-active"],
                }}
                unmountOnExit
                nodeRef={windRef}
            >
                <div ref={windRef}>
                    <img src={cloud1} alt="cloud1" className={styles.cloud1}/>
                    <img src={cloud2} alt="cloud2" className={styles.cloud2}/>
                    <img src={cloud3} alt="cloud3" className={styles.cloud3}/>
                    <img src={cloud4} alt="cloud4" className={styles.cloud4}/>
                    <img src={windLeaf} alt="leaf" className={styles.leaf}/>
                    <img src={windTrees} alt="trees" className={styles.trees}/>

                    {/* 바람 선 이미지 */}
                    <img src={wind1} alt="wind1" className={styles.windLine1}/>
                    <img src={wind2} alt="wind2" className={styles.windLine2}/>
                    <img src={wind3} alt="wind3" className={styles.windLine3}/>
                    <img src={wind4} alt="wind4" className={styles.windLine4}/>

                </div>
            </CSSTransition>
        </div>
    );
};

export default Wind;
