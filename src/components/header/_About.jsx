import styles from './Header.module.scss';

export default function About(){

  return(
    <div className={styles.about_container}>
      <div>
        <h1>Tetris</h1>
      </div>
      <div>
        <p>{`Hello!, this is an application created for my web portfolio using React JS <VITE> all states are managed for useReducer,
	  if you like my job and if you want to know about me this is my `}
        <a target='_blank' href='https://github.com/SKEGDEV'>Github</a></p> 
      </div>
      <div className={styles.footer_about}>
        <p>Press <b>B</b> to back home</p>
      </div>
    </div>
  )
}
