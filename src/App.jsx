import './App.css'
import Header from './components/feature/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import styles from './App.module.css';
import ChatAi from './pages/ChatAi';
import Institution from './pages/Institution';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Main />}/>
              <Route path="/chatAi" element={<ChatAi />}/>
              <Route path="/institution" element={<Institution />}/>
              <Route path="/rule" element={<Rule />}/>
              <Route path="/accident" element={<Accident />}/>
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
