import styles from './midContent.module.scss';

export default function MidContent(){
  return(
      <div className={styles.btnGameContainer}>
        <div className={styles.btnCrossContainer}>
          <button id="arrowUp"></button>
          <div className={styles.btnCrossVertical}>
            <button id="arrowLeft"></button>
            <button id="arrowRight"></button>
          </div>
          <button id="arrowDown"></button>
        </div>
        <div className={styles.btnAbContainer}>
          <div className={styles.btnAbButton}>
            <button id="btn-b"></button>
            <button></button>
          </div>
          <div className={styles.btnAbLabel}>
            <span><b>B</b></span>
            <span><b>A</b></span>
          </div>
        </div>
      </div>
  );
}
