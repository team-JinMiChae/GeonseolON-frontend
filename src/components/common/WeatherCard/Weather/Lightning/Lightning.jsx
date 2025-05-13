import React from "react";
import styles from "./Lightning.module.css";

import lightningBackImg from "../../../../../assets/WeatherImg/Lightning/Lightning_BackImg.png";
import rainCloud1 from "../../../../../assets/WeatherImg/Rain/rain_Cloud1.png";
import rainCloud2 from "../../../../../assets/WeatherImg/Rain/rain_Cloud2.png";
import rain1 from "../../../../../assets/WeatherImg/Rain/rain_1.png";
import rain2 from "../../../../../assets/WeatherImg/Rain/rain_2.png";
import rain3 from "../../../../../assets/WeatherImg/Rain/rain_3.png";
import rain4 from "../../../../../assets/WeatherImg/Rain/rain_4.png";
import rain5 from "../../../../../assets/WeatherImg/Rain/rain_5.png";

import lightning1 from "../../../../../assets/WeatherImg/Lightning/Lightning_1.png";
import lightning2 from "../../../../../assets/WeatherImg/Lightning/Lightning_2.png";

const Lightning = () => {
    const rainImages = [rain1, rain2, rain3, rain4, rain5];
    const rainPerImage = 25; // 각 이미지당 35개씩
    const totalRain = rainImages.flatMap((img) =>
        Array.from({ length: rainPerImage }, () => img)
    );

    return (
        <div
            className={styles["rainy-background"]}
            style={{backgroundImage: `url(${lightningBackImg})`}}
        >
            {/* 구름 */}
            <img src={rainCloud1} alt="구름1" className={styles.cloud1}/>
            <img src={rainCloud2} alt="구름2" className={styles.cloud2}/>

            <img src={lightning1} alt="번개1" className={styles.lightning1}/>
            <img src={lightning2} alt="번개2" className={styles.lightning2}/>
            <img src={lightning1} alt="번개3" className={styles.lightning3}/>
            <img src={lightning2} alt="번개4" className={styles.lightning4}/>
            <img src={lightning2} alt="번개5" className={styles.lightning5}/>


            {/* 비들 */}
            {totalRain.map((src, index) => {
                const randomLeft = Math.random() * 100; // 0~100%
                const randomDelay = Math.random() * 2; // 0~2s
                const randomDuration = 2.5 + Math.random() * 2;

                return (
                    <img
                        key={index}
                        src={src}
                        alt={`rain-${index}`}
                        className={styles.rain}
                        style={{
                            left: `${randomLeft}%`,
                            animationDelay: `${randomDelay}s`,
                            animationDuration: `${randomDuration}s`,
                            transform: 'rotate(70deg)',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Lightning;
