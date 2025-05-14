import React, { useRef, useState } from 'react';
import styles from './WeatherInfo.module.css';
import CardNews from '../CardNews/main_Cardnews.jsx';
import WeatherSidebar from './WeatherSidebar.jsx';


const WeatherInfo = () => {
    const preventRef = useRef(null);
    const caseRef = useRef(null);
    const [currentSection, setCurrentSection] = useState("prevent");

    const scrollToSection = (section) => {
        setCurrentSection(section);
        const ref = section === "prevent" ? preventRef : caseRef;
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const preventContent = {
        title: "낙상사고 대처 및 예방책",
        description: `
낙상사고는 건설 현장, 일상생활, 고령자의 거주 환경 등 다양한 장소에서 빈번하게 발생하는 사고 유형입니다. 특히 현장에서는 지면이 고르지 않거나 미끄러운 경우, 적절한 보호 장비 없이 작업하는 경우에 자주 발생하며, 이는 큰 부상이나 생명을 위협하는 사고로 이어질 수 있습니다. 따라서 낙상사고를 예방하기 위해서는 작업 전 철저한 환경 점검이 선행되어야 합니다. 바닥 상태, 조명, 주변 장애물 유무 등을 체크하고, 미끄럼 방지 매트나 경고 표지 등을 설치해 작업자의 주의를 환기시키는 것도 중요합니다. 또한 사다리, 비계 등을 사용하는 고소작업의 경우 적절한 설치 상태와 구조적 안정성을 점검해야 하며, 사용자의 작업 방식도 교육되어야 합니다.

더불어 보호 장비 착용은 가장 기본적이고도 중요한 예방책입니다. 안전모, 미끄럼 방지화, 안전벨트 등은 각각 낙하물, 미끄러짐, 추락으로부터 신체를 보호하는 역할을 하며, 반드시 사용자의 체형에 맞게 착용되어야 효과가 있습니다. 예를 들어 안전모는 턱끈까지 잘 고정되어야 충격 시 벗겨지지 않으며, 미끄럼 방지화는 바닥 상태에 맞는 접지력을 가진 제품을 선택해야 합니다. 또한, 이러한 장비들은 정기적으로 점검 및 교체가 필요합니다. 시간이 지나며 마모되거나 손상된 보호 장비는 오히려 사고를 유발할 수 있기 때문입니다. 이러한 안전 관리 체계는 조직적이고 반복적으로 점검되어야 하며, 작업자 개개인이 ‘안전을 지키는 것’에 대한 책임감을 가지도록 교육하는 것이 무엇보다 중요합니다. 낙상사고는 대부분 사전에 예방 가능한 사고입니다. 철저한 준비와 꾸준한 교육, 올바른 장비 사용이야말로 우리의 생명을 지키는 최선의 방법입니다.
        `,
        items: [
            {
                title: "작업 전 안전 점검",
                description: "작업 전 장비와 작업 장소를 점검하여 낙상 위험 요소를 사전에 제거하세요.",
                image: null,
            },
            {
                title: "보호 장비 착용",
                description: "안전모, 안전벨트 등 보호 장비를 항상 착용하세요.",
                image: null,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <WeatherSidebar
                weatherType="wind"
                onScrollToSection={scrollToSection}
                currentSection={currentSection}
            />

            {/* 오른쪽: 내용 */}
            <div className={styles.content}>
                <section ref={preventRef} className={styles.section}>
                    <h2 className={styles.weatherInfo_Title}>{preventContent.title}</h2>
                    <p className={styles.weatherInfo_description}>{preventContent.description}</p>
                </section>

                <section ref={caseRef} className={styles.section}>
                    <h2 className={styles.weatherInfo_Title}>낙상 사고 사례</h2>
                    <div className={styles.weatherInfo_cardNews}>
                        {preventContent.items.map((item, idx) => (
                            <div className={styles.weatherCards}>
                                <CardNews
                                    key={`case-${idx}`}
                                    title={item.title}
                                    description={item.description}
                                    image={item.image}
                                    clssName={styles.weatherCard}
                                />
                            </div>
                        ))}
                    </div>

                </section>
            </div>
        </div>
    );
};

export default WeatherInfo;