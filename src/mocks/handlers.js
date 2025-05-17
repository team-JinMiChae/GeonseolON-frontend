import { http } from 'msw';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const handlers = [
    //날씨 컴포넌트 날씨 상태, 온도 전달
    http.get('/weather', () => {
        const body = JSON.stringify({ temperature: 22, type: 'wind' });
        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),

    // 날씨 안내 문구 조회
    http.get(`${baseUrl}/weather_guide`, ({ request }) => {
        const searchParams = new URL(request.url).searchParams;
        const latitude = searchParams.get('latitude');
        const longitude = searchParams.get('longitude');
        const regionName = searchParams.get('regionName');
        console.log(latitude, longitude, regionName);
        const body = JSON.stringify({
            "type": "WIND",
            "pop": "0", // 강수확률
            "reh": "45", // 습도
            "tmp": "20", // 기온
            "tmn": "13.0", // 최저기온
            "tmx": "21.0", // 최고기온
            "fcstTime": "1800", // 예보시간
            "fcstDate": "20250511", // 예보일자
            "weatherMent": "오늘의 작업 현장 날씨 안내\n\n💨 강한 바람이 불고 있습니다 (풍속 5.1m/s). 고소 장비나 크레인 사용 전 안전 점검이 필요합니다.\n\n⛑️ 오늘도 안전한 작업 되시길 바랍니다. 장비 점검과 작업 전 교육을 잊지 마세요.\n"
        });
        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }),

    // 채팅 AI 조회
    http.get(`${baseUrl}/chat_ai`, ({ request }) => {
        const requestBody = request.json();
        console.log(requestBody);

        const body = JSON.stringify({
            "text": "### 달비계 관련 사고 사례\n\n1. **달비계 지지용 로프 풀림으로 인한 추락**\n   - 재해개요: 달비계에 탑승하여 도장 작업을 하던 중 로프 매듭이 풀리면서 달비계와 함께 지상으로 추락하여 사망.\n   - 주요 원인: 로프 매듭의 부적절한 결속 및 안전 점검 미흡.\n\n2. **달비계 지지로프 결속부 이탈로 인한 추락**\n   - 재해개요: 후면 발코니 창호 코킹 작업을 위해 달비계에 탑승 중 지지로프 결속부가 이탈하면서 약 40m 아래로 추락하여 사망.\n   - 주요 원인: 철물(탈기관)의 부적절한 설치 및 안전 점검 미흡.\n\n3. **달비계 지지대 이탈 및 구명줄 파단으로 인한 추락**\n   - 재해개요: 아파트 외벽 도장 작업을 위해 달비계를 사용 중 지지대 이탈 및 구명줄 파단으로 지상 1층 바닥으로 떨어져 사망.\n   - 주요 원인: 지지대의 부적절한 설치 및 구명줄의 관리 소홀.\n\n### 예방 대책\n1. **로프 및 장비 점검**\n   - 작업 전 로프 및 장비의 상태를 철저히 점검.\n\n2. **올바른 설치 및 결속**\n   - 로프의 결속 및 지지대의 설치가 안전 규정에 맞게 이루어져야 함.\n\n3. **안전 교육 및 관리**\n   - 작업자는 달비계 사용에 대한 충분한 교육을 받아야 하며, 지속적인 안전 관리가 필요.\n\n### 다음에 논의할 수 있는 주제\n- 달비계 작업 시 안전 수칙 강화 방안\n- 달비계 관련 최신 안전 규정 및 가이드라인"
        })        
        
        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    })
];
