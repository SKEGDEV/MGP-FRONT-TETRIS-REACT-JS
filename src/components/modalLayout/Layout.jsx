import styles from './Layout.module.scss';
import logo from '../../assets/logo.png';
import Button from '../button/Button';
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const LayoutModal = ({btnTittle, btnOnClick, variant, children})=>{
  return(
    <div className={styles.layout}>
     <img
      src={logo}
      alt="not found"
      className={styles.logotype}
      />
     <div className={styles.content}>
      {children}
     </div>
     {variant === 'operation'? 
       <Button variant='success' onClick={btnOnClick}><IoCheckmarkDoneCircle/>{btnTittle}</Button>
       :
       <></>

     }
    </div>
  );
}

export default LayoutModal;

