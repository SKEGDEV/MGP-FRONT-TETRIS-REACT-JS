import styles from './midContent.module.scss';
import {useMotion, useRotation} from '../../hooks/useMotion';


export default function MidContent(){
  const motion = useMotion();
  const rotation = useRotation();

  return(
      <div className={styles.btnGameContainer}>
        <div className={styles.btnCrossContainer}>
          <button onClick={()=>{rotation();}}></button>
          <div className={styles.btnCrossVertical}>
            <button onClick={()=>{motion(-1,0);}}></button>
            <button onClick={()=>{motion(1,0);}}></button>
          </div>
          <button onClick={()=>{motion(0,1);}}></button>
        </div>
        <div className={styles.btnAbContainer}>
          <div className={styles.btnAbButton}>
            <button></button>
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
