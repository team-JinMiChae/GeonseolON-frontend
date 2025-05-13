import React from "react";
import styles from "./Rain.module.css";

import rainyBackImg from "../../../../../assets/WeatherImg/Rain/rain_BackImg.png";
import rainCloud1 from "../../../../../assets/WeatherImg/Rain/rain_Cloud1.png";
import rainCloud2 from "../../../../../assets/WeatherImg/Rain/rain_Cloud2.png";
import rain1 from "../../../../../assets/WeatherImg/Rain/rain_1.png";
import rain2 from "../../../../../assets/WeatherImg/Rain/rain_2.png";
import rain3 from "../../../../../assets/WeatherImg/Rain/rain_3.png";
import rain4 from "../../../../../assets/WeatherImg/Rain/rain_4.png";
import rain5 from "../../../../../assets/WeatherImg/Rain/rain_5.png";

const Rainy = () => {
    const rainImages = [rain1, rain2, rain3, rain4, rain5];
    const rainPerImage = 25;
    const totalRain = rainImages.flatMap((img) =>
        Array.from({ length: rainPerImage }, () => img)
    );

    return (
        <div
            className={styles["rainy-background"]}
            style={{ backgroundImage: `url(${rainyBackImg})` }}
        >
            {/* 구름 */}
            <img src={rainCloud1} alt="구름1" className={styles.cloud1} />
            <img src={rainCloud2} alt="구름2" className={styles.cloud2} />

            {/* 비들 */}
            {totalRain.map((src, index) => {
                const randomLeft = Math.random() * 100;
                const randomDelay = Math.random() * 2;
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
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Rainy;
