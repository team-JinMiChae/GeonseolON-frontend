import { useRef, useEffect } from 'react';
import styles from "./Input.module.css"
import SendIcon from "../../../assets/icons/common/send.svg"

export default function Input({ inputValue, setInputValue, handleSubmit, canAsk, isLimited }) {
    const placeholder = isLimited ? "사용한도에 도달했습니다" : canAsk ? "궁금한 내용을 질문해보세요!" : "잠시만 기다려주세요..."
    const textareaRef = useRef(null);
    const maxLength = 1000;

    // 입력될 때마다 높이 자동 조정
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 일단 줄이고
      textarea.style.height = textarea.scrollHeight + 'px'; // 실제 높이로 확장
    }
  };

  useEffect(() => {
    resizeTextarea(); // 초기 렌더링 시에도 높이 조정
  }, [inputValue]);

  return (
    <div className={styles.inputWrapper}>
        <textarea
            type="text"
            ref={textareaRef}
            value={inputValue}
            disabled={!canAsk}
            maxLength={maxLength}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className={styles.input}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && canAsk) {
                    e.preventDefault();
                    handleSubmit();
                }
            }}
        />
    <button
        type="button"
        className={styles.submitButton}
        disabled={!canAsk}
        onClick={handleSubmit}
    >
        <img src={SendIcon} />
    </button>
</div>

    
  )
}
