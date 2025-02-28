import styles from './base.module.scss';
import HeaderGameBoy from '../header/Header';
import MidContent from '../midContent/MidContent';
import Footer from '../footer/Footer';
import { MenuItems } from '../../constant/gameConstant';
import {useContext} from 'react';
import {GlobalStateContext} from '../state/State';

export default function BaseGame (){
const {state, dispatch} = useContext(GlobalStateContext);

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
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}
