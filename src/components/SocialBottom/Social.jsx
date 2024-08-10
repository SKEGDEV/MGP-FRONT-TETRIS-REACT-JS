import styles from './Social.module.scss';
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { ImYoutube } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";

const Social = ()=>{

  return(
    <div className={styles.social_container}>
      <a className={styles.linkedin} href="https://www.linkedin.com/in/eduardo-gonzalez-910793212" target='_blank'><BsLinkedin/></a>
      <a className={styles.github} href="https://github.com/SKEGDEV" target='_blank'><BsGithub/></a>
      <a className={styles.youtube} href="https://youtube.com/@skeg3351?si=K3iAVViLb_eZ3kVp" target='_blank'><ImYoutube/></a>
      <a className={styles.whatsapp} href="https://wa.me/+50236123568" target='_blank'><IoLogoWhatsapp/></a>
    </div>
  );
}

export default Social;
