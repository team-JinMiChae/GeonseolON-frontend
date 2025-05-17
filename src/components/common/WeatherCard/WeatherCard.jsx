import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import axios from "../../../utils/customAxios";

// 날씨별 컴포넌트 매핑
const weatherComponents = {
    hot: <Hot />,
    clearDay: <ClearDay />,
    cloudy: <Cloudy />,
    snowy: <Snowy />,
    rain: <Rain />,
    lightning: <Lightning />,
    wind: <Wind />,
};

// 날씨별 아이콘 매핑
const weatherIcons = {
    HOT: <LuSun size={82} color="#2E2E2E" />,
    CLEARDAY: <TiWeatherPartlySunny size={82} color="#2E2E2E" />,
    CLOUDY: <TiWeatherCloudy size={82} color="#2E2E2E" />,
    RAIN: <TiWeatherDownpour size={82} color="#2E2E2E" />,
    LIGHTNING: <TiWeatherStormy size={82} color="#2E2E2E" />,
    SNOWY: <TiWeatherSnow size={82} color="#2E2E2E" />,
    WIND: <TiWeatherWindy size={82} color="#2E2E2E" />,
};

// 현재 날짜와 시간을 포맷팅해서 반환하는 함수
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

// 위도, 경도 -> 주소 변환 (카카오 API 호출)
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
        if (!fullAddress) return "주소를 찾을 수 없습니다.";
        const [first, second] = fullAddress.split(" ");
        return `${first} ${second}`;
    } catch (error) {
        console.error("주소 변환 실패:", error);
        return "주소 변환 실패";
    }
};

const WeatherCard = () => {
    const [latLong, setLatLong] = useState([null, null]);
    const [location, setLocation] = useState("위치 불러오는 중...");
    const [dateTime, setDateTime] = useState(getFormattedDateTime());
    const navigate = useNavigate();
    const [weatherGuide, setWeatherGuide] = useState(null);
    const weatherTypeMent = {
        HOT: "매우 뜨거워요.",
        CLEARDAY: "맑은 날씨에요.",
        CLOUDY: "구름이 많아요.",
        RAIN: "비가 오고 있어요.",
        LIGHTNING: "천둥번개가 있어요.",
        SNOWY: "눈이 오고 있어요.",
        WIND: "바람이 많아요.",
    }

    const loadWeatherGuide = async () => {
        try {
            const res = await axios.get(`/weather_guide?latitude=${latLong[0]}&longitude=${latLong[1]}&regionName=${location}`);
            setWeatherGuide(res.data)
        } catch (error) {
            console.error("날씨 가이드 로드 실패:", error);
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatLong([latitude, longitude])
                    const address = await getAddressFromCoords(longitude, latitude);
                    setLocation(address);
                },
                (err) => {
                    console.warn("위치 접근 거부:", err);
                    setLocation("위치 접근 거부됨");
                }
            );
        } else {
            setLocation("브라우저가 위치 기능을 지원하지 않음");
        }

        const interval = setInterval(() => {
            setDateTime(getFormattedDateTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        loadWeatherGuide();
    }, [location]);

    const { date, time } = dateTime;

    return (
        <div className={styles.weatherCard}>
            {weatherGuide?.type && weatherComponents[weatherGuide.type]}

            <div className={styles.weatherContent}>
                <div className={styles.weather_location}>
                    <img src={pinIcon} alt="location pin" className={styles.pinIcon} />
                    <span className={styles.weather_location_detail}>{location}</span>
                </div>

                <div className={styles.top}>
                    <div className={styles.locationInfo}>
                        <div className={styles.tempWithIcon}>
                            {weatherGuide?.type && weatherIcons[weatherGuide.type]}
                            <div>
                                <div className={styles.temperature}>
                                    {weatherGuide !== null && weatherGuide.tmp !== null ? `${weatherGuide.tmp}°C` : "로딩 중..."}
                                </div>
                                <div className={styles.temperature_Detail}>
                                    {weatherGuide !== null && weatherGuide.tmn !== null && weatherGuide?.tmx !== null ? `${weatherGuide.tmn}°C / ${weatherGuide.tmx}°C` : "로딩 중..."}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.dateInfo}>
                        <div className={styles.dateInfo_day}>{date}</div>
                        <div className={styles.dateTime}>{time}</div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.noticeBox}>
                    <div className={styles.weather_text}>
                        {/* 오늘은 강수량 {weatherGuide.pop}%로 <strong>강한 비와 천둥번개</strong>가 예보되어있어요. */}
                        {weatherGuide !== null && weatherGuide.pop !== null && weatherGuide?.type !== null && `오늘은 강수량 ${weatherGuide.pop}%로 ${weatherTypeMent[weatherGuide.type]}`}
                        <br />
                        <span className={styles.warn}>
                            {weatherGuide !== null && weatherGuide.weatherMent !== null && weatherGuide.weatherMent}
                        </span>{" "}
                        안전제일 :)
                    </div>
                </div>

                <div className={styles.moreBtn_detail}>
                    <button
                        className={styles.moreBtn}
                        onClick={() => navigate("/weatherDetail")}
                    >
                        더 많은 정보 보기 &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
