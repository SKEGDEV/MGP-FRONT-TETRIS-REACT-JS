import styles from './Header.module.scss';
import Board from './_Board';
import Menu from './_Menu';
import About from './_About';
import {useContext, useEffect} from 'react';
import {GlobalStateContext} from '../state/State';
import soundtrack from '../../assets/soundtrack.mp3';
import {useSound} from 'use-sound';
import { MenuItems } from '../../constant/gameConstant';

export default function HeaderGameBoy(){
  const {state, dispatch} = useContext(GlobalStateContext);
  const [play, {stop}] = useSound(soundtrack, {loop: true, volume: 0.5});

  useEffect(()=>{
    if(state?.menu?.isSelectedMenu == 0){
      stop();
    }
    if(state?.menu?.isSelectedMenu == 1){
      play();
    }
  },[state?.menu?.isSelectedMenu]);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.headerGameBoy}>
        <div className={styles.headerVerticalContainer}>
          <div className={styles.headerVerticalLeft}></div>
          <div className={styles.headerVerticalRight}></div>
        </div>
        <div className={styles.headerHorizontalLine}></div>
      </div>
      <div className={styles.screenGameBoy}>
        <div className={styles.screenBorder}>
          <div className={styles.screenHeader}>
            <div className={styles.left}>
              <div className={styles.redLine} />
              <div className={styles.blueLine} />
            </div>
            <p>DOT MATRIX WITH STEREO SOUND</p>
            <div className={styles.right}>
              <div className={styles.redLine} />
              <div className={styles.blueLine} />
            </div>
          </div>
          <div className={styles.screenContainer}>
            <div className={styles.batery}>
              <div />
              <p>BATERY</p>
            </div>
            <div className={styles.screen}>
            {state?.menu?.isSelectedMenu == 0 ? <Menu/>:
	     state?.menu?.isSelectedMenu == 1 ? <Board/>: <About/>}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.titleNintendo}>
        <h1 style={{color:`${MenuItems[2]?.subMenu[state?.skin]?.colorHeaderNintendo}`}}>Nintendo GAME BOY</h1>
      </div>
    </div>
  );
}
