import styles from './Layout.module.scss';


const LayoutModal = ({children})=>{
  return(
    <div className={styles.layout}>
     <img
      src="https://lh3.google.com/u/1/d/1bgdCDpq5WK6FMxURIM3FSLq2ESIdciGB=w1366-h647-iv1"
      alt="not found"
      className={styles.logotype}
      />
     {children}
    </div>
  );
}

export default LayoutModal;

