import styles from './base.module.scss';
import HeaderGameBoy from '../header/Header';
import MidContent from '../midContent/MidContent';
import Footer from '../footer/Footer';
import { MenuItems } from '../../constant/gameConstant';
import {useContext} from 'react';
import {GlobalStateContext} from '../state/State';

export default function BaseGame (){
  const {state, dispatch} = useContext(GlobalStateContext);
  const skin = MenuItems[2]?.subMenu;
   
  return(
    <div className={`${styles.game_boy_container} ${MenuItems[2].subMenu[state?.skin].className}`}>
      <header>
        <HeaderGameBoy/>
      </header>
      <main>
        <MidContent/>
      </main>
      <footer>
        <Footer/>
      </footer>
      <div className={styles.speaker_container}>
        <div style={{backgroundColor:`${skin[state?.skin]?.colorA}`}} className={styles.line}></div>
        <div style={{backgroundColor:`${skin[state?.skin]?.colorB}`}} className={styles.line}></div>
        <div style={{backgroundColor:`${skin[state?.skin]?.colorA}`}} className={styles.line}></div>
        <div style={{backgroundColor:`${skin[state?.skin]?.colorB}`}} className={styles.line}></div>
        <div style={{backgroundColor:`${skin[state?.skin]?.colorA}`}} className={styles.line}></div>
        <div style={{backgroundColor:`${skin[state?.skin]?.colorB}`}} className={styles.line}></div>
      </div>
    </div>
  );
}
