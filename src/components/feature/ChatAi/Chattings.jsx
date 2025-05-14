"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./Chattings.module.css"

const mockMessages = [
{"sender": "user", "message": "호우 시 상황을 어떻게 파악해야 하나요?"},
{"sender": "bot", "message": "호우 시 상황을 수시로 파악하는 것이 중요합니다. 강우량을 지속적으로 모니터링하여 시간당 1mm 이상의 강우가 있는 경우에는 즉시 철골작업을 중지해야 합니다. 이를 통해 작업자의 안전을 확보할 수 있습니다."},
{"sender": "user", "message": "비상사태에 대비해서는 어떤 준비를 해야 할까요?"},
{"sender": "bot", "message": "비상사태에 대비하기 위해서는 비상용 수해방지 자재와 장비를 사전에 확보하여 비치해두어야 합니다. 또한 비상대기반을 편성하여 운영함으로써 신속한 대응이 가능하도록 해야 합니다."},
{"sender": "user", "message": "지하매설물 관리는 어떻게 해야 하나요?"},
{"sender": "bot", "message": "지하매설물 현황을 정확히 파악하고, 관련 기관들과 긴밀한 공조체계를 유지하는 것이 중요합니다. 이를 통해 호우 시 지하매설물 파손 등의 사고를 예방할 수 있습니다."},
{"sender": "user", "message": "현장 주변의 우기 취약시설은 어떻게 관리해야 하나요?"},
{"sender": "bot", "message": "현장 주변의 우기 취약시설에 대한 사전 안전점검과 보완 조치가 필요합니다. 침수, 붕괴 등의 위험을 사전에 파악하고 대응함으로써 피해를 최소화할 수 있습니다."},
{"sender": "user", "message": "공사용 가설도로와 침수된 작업장 관리는 어떻게 해야 할까요?"},
{"sender": "bot", "message": "공사용 가설도로의 안전을 확보하는 것이 중요합니다. 침수된 작업장의 경우 복구 후 전기기기 점검을 반드시 실시해야 합니다. 감전 사고 등을 예방하기 위해서입니다. 이와 같은 조치를 통해 안전한 공사 환경을 조성할 수 있습니다."}
]





export default function Chattings({ log }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고\n\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고",
      sender: "construction",
    },
    {
      id: 2,
      text: "어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고\n어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고",
      sender: "user",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
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
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          sender: "user",
        },
      ])
      setNewMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 텍스트 영역 자동 크기 조절
  const handleTextareaChange = (e) => {
    const textarea = e.target
    setNewMessage(textarea.value)

    // 높이 초기화 후 스크롤 높이에 맞게 조정
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  return (
    <div className={styles.chatContainer}>
      <div ref={messagesContainerRef} className={`${styles.messagesContainer} ${styles.hideScrollbar}`}>
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageSpace} ${
              message.sender === "user" ? styles.messageSpaceUser : styles.messageSpaceConstruction
            }`}
          >
            {message.sender === "bot" && (
              <div className={`${styles.avatarContainer} ${styles.avatarContainerLeft}`}>
                <div className={styles.avatarWrapper}>
                  <img src="src/assets/chatbots/chatbot2_up.png" width="50px" alt="건설이" fill className="rounded-full" />
                </div>
              </div>
            )}

            <div
              className={`${styles.messageBubble} ${
                message.sender === "user" ? styles.messageBubbleUser : styles.messageBubbleConstruction
              }`}
            >
              {message.message}
            </div>

            {message.sender === "user" && (
              <div className={`${styles.avatarContainer} ${styles.avatarContainerRight}`}>
                <span className={styles.avatarName}>당신</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
