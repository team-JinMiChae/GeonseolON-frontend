import { useState, useEffect } from "react"
import styles from "./ChatAi.module.css"
import Input from "../components/feature/ChatAi/Input"
import Welcome from "../components/feature/ChatAi/Welcome"
import Chattings from "../components/feature/ChatAi/Chattings"
import axios from "../utils/customAxios"
import Modal from "../components/common/Modal"

export default function ChatBot() {
  const limit = 5;
  const [isConversationStarted, setIsConversationStarted] = useState(false); // 대화 시작 여부
  const [inputValue, setInputValue] = useState("") // user 질문
  const [log, setLog] = useState([]);
  const [canAsk, setCanAsk] = useState(true);
  const [isLimited, setIsLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    // e.preventDefault()
    if (!inputValue.trim() || !canAsk) return;

    setCanAsk(false)
    setIsLoading(true);
    try {
      setLog(prev => [...prev, {sender: "USER", text: inputValue}])
      const response = await axios.post("/chat", log)
      setLog(prev => [...prev, {"text": response.data.text, "sender": "BOT"}])
      setIsLoading(false);
      setCanAsk(true);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setLog(prev => [...prev, {"text": "오류가 발생했습니다. 새로고침 해주세요.", "sender": "BOT"}]);
        setIsError(true);
      }, 1000);
      setIsLoading(false);
    }
    
    setIsConversationStarted(true)
    setInputValue("")
  }

  // 횟수를 채우면 질문 닫기
  useEffect(() => {
    if (log.length >= limit * 2 - 1) {
      setCanAsk(false);
      setIsLimited(true);
    }
  }, [log])

  return (
    <div className={styles.wrapper}>
        <Modal isOpen={isError} onClose={() => {
          setIsError(false);
          window.location.reload();
        }}>
          <div className={styles.errorModal}>
            <p className={styles.errorMessage}>오류가 발생했습니다.<br />이 창을 닫으면 새로고침됩니다.</p>
          </div>
        </Modal>
        <div className={styles.chatArea}>
            {isConversationStarted ? <Chattings log={log} isLoading={isLoading} /> : <Welcome />}
        </div>
        <Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          canAsk={canAsk}
          isLimited={isLimited}
          isLoading={isLoading}
          />
    </div>
  )
}
