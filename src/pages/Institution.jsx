import React, { useState, useEffect } from 'react';
import styles from './Institution.module.css';

const { kakao } = window;

const Institution = () => {
    const [map, setMap] = useState(null);

    // 초기 중심 좌표
    const initCoord = new kakao.maps.LatLng(37.551399, 126.988259);
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: initCoord, //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };

    // 지도 보이기
    useEffect(() => {
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      setMap(new kakao.maps.Map(container, options)); // 지도 생성 및 객체 리턴
    }, []);

    return (
      <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>안전보건 교육기관 찾기</h1>
      </header>

      <div className={styles.searchSection}>
        {/* <div className={styles.selectGroup}>
          <select className={styles.select}>
            <option value="">선택</option>
          </select>

          <select className={styles.select}>
            <option value="">선택</option>
          </select>
        </div> */}

        <div className={styles.searchContainer}>
          <input type="text" placeholder="검색어를 입력하세요" className={styles.searchInput} />
          <button className={styles.searchButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.searchIcon}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Simple map placeholder as requested */}
      <div id="map" className={styles.mapPlaceholder}></div>

      {[
        { num: 1, name: "(주)한국안전보건기술원", address: "강원도 원주시 태장공단길 46", postal: "26311", phone: "033-734-3902", fax: "033-735-3903" },
        { num: 2, name: "주식회사 우리안전기술원", address: "전라남도 순천시 고지5길 3", postal: "57924", phone: "061-727-1135", fax: "061-742-9926" },
        { num: 3, name: "한국건설안전연구원(주)", address: "인천광역시 부평구 부평대로 138", postal: "21358", phone: "032-515-8082", fax: "032-517-8082" },
        { num: 4, name: "대신산업안전보건원", address: "서울특별시 강동구 천호대로151길 36 , 9층", postal: "5248", phone: "02-471-5555", fax: "02-476-3246" },
        { num: 5, name: "한국건설안전교육원(주)", address: "부산광역시 사상구 사상로 336 , 3층", postal: "46945", phone: "051-583-2601", fax: "051-583-2603" }
        ].map((item, index) => (
        <div key={index} className={styles.facilityItem}>
          <div className={styles.facilityHeader}>
            <span className={styles.facilityNumber}>{item.num}</span>
            <h3 className={styles.facilityName}>{item.name}</h3>
          </div>
          <div className={styles.facilityDetails}>
            <div>
              <span>{item.address}</span>
            </div>
            <div>
              <span>{item.postal}</span>
            </div>
            <div>
              <span>{item.phone}</span>
            </div>
            <div className={styles.facilityFax}>
              <span>{item.fax}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
};

export default Institution;