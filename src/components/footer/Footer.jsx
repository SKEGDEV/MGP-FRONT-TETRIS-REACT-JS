import styles from './Footer.module.scss';

export default function Footer(){

  return(
    <div className={styles.btnFooterContainer}>
      <div className={styles.btnFooterForm}>
        <button></button>
        <span>select</span>
      </div>
      <div className={`${styles.btnFooterForm} ${styles.marginLeft}`}>
        <button></button>
        <span>start</span>
      </div>
    </div>
  );
}
