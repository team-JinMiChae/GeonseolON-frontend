import React from "react";
import styles from "./Snowy.module.css";

import snowyBackImg from "../../../../../assets/WeatherImg/Snowy/Snowy_BackImg.png";
import snow1 from "../../../../../assets/WeatherImg/Snowy/Snowy_1.png";
import snow2 from "../../../../../assets/WeatherImg/Snowy/Snowy_2.png";
import snow3 from "../../../../../assets/WeatherImg/Snowy/Snowy_3.png";
import snow4 from "../../../../../assets/WeatherImg/Snowy/Snowy_4.png";
import snow5 from "../../../../../assets/WeatherImg/Snowy/Snowy_5.png";
import snow6 from "../../../../../assets/WeatherImg/Snowy/Snowy_6.png";
import Snowy_mountain from "../../../../../assets/WeatherImg/Snowy/Snowy_mountain.png";


const Snowy = () => {
    const snowflakes = [snow1, snow2, snow3, snow4, snow5, snow6];

    return (
        <div
            className={styles["snowy-background"]}
            style={{backgroundImage: `url(${snowyBackImg})`}}
        >
            {[...Array(2)].map((_, i) => {
                return (
                    snowflakes.map((snowflake, index) => (
                        <img
                            key={`${i}-${index}`}
                            src={snowflake}
                            alt="눈송이"
                            className={`${styles.snowflake} ${styles[`snowflake${index}`]}`}
                        />
                    ))
                );
            })}
            <img src={Snowy_mountain} alt="눈 덮인 산" className={styles.snowyMountain}/>

        </div>
    );
};

export default Snowy;
