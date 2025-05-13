import React from 'react';
import styles from './main_Cardnews.module.css';
import { CiImageOff } from "react-icons/ci";


const MainCardNews = ({ title, description, image  }) => {
    return (
        <div className={styles.card_News}>
                <div className={styles.image}>
                    {image ? (
                        <img src={image} alt={title} className={styles.image} />
                    ) : (
                        <CiImageOff className={styles.noImageIcon} />
                    )}
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

        </div>
    );
};

export default MainCardNews;
