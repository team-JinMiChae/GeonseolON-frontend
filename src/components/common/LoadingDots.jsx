import styles from './LoadingDots.module.css';

export default function LoadingDots() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}
