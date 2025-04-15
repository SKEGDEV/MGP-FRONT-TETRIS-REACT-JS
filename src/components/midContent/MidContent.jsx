import styles from './midContent.module.scss';
import {useMotion, useRotation, useKey} from '../../hooks/useMotion';
import { MenuItems } from '../../constant/gameConstant';
import { useContext } from 'react';
import {GlobalStateContext} from '../state/State';



export default function MidContent(){
  const motion = useMotion();
  const rotation = useRotation();
  const pressKey = useKey();
  const {state, dispatch} = useContext(GlobalStateContext); 
  const skin = MenuItems[2]?.subMenu;

  const handleArrowUp = ()=>{
    rotation();
  }

  const handleArrowDown = ()=>{
    motion(0,1);
  }

  const handleArrowLeft = ()=>{
    motion(-1,0);
  }

  const handleArrowRight = ()=>{
    motion(1,0);
  }

  const handleButtonA = ()=>{
    pressKey('a');
  }

  const handleButtonB = ()=>{
    pressKey('b');
  }
 
  return(
      <div className={`${styles.btnGameContainer} ${skin[state?.skin]?.classMidContent}`}>
        <div className={styles.btnCrossContainer}>
          <button name='ArrowUp' onClick={handleArrowUp}></button>
          <div className={styles.btnCrossVertical}>
            <button name='ArrowLeft' onClick={handleArrowLeft}></button>
            <button name='ArrowRight' onClick={handleArrowRight}></button>
          </div>
          <button name='ArrowDown' onClick={handleArrowDown}></button>
        </div>
        <div className={styles.btnAbContainer}>
          <div className={styles.btnAbButton}>
            <button name='b' onClick={handleButtonB}></button>
            <button name='a' onClick={handleButtonA}></button>
          </div>
          <div className={styles.btnAbLabel}>
            <span><b>B</b></span>
            <span><b>A</b></span>
          </div>
        </div>
      </div>
  );
}
