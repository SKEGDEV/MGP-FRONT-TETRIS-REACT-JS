import styles from './base.module.scss';
import HeaderGameBoy from '../header/Header';
import MidContent from '../midContent/MidContent';
import Footer from '../footer/Footer';

export default function BaseGame (){

  return(
    <div className={`${styles.game_boy_container} ${styles.default}`}>
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
