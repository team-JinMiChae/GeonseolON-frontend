"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./Chattings.module.css"

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
        {log.map((message) => (
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
