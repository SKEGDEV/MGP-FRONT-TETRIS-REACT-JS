import styles from './Header.module.scss';

export default function About(){

  return(
    <div className={styles.about_container}>
      <div>
        <h1>Tetris</h1>
      </div>
      <div>
        <p>{`Hello!, I'm Edu full stack developer with 3 years of experience if you like my job and want know more about me, this is my github: `}
        <a href='https://github.com/SKEGDEV'>Github</a></p> 
      </div>
      <div className={styles.footer_about}>
        <p>Press <b>B</b> to back home</p>
      </div>
    </div>
  )
}
