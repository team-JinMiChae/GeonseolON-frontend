import React, { useState } from 'react';

import MainCardNews from '../../common/CardNews/main_Cardnews.jsx'; // MainCardNews를 임포트
import styles from './CardNewsCarousel.module.css';


// CardNewsCarousel 컴포넌트 정의
const CardNewsCarousel = () => {
    // 데이터 정의
    const data = [
        { title: "뉴스 1", description: "카드 뉴스 간략한 내용121212",  image: "" },
        { title: "뉴스 2", description: "카드 뉴스 간략한 내용" ,  image: ""},
        { title: "뉴스 3", description: "카드 뉴스 간략한 내용",  image: "" },
        { title: "뉴스 4", description: "카드 뉴스 간략한 내용",  image: "" },
        { title: "뉴스 5", description: "카드 뉴스 간략한 내용",  image: "" },
        { title: "뉴스 6", description: "카드 뉴스 간략한 내용",  image: "" },
        { title: "뉴스 7", description: "카드 뉴스 간략한 내용",  image: "" },
        { title: "뉴스 8", description: "카드 뉴스 간략한 내용",  image: "" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const cardsPerPage = 5;

    // 양쪽 버튼 클릭
    const handlePrev = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0)); // 0보다 작지 않게
    };
    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, data.length - cardsPerPage)); // 마지막 페이지 넘어가지 않게
    };

    const currentCards = data.slice(currentIndex, currentIndex + cardsPerPage);

    return (
        <div className={styles.carousel}>

            <div className={styles.carousel_CardNews}>
                <h2 className={styles.carouselTitle}>최신 뉴스</h2>
                <div className={styles.carouselWrapper}>
                    <button className={styles.prev} onClick={handlePrev} disabled={currentIndex === 0}>
                        {"<"}
                    </button>
                    <div className={styles.cardContainer}>
                        {currentCards.map((item, index) => (
                            <MainCardNews key={index} title={item.title} description={item.description}/>
                        ))}
                    </div>
                    <button className={styles.next} onClick={handleNext}
                            disabled={currentIndex === data.length - cardsPerPage}>
                        {">"}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CardNewsCarousel;