import styles from './Header.module.scss';
import {MenuItems} from '../../constant/gameConstant';
import { useContext } from 'react';
import { GlobalStateContext } from '../state/State';

export default function Menu(){
  const {state, dispatch} = useContext(GlobalStateContext);

  return(
    <div className={styles.menu}>
      <h1>MENU</h1>
      <ul className={styles.menu_ul} style={{
	           width:`${100*(MenuItems.length - 1)}%`,
	           transform: `translateX(${MenuItems[state?.menu?.onSelectMenu].translateX})`
                 }}>
        {MenuItems.map((item, index)=>(
	  item.name !== 'home'?
	  <li key={index} className={`${state?.menu?.onSelectMenu == index ? styles.selected : ''}`}
	      style={{width:'100%'}}>
	    <button>{` ${item.name.toUpperCase()}`}</button>
	    <ul className={styles.sub_menu} style={{height:`${(state?.menu?.subMenu?.open && state?.menu?.subMenu?.index == index) ? '7vh': '0vh'}`}}>
	      {item.subMenu.map((subItem, index)=>(
	      subItem.type !== 'skinP'?
	      <li key={index} 
		  style={{transform: `translateY(${MenuItems[state?.menu?.onSelectMenu]?.subMenu[state?.menu?.onSelectSubMenu]?.translateY})`}}>
		  <button> {` ${subItem.name}`}</button></li>:<></>
	      ))
	      }
	    </ul>
	  </li>:<></>
	))
	}
      </ul>
    </div>
  );
}
