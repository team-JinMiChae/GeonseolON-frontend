import React, { useState} from 'react';
import styles from './CardNews.module.css';
import Modal from "../Modal"

// 추후 데이터 형식에 따라 수정
const getImageUrl = type => {
    switch (type) {
        case "추락":
            return "src/assets/newsCard/추락.png";
        case "감전":
            return "src/assets/newsCard/감전.png";
        case "낙하물 사고":
            return "src/assets/newsCard/낙하물 사고.png";
        case "열사병":
            return "src/assets/newsCard/열사병.png";
        case "동바리 사고":
            return "src/assets/newsCard/동바리 사고.png";
        case "중독, 질식":
            return "src/assets/newsCard/중독, 질식.png";
        case "침수":
            return "src/assets/newsCard/침수.png";
        case "토사 붕괴":
            return "src/assets/newsCard/토사 붕괴.png";
        default:
            return "src/assets/newsCard/기타.png";
    }
}

const MainCardNews = ({ type, title, content, attachments }) => {
    const imageUrl = getImageUrl(type);

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.card_News}>
            {isOpen && 
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className={styles.modalContent}>
                        <div classNmae={styles.leftContent}>
                            <h3 className={styles.title}>{title}</h3>
                            <p className={styles.content}>{content}</p>
                        </div>
                        <div className={styles.rightContent}>
                            <h3 className={styles.title}>첨부자료</h3>
                            <div className={styles.attachments}>
                                {
                                    attachments.map((attachment, index) => (
                                        <a
                                            key={index}
                                            className={styles.attachment}
                                            href={attachment.fileUrl}
                                            rel="noopener noreferrer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={styles.downloadIcon}>
                                                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
                                            </svg>
                                            첨부자료 {index + 1}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
            }
            <div className={styles.image} onClick={() => setIsOpen(true)}>
                <img src={imageUrl} alt={title} className={styles.image} />
            </div>
            <p className={styles.externalTitle}>{title}</p>
        </div>
    );
};

export default MainCardNews;
