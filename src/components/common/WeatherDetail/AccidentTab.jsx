import React from 'react';
import styles from './AccidentTab.module.css'

const AccidentTab = ({ onMoveTab, currentTab, tabs }) => {
    console.log(currentTab)
    return (
        <div className={styles.tabContainer}>
            {tabs.map(tab => 
                <button className={`${styles.tab} ${tab === currentTab ? styles.selectedTab : ""}`} onClick={onMoveTab} value={tab}>
                    {tab}
                </button>
            )}
        </div>
    );
};

export default AccidentTab;