import React from "react";
import styles from "./Category.module.css";

import Accident_Icon from "../../../assets/icons/common/serviceIcon/Accident_Icon.png"
import AiMessage_Icon from "../../../assets/icons/common/serviceIcon/AiMessage_Icon.png"
import Agency_Icon from "../../../assets/icons/common/serviceIcon/Agency_Icon.png";
import SafetyRules_Icon from "../../../assets/icons/common/serviceIcon/SafetyRules_Icon.png";
import Kosha from "../../../assets/icons/common/serviceIcon/KOSHA.png";
import Moel from "../../../assets/icons/common/serviceIcon/MOEL.png";


const services = [
    { label: "AI 상담", icon: AiMessage_Icon },
    { label: "안전 기관", icon: Agency_Icon  },
    { label: "고용노동부", icon: Moel },
    { label: "안전 수칙", icon: SafetyRules_Icon },
    { label: "사고 사례", icon: Accident_Icon  },
    { label: (
            <>
                한국산업 <br />
                안전 보건공단
            </>
        ), icon: Kosha },
];
const Category = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>건설ON 서비스</div>
            <div className={styles.grid}>
                {services.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.circle}></div>
                        <img src={item.icon} alt={item.label} className={styles.icon} />
                        <span className={styles.label}>{item.label}</span>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Category;