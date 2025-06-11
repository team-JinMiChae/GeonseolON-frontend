import React, { useState, useEffect, useRef } from 'react';
import styles from './Institution.module.css';

const { kakao } = window;

const Institution = () => {
    const [map, setMap] = useState(null);
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const markersRef = useRef([]);
    const infowindowRef = useRef(null);

    const initCoord = new kakao.maps.LatLng(37.5665, 126.9780);
    const options = {
        center: initCoord,
        level: 4,
    };

    useEffect(() => {
        const container = document.getElementById('map');
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);

        infowindowRef.current = new kakao.maps.InfoWindow({ removable: true });

        kakao.maps.event.addListener(mapInstance, 'click', () => {
            if (infowindowRef.current) {
                infowindowRef.current.close();
            }
        });
    }, []);

    useEffect(() => {
        if (!map) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    const center = new kakao.maps.LatLng(latitude, longitude);
                    map.setCenter(center);
                    fetchInstitutions(latitude, longitude);
                },
                (error) => {
                    console.warn('위치 정보 실패:', error);
                    fetchInstitutions(initCoord.getLat(), initCoord.getLng());
                }
            );
        } else {
            alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
            fetchInstitutions(initCoord.getLat(), initCoord.getLng());
        }
    }, [map]);

    const fetchInstitutions = async (latitude, longitude) => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/api/v1/institution?latitude=${latitude}&longitude=${longitude}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error(`기관 정보 요청 실패: ${res.status}`);

            const data = await res.json();
            setInstitutions(data.content || []);
            displayMarkersOnMap(data.content || []);
        } catch (error) {
            console.error('기관 정보 불러오기 오류:', error.message);
            setInstitutions([]);
        } finally {
            setLoading(false);
        }
    };

    const displayMarkersOnMap = (institutionList) => {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        if (!institutionList.length) return;

        institutionList.forEach((inst) => {
            const position = new kakao.maps.LatLng(inst.latitude, inst.longitude);
            const marker = new kakao.maps.Marker({ map, position, title: inst.name });

            kakao.maps.event.addListener(marker, 'click', () => {
                const content = `
                    <div style="padding:5px; min-width:150px;">
                        <strong>${inst.name}</strong><br/>
                        ${inst.address}<br/>
                        전화: ${inst.phoneNumber}
                    </div>`;
                infowindowRef.current.setContent(content);
                infowindowRef.current.open(map, marker);
            });

            markersRef.current.push(marker);
        });

        map.setCenter(new kakao.maps.LatLng(institutionList[0].latitude, institutionList[0].longitude));
        map.setLevel(5);
    };

    const handleInstitutionClick = (index) => {
        const marker = markersRef.current[index];
        const inst = institutions[index];
        if (!marker || !inst) return;

        map.setCenter(marker.getPosition());
        map.setLevel(5);

        const content = `
            <div style="padding:5px; min-width:150px;">
                <strong>${inst.name}</strong><br/>
                ${inst.address}<br/>
                전화: ${inst.phoneNumber}
            </div>`;
        infowindowRef.current.setContent(content);
        infowindowRef.current.open(map, marker);
    };

    const onChangeSearch = (e) => setSearchKeyword(e.target.value);

    const onSearchPlace = () => {
        if (!map || !searchKeyword.trim()) return;

        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(searchKeyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const place = data[0];
                const lat = parseFloat(place.y);
                const lng = parseFloat(place.x);
                const center = new kakao.maps.LatLng(lat, lng);
                map.setCenter(center);

                fetchInstitutions(lat, lng);
                // sendCoordinatesToServer(lat, lng); // 필요 시 사용
            } else {
                alert('검색 결과가 없습니다.');
            }
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
                        value={searchKeyword}
                        onChange={onChangeSearch}
                        onKeyDown={(e) => e.key === 'Enter' && onSearchPlace()}
                    />
                    <button className={styles.searchButton} onClick={onSearchPlace}>
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

            <div className={styles.mapContainer}>
                <div id="map" className={styles.mapPlaceholder}></div>

                <section className={styles.listSection}>
                    {loading && <p>로딩 중...</p>}
                    {!loading && institutions.length === 0 && <p>기관 정보를 불러오지 못했습니다.</p>}
                    {!loading &&
                        institutions.map((item, index) => (
                            <div
                                key={item.id}
                                className={styles.facilityItem}
                                onClick={() => handleInstitutionClick(index)}
                                style={{ cursor: 'pointer' }}
                            >
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
        </div>
    );
};

export default Institution;
