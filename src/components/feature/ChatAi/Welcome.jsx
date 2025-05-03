import styles from "./Welcome.module.css"

export default function Welcome() {
  return (
    <div className={styles.headerContainer}>
      {/* Robot character */}
      <div className={styles.robotContainer}>
        <img src="src/assets/chatbots/chatbot2_up.png" alt="건설이 로봇" className={styles.robotImage} />
      </div>

      {/* Speech bubble */}
      <div className={styles.speechBubble}>
        <p className={styles.paragraph}>안녕하세요! 건설이에요.</p>
        <p className={styles.paragraph}>무엇이 궁금하신가요?</p>
        <p className={styles.paragraph}>무엇이든지 물어보세요:) 건설이가 알려드려요.</p>
      </div>
    </div>
  )
}
