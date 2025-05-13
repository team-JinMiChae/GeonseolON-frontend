import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChatAiInfo.module.css';
import chatIcon from '../../../assets/icons/feature/chat.svg'
import feature1Icon from '../../../assets/icons/feature/chat_feature1.svg'
import feature2Icon from '../../../assets/icons/feature/chat_feature2.svg'
import feature3Icon from '../../../assets/icons/feature/chat_feature3.svg'

const ChatAiInfo = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperDetail}>
            <div className={styles.innerHeader}>

                <div className={styles.titleBox}>
                    <img src={chatIcon}/>
                    <div className={styles.textBox}>
                        <h2 className={styles.serviceTitle}>AI 채팅 상담 서비스</h2>
                        <p className={styles.serviceDesc}>궁금한 내용을 <strong>건설이</strong>에게 물어보세요! <strong>건설이</strong>가
                            알려줄게요! </p>
                    </div>
                </div>
                <Link className={styles.link} to="/chatAi">서비스 바로가기 &gt;</Link>
            </div>
                <div className={styles.featureBox}>
                    <div className={styles.featureItem}>
                        <h3>다양한 분야</h3>
                        <img src={feature1Icon}/>
                        <p className={styles.featureDesc}>
                            다양한 분야의 서비스를<br/>채팅 상담을 통해<br/>간편하게 이용해보세요
                        </p>
                    </div>
                    <div className={styles.featureItem}>
                        <h3>어디서나 편하게</h3>
                        <img src={feature2Icon}/>
                        <p className={styles.featureDesc}>
                            언제 어디서나 24시간<br/>상담이 가능해요
                        </p>
                    </div>
                    <div className={styles.featureItem}>
                        <h3>회원가입 없이 이용</h3>
                        <img src={feature3Icon}/>
                        <p className={styles.featureDesc}>
                            로그인 / 회원 가입 없이<br/>편리하게 이용 가능해요
                        </p>
                    </div>
                    <img className={styles.character} src={'src/assets/chatbots/chatbot2_up.png'}/>
                </div>

            </div>
        </div>
    );
};

export default ChatAiInfo;