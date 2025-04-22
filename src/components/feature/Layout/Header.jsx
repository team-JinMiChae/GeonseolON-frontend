import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './Header.module.css';
import searchIcon from '../../../assets/icons/common/search.svg';
import menuIcon from '../../../assets/icons/common/menu.svg';
import Ranks from '../Header/Ranks'

const Header = () => {
    const [opened, setOpened] = useState(false);
    const openRef = useRef(null);

    const toggle = () => {
        setOpened(!opened)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div>
                    Logo
                </div>
                <div className={styles.content}>
                    <p className={styles.rankTitle}>인기 검색</p>
                    <Ranks />
                    <div className={styles.searchBar}>
                        <input placeholder='검색어를 입력하세요'/>
                        <button><img src={searchIcon}></img></button>
                    </div>
                    <button onClick={toggle}><img src={menuIcon}></img></button>
                </div>
            </div>
            <TransitionGroup component={null}>
                { opened ?
                <CSSTransition
                    appear
                    key={opened ? "opened" : "closed"}
                    classNames={{
                        enter: styles.menuEnter,
                        enterActive: styles.menuEnterActive,
                        exit: styles.menuExit,
                        exitActive: styles.menuExitActive
                    }}
                    timeout={500}
                    in={opened}
                    nodeRef={openRef}
                >
                    <div ref={openRef} className={styles.menu}>
                        <div className={styles.titleBox}>
                            <h3 className={styles.serviceTitle}>건설ON 서비스</h3>
                            <h3 className={styles.externalTitle}>관련 사이트</h3>
                        </div>
                        <div className={styles.linkBox}>
                            <div className={styles.serviceLinks}>
                                <Link className={styles.link} to='/chatAi'>AI 상담</Link>
                                <Link className={styles.link} to='/institution'>안전 기관</Link>
                                <Link className={styles.link} to='/rule'>안전 수칙</Link>
                                <Link className={styles.link} to='/accident'>사고 사례</Link>
                            </div>
                            <div className={styles.externalLinks}>
                                <button className={styles.link} onClick={()=>{window.open("https://www.moel.go.kr")}}>고용노동부</button>
                                <button className={styles.link} onClick={()=>{window.open("https://kosha.or.kr/kosha/index.do")}}>한국산업안전인력공단</button>
                            </div>
                        </div>
                    </div>
                </CSSTransition> : <div></div>
                }
            </TransitionGroup>
            
        </div>
    );
};

export default Header;