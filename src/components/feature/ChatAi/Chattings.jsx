import { useRef, useEffect } from "react"
import styles from "./Chattings.module.css"
import LoadingDots from "../../common/LoadingDots"

export default function Chattings({ log, isLoading }) {
  const messagesContainerRef = useRef(null)

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  // 컴포넌트가 마운트되거나 메시지가 추가될 때 스크롤을 맨 아래로 이동
  useEffect(() => {
    scrollToBottom()
  }, [log])

  return (
    <div className={styles.chatContainer}>
      <div ref={messagesContainerRef} className={`${styles.messagesContainer} ${styles.hideScrollbar}`}>
        {log.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageSpace} ${
              message.sender === "USER" ? styles.messageSpaceUser : styles.messageSpaceConstruction
            }`}
          >
            {message.sender === "BOT" && (
              <div className={`${styles.avatarContainer} ${styles.avatarContainerLeft}`}>
                <div className={styles.avatarWrapper}>
                  <img src="src/assets/chatbots/chatbot2_up.png" width="50px" alt="건설이" fill className="rounded-full" />
                </div>
              </div>
            )}

            <div
              className={`${styles.messageBubble} ${
                message.sender === "USER" ? styles.messageBubbleUser : styles.messageBubbleConstruction
              }`}
            >
              {message.text}
            </div>

            {message.sender === "USER" && (
              <div className={`${styles.avatarContainer} ${styles.avatarContainerRight}`}>
                <span className={styles.avatarName}>당신</span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.messageSpace} ${styles.messageSpaceConstruction}`}>
            <div className={`${styles.avatarContainer} ${styles.avatarContainerLeft}`}>
              <div className={styles.avatarWrapper}>
                <img src="src/assets/chatbots/chatbot2_up.png" width="50px" alt="건설이" fill className="rounded-full" />
              </div>
            </div>
            <div className={`${styles.messageBubble} ${styles.messageBubbleConstruction}`}>
              <LoadingDots />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
