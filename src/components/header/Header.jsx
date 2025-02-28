import styles from './Header.module.scss';
import Board from './_Board';
import Menu from './_Menu';

export default function HeaderGameBoy(){

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
              <Menu/>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.titleNintendo}>
        <h1>Nintendo GAME BOY</h1>
      </div>
    </div>
  );
}
