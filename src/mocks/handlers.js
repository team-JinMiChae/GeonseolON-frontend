import { http } from 'msw';

export const handlers = [
    //날씨 컴포넌트 날씨 상태, 온도 전달
    http.get('/weather', (req) => {
        const body = JSON.stringify({ temperature: 22, type: 'wind' });
        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),
];
