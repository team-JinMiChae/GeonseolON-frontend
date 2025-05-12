import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Category from './components/common/Category/Category.jsx'
import WeatherCard from "./components/common/WeatherCard/WeatherCard.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
