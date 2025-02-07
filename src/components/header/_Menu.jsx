import styles from './Header.module.scss';

export default function Menu(){
  return(
    <div className={styles.menu}>
      <h1>MENU</h1>
      <ul>
        <li><button>--&gt; PLAY</button></li>
        <li><button>--&gt; APARIENCE</button></li>
        <li><button>--&gt; ABOUT</button></li>
      </ul>
    </div>
  );
}
