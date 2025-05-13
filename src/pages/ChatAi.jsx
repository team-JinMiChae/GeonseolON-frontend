import { useState, useEffect } from "react"
import styles from "./ChatAi.module.css"
import Input from "../components/feature/ChatAi/Input"
import Welcome from "../components/feature/ChatAi/Welcome"
import Chattings from "../components/feature/ChatAi/Chattings"

export default function ChatBot() {
  const limit = 5;
  const [isConversationStarted, setIsConversationStarted] = useState(false); // 대화 시작 여부
  const [inputValue, setInputValue] = useState("") // user 질문
  const [log, setLog] = useState([]);
  const [canAsk, setCanAsk] = useState(true);
  const [isLimited, setIsLimited] = useState(false);

  const handleSubmit = () => {
    // e.preventDefault()
    if (!inputValue.trim() || !canAsk) return;

    console.log(inputValue);

    setCanAsk(false);
    setLog((prev) => [...prev, {sender: "user", message: inputValue}]);
    console.log(log);
    // 질문 기다리기
    setTimeout(() => {
        const response = "건설이 답변입니다";
        setLog((prev) => [...prev, {sender: "bot", message: response}]);
        setCanAsk(true);
    }, 1000);

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
        <div className={styles.chatArea}>
            {isConversationStarted ? <Chattings log={log}/> : <Welcome />}
        </div>
        <Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          canAsk={canAsk}
          isLimited={isLimited}
          />
    </div>
  )
}
