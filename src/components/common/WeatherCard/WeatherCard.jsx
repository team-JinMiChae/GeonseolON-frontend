import React, { useEffect, useState } from "react";
import {
    TiWeatherPartlySunny,
    TiWeatherCloudy,
    TiWeatherDownpour,
    TiWeatherStormy,
    TiWeatherSnow,
    TiWeatherWindy,
} from "react-icons/ti";
import { LuSun } from "react-icons/lu";
import Hot from "../WeatherCard/Weather/Hot/Hot.jsx";
import ClearDay from "./Weather/ClearDay/ClearDay.jsx";
import Cloudy from "./Weather/Cloudy/Cloudy.jsx";
import Snowy from "./Weather/Snowy/Snowy.jsx";
import Rain from "./Weather/Rain/Rain.jsx";
import Lightning from "./Weather/Lightning/Lightning.jsx";
import Wind from "./Weather/Wind/Wind.jsx";
import pinIcon from "../../../assets/icons/common/pin_Icon.png";
import styles from "./WeatherCard.module.css";

//날씨별 컴포넌트
const weatherComponents = {
    hot: <Hot />,
    clearDay: <ClearDay />,
    cloudy: <Cloudy />,
    snowy: <Snowy />,
    rain: <Rain />,
    lightning: <Lightning />,
    wind: <Wind />,
};

//날씨별 아이콘
const weatherIcons = {
    hot: <LuSun size={82} color="#2E2E2E" />,
    clearDay: <TiWeatherPartlySunny size={82} color="#2E2E2E" />,
    cloudy: <TiWeatherCloudy size={82} color="#2E2E2E" />,
    rain: <TiWeatherDownpour size={82} color="#2E2E2E" />,
    lightning: <TiWeatherStormy size={82} color="#2E2E2E" />,
    snowy: <TiWeatherSnow size={82} color="#2E2E2E" />,
    wind: <TiWeatherWindy size={82} color="#2E2E2E" />,
};

//시간 컴포넌트
const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours < 12 ? "오전" : "오후";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return {
        date: `${year}/${month}/${date}`,
        time: `${ampm} ${hour12}:${minutes}`,
    };
};

// 위도, 경도 -> 주소 변환 (카카오API)
const getAddressFromCoords = async (longitude, latitude) => {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        if (data.documents.length === 0) {
            throw new Error("주소를 찾을 수 없습니다.");
        }

        const fullAddress = data.documents[0]?.address?.address_name;
        const trimmedAddress = fullAddress?.split(" ")[0] + " " + fullAddress?.split(" ")[1];
        return trimmedAddress || "주소를 찾을 수 없습니다.";
    } catch (error) {
        console.error("주소 변환 실패:", error);
        return "주소 변환 실패";
    }
};

//위치 동의
const WeatherCard = ({ temperature = 13, type = "wind" }) => {
    const [location, setLocation] = useState("위치 불러오는 중...");
    const [dateTime, setDateTime] = useState(getFormattedDateTime());

    useEffect(() => {
        // 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const address = await getAddressFromCoords(longitude, latitude);
                        setLocation(address);
                    } catch (error) {
                        console.error("주소 변환 실패:", error);
                        setLocation("주소를 불러올 수 없습니다");
                    }
                },
                (err) => {
                    console.warn("위치 접근 거부:", err);
                    setLocation("위치 접근 거부됨");
                }
            );
        } else {
            setLocation("브라우저가 위치 기능을 지원하지 않음");
        }

        //시간 초마다 갱신
        const interval = setInterval(() => {
            setDateTime(getFormattedDateTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const { date, time } = dateTime;

    return (
        <div className={styles.weatherCard}>
            {weatherComponents[type]}

            <div className={styles.weatherContent}>
                <div className={styles.weather_location}>
                    <img src={pinIcon} alt="location pin" className={styles.pinIcon} />
                    <span className={styles.weather_location_detail}>{location}</span>
                </div>

                <div className={styles.top}>
                    <div className={styles.locationInfo}>
                        <div className={styles.tempWithIcon}>
                            {weatherIcons[type]}
                            <div>
                                <div className={styles.temperature}>{temperature}°C</div>
                                <div className={styles.temperature_Detail}>4°C / 15°C</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dateInfo}>
                        <div className={styles.dateInfo_day}>{date}</div>
                        <div className={styles.deteTime}>{time}</div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.noticeBox}>
                    <div className={styles.weather_text}>
                        오늘은 강수량 OOmm로 <strong>강한 비와 천둥번개</strong>가 예보되어있어요.
                        <br />
                        <span className={styles.warn}>
                            전기 설비 근처 접근을 삼가고, 감전사고에 유의하세요!
                        </span>{" "}
                        안전제일 :)
                    </div>
                </div>

                <div className={styles.moreBtn_detail}>
                    <button className={styles.moreBtn}>더 많은 정보 보기 &gt;</button>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
