import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './Ranks.module.css';
import downArrowIcon from '../../../assets/icons/common/downArrow.svg'

const RanksEx = {
    1: "재해사례1",
    2: "재해사례2",
    3: "재해사례3",
    4: "재해사례4",
    5: "재해사례5"
}

const Ranks = () => {
    const ranksLength = 5;
    const interval = 3000;
    const [rank, setRank] = useState(1);
    const [opened, setOpened] = useState(false);
    const nodeRef = React.useMemo(() => React.createRef(), [rank]);
    const ranksRef = useRef(null);
    const openArrowRef = useRef(null);

    const toggle = () => {
        setOpened(!opened);
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            setRank(i => i % ranksLength + 1);
        }, interval);
        return () => clearInterval(timerId);
    }, [ranksLength, interval]);

    return (
        <div className={styles.wrapper}>
            <TransitionGroup>
                {
                    opened ?
                    <CSSTransition
                    appear
                    key={opened ? "opened" : "closed"}
                    nodeRef={ranksRef}
                    classNames={{
                        enter: styles.ranksEnter,
                        enterActive: styles.ranksEnterActive,
                        exit: styles.ranksExit,
                        exitActive: styles.ranksExitActive
                    }}
                    timeout={300}
                >
                    <div className={styles.openRanks} ref={ranksRef}>
                        {Object.entries(RanksEx).map(([key, value]) => 
                            <div className={styles.openedItem} key={key}>
                                <span>{key}</span>
                                <p>{value}</p>
                            </div>
                        )}
                    </div>
                    </CSSTransition> : <div></div>
                }
            </TransitionGroup>
            
            <div className={styles.innerWrapper}>
                <TransitionGroup component={null}>
                    <CSSTransition
                    key={rank}
                    timeout={2000}
                    nodeRef={nodeRef}
                    classNames={{
                        enter: styles.slideDownEnter,
                        enterActive: styles.slideDownEnterActive,
                        exit: styles.slideDownExit,
                        exitActive: styles.slideDownExitActive
                    }}
                    >
                    <div ref={nodeRef} className={styles.item}>
                        <span>{rank}</span>
                        <p>{RanksEx[rank]}</p>
                    </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            
            <button
                className={styles.openButton}
                onClick={toggle}
                data-opened={opened.toString()}
            >
                <img ref={openArrowRef} src={downArrowIcon} />
            </button>
            
        </div>
        
    );
};

export default Ranks;