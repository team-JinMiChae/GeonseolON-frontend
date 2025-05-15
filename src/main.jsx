import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function prepare() {
    // dev 모드일 때만 MSW 실행
    if (import.meta.env.DEV) {
        const { worker } = await import("./mocks/browser.js");
        await worker.start();
    }

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

prepare(); // 앱 초기화
