import React, {useEffect, useState} from 'react';

import MainCardNews from '../../common/CardNews/main_Cardnews.jsx'; // MainCardNews를 임포트
import CardNews from '../../common/CardNews/CardNews.jsx';
import styles from './CardNewsCarousel.module.css';
import axios from '../../../utils/customAxios';


// CardNewsCarousel 컴포넌트 정의
const CardNewsCarousel = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [cardsPerPage, setCardsPerPage] = useState(() => {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 3; 
        return 5;
    });

    const currentCards = data.slice(currentIndex, currentIndex + cardsPerPage);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) setCardsPerPage(1);
            else if (window.innerWidth < 900) setCardsPerPage(2); 
            else if (window.innerWidth < 1200) setCardsPerPage(3);
            else if (window.innerWidth < 1500) setCardsPerPage(4);
            else setCardsPerPage(5);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 양쪽 버튼 클릭
    const handlePrev = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0)); // 0보다 작지 않게
    };
    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, data.length - cardsPerPage)); // 마지막 페이지 넘어가지 않게
    };

    

    useEffect(() => {
        const fetchCardNews = async () => {
            try {
                const res = await axios.get(`/card_news`, {
                    params: {
                        pageNo: page
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setData(res.data.cardNewsResponse);
                setPage(page => page + 1);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCardNews();
    }, []);

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel_CardNews}>
                <h2 className={styles.carouselTitle}>최신 뉴스</h2>
                <div className={styles.carouselWrapper}>
                    <button className={styles.prev} onClick={handlePrev} disabled={currentIndex === 0}>
                        {"<"}
                    </button>
                    <div className={styles.cardContainer}>
                        {currentCards.map((item) => (
                            <CardNews key={item.boardNo} title={item.title} content={item.content} attachments={item.attachments}/>
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