import styles from './Header.module.scss';
import {MenuItems} from '../../constant/gameConstant';
import { useState, useContext } from 'react';
import { GlobalStateContext } from '../state/State';

export default function Menu(){
  const {state, dispatch} = useContext(GlobalStateContext);

  
  return(
    <div className={styles.menu}>
      <h1>MENU</h1>
      <ul>
        {MenuItems.map((item, index)=>(
	  item.name !== 'home'?
	  <li key={index}>
	    <button style={{fontSize:`${(state?.menu?.onSelectMenu == index && state?.menu?.onSelectSubMenu == -1)  ? '1.5vh' : '1vh'}`}}>-&gt; {` ${item.name}`}</button>
	    <ul className={styles.sub_menu} style={{height:`${(state?.menu?.subMenu?.open && state?.menu?.subMenu?.index == index) ? 'auto': 0}`}}>
	      {item.subMenu.map((subItem, index)=>(
	      subItem.type !== 'skinP'?
	      <li key={index}><button style={{fontSize:`${state?.menu?.onSelectSubMenu == index ? '1.8vh' : '1vh'}`}}>--&gt; {` ${subItem.name}`}</button></li>:<></>
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
