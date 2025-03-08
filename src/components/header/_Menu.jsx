import styles from './Header.module.scss';
import {MenuItems} from '../../constant/gameConstant';
import { useEffect, useContext, useRef, useState } from 'react';
import { GlobalStateContext } from '../state/State';
import { introAnimation, outroAnimation } from '../../constant/animateConstant';

export default function Menu(){
  const {state, dispatch} = useContext(GlobalStateContext);
  const [lastOnSelectSubMenu, setLastOnSelectSubMenu] = useState(-1);
  const [animationSubMenu, setAnimationSubMenu] = useState('');

  useEffect(()=>{ 
    setLastOnSelectSubMenu(state?.menu?.onSelectSubMenu);
    if(	state?.menu?.onSelectSubMenu != -1){
      setAnimationSubMenu(introAnimation.fadeInTopRight);
    }
    else{
      setAnimationSubMenu('');
    }
  },[state?.menu?.onSelectSubMenu]);

  return(
    <div className={styles.menu}>
      <h1>MENU</h1>
      <ul>
        {MenuItems.map((item, index)=>(
	  item.name !== 'home'?
	  <li key={index}>
	    <button style={{fontSize:`${(state?.menu?.onSelectMenu == index && state?.menu?.onSelectSubMenu == -1)  ? '1.5vh' : '1vh'}`}}>-&gt; {` ${item.name}`}</button>
	    <ul className={`${styles.sub_menu} ${animationSubMenu}`} style={{height:`${(state?.menu?.subMenu?.open && state?.menu?.subMenu?.index == index) ? 'auto': 0}`}}>
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
