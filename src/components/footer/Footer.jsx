import styles from './Footer.module.scss';
import { MenuItems } from '../../constant/gameConstant';
import {useContext} from 'react';
import {GlobalStateContext} from '../state/State';

export default function Footer(){
const {state, dispatch} = useContext(GlobalStateContext);

  return(
    <div className={`${styles.btnFooterContainer} ${MenuItems[2]?.subMenu[state?.skin]?.classFooter}`}>
      <div className={styles.btnFooterForm}>
        <button></button>
        <span>select</span>
      </div>
      <div className={`${styles.btnFooterForm} ${styles.marginLeft}`}>
        <button></button>
        <span>start</span>
      </div>
    </div>
  );
}
