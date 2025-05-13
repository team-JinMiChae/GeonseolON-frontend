import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./Hot.css";
import hotBackImg from "../../../../../assets/WeatherImg/Hot/HotBackImg.png";
import sunImg from "../../../../../assets/WeatherImg/Hot/SunImg.png";
import sunRayImg1 from "../../../../../assets/WeatherImg/Hot/sunRightImg_1.png";
import sunRayImg2 from "../../../../../assets/WeatherImg/Hot/sunRightImg_2.png";
import sunRayImg3 from "../../../../../assets/WeatherImg/Hot/sunRightImg_3.png";



const Hot = () => {
    const [showSun, setShowSun] = useState(false);
    const sunRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowSun(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="hot-background"
            style={{
                backgroundImage: `url(${hotBackImg})`,
            }}
        >
            <CSSTransition
                in={showSun}
                timeout={800}
                classNames="sun"
                unmountOnExit
                nodeRef={sunRef}
            >
                <div className="sun-wrapper" ref={sunRef}>
                    <img src={sunImg} alt="태양" className="sun-image glow"/>
                    <img src={sunRayImg1} alt="햇살" className="sun-rays1"/>
                    <img src={sunRayImg2} alt="햇살" className="sun-rays2"/>
                    <img src={sunRayImg3} alt="햇살" className="sun-rays3"/>
                </div>
            </CSSTransition>
        </div>
);
};

export default Hot;
