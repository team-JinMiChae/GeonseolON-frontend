import './App.css'
import Header from './components/feature/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          
            <Routes>
              <Route path="/" element={<Main />}/>
            </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
