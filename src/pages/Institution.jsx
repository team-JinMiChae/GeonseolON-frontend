import React, { useState, useEffect, useRef } from 'react';
import styles from './Institution.module.css';

const { kakao } = window;

const Institution = () => {
    const [map, setMap] = useState(null);
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const markersRef = useRef([]); // 마커 관리용 ref

    // 초기 지도 중심 좌표 (서울 시청 근처)
    const initCoord = new kakao.maps.LatLng(37.5665, 126.9780);
    const options = {
        center: initCoord,
        level: 4,
    };

    // 지도 생성 (한번만)
    useEffect(() => {
        const container = document.getElementById('map');
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
    }, []);

    // 위치 받아서 백엔드 호출 및 마커 표시
    useEffect(() => {
        if (!map) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // 지도 중심 이동
                    const center = new kakao.maps.LatLng(latitude, longitude);
                    map.setCenter(center);

                    fetchInstitutions(latitude, longitude);
                },
                (error) => {
                    console.error('위치 정보를 가져올 수 없습니다:', error);
                    // 위치 권한 거부 시 기본 위치에서 기관 리스트 호출
                    fetchInstitutions(initCoord.getLat(), initCoord.getLng());
                }
            );
        } else {
            alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
            fetchInstitutions(initCoord.getLat(), initCoord.getLng());
        }
    }, [map]);

    // 백엔드 API 호출
    const fetchInstitutions = async (latitude, longitude, lastId = null) => {
        setLoading(true);
        try {
            let url = `${import.meta.env.VITE_BASE_URL}/api/v1/institution?latitude=${latitude}&longitude=${longitude}`;
            if (lastId) url += `&lastId=${lastId}`;

            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
            }

            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('응답이 JSON 형식이 아닙니다.');
            }

            const data = await res.json();
            console.log('응답 데이터:', data);

            setInstitutions(data.content || []);
            displayMarkersOnMap(data.content || []);
        } catch (error) {
            console.error('데이터 불러오기 오류:', error.message);
        } finally {
            setLoading(false);
        }
    };


    // 마커 표시 및 관리
    const displayMarkersOnMap = (institutionList) => {
        // 기존 마커 제거
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        institutionList.forEach((inst) => {
            const position = new kakao.maps.LatLng(inst.latitude, inst.longitude);
            const marker = new kakao.maps.Marker({
                map: map,
                position,
                title: inst.name,
            });

            // 인포윈도우 생성
            const infowindow = new kakao.maps.InfoWindow({
                content: `
          <div style="padding:5px; min-width:150px;">
            <strong>${inst.name}</strong><br/>
            ${inst.address}<br/>
            전화: ${inst.phoneNumber}
          </div>
        `,
            });

            kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(map, marker);
            });

            markersRef.current.push(marker);
        });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>안전보건 교육기관 찾기</h1>
            </header>

            <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className={styles.searchInput}
                        // 검색 기능 추가 가능
                    />
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

            <div id="map" className={styles.mapPlaceholder} style={{ width: '100%', height: '400px' }}></div>

            <section className={styles.listSection}>
                {loading && <p>로딩 중...</p>}
                {!loading && institutions.length === 0 && <p>기관 정보를 불러오지 못했습니다.</p>}
                {!loading &&
                    institutions.map((item) => (
                        <div key={item.id} className={styles.facilityItem}>
                            <div className={styles.facilityHeader}>
                                <h3 className={styles.facilityName}>{item.name}</h3>
                            </div>
                            <div className={styles.facilityDetails}>
                                <div>{item.address}</div>
                                <div>우편번호: {item.postalCode}</div>
                                <div>전화: {item.phoneNumber}</div>
                                <div>팩스: {item.faxNumber}</div>
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    );
};

export default Institution;
