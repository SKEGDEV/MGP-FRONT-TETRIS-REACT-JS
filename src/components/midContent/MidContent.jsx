import styles from './midContent.module.scss';
import {useMotion, useRotation} from '../../hooks/useMotion';
import {useContext} from 'react';
import {GlobalStateContext} from '../state/State';
import { actions, MenuItems } from '../../constant/gameConstant';



export default function MidContent(){
  const motion = useMotion();
  const rotation = useRotation();
  const {state, dispatch} = useContext(GlobalStateContext);

  const handleButton = (e)=>{
    switch(e.target.name){
      case 'ArrowLeft':
	motion(-1,0);
      break;
      case 'ArrowRight':
	motion(1,0);
      break;
      case 'ArrowUp':
	if(state?.menu?.isSelectedMenu == 0){
	  const newOnSelectMenu = state?.menu?.onSelectMenu == 1 ? 3 : (state?.menu?.onSelectMenu - 1);
	  dispatch({
	    type:actions.SET_MENU_OPTIONS,
	    payload:{
	      name:'onSelectMenu',
	      value:newOnSelectMenu
	    }
	  });
	  return;
	}
	rotation();
      break;
      case 'ArrowDown':
	if(state?.menu?.isSelectedMenu == 0){
	  const newOnSelectMenu = state?.menu?.onSelectMenu == 3 ? 1 : (state?.menu?.onSelectMenu + 1);
	  dispatch({
	    type:actions.SET_MENU_OPTIONS,
	    payload:{
	      name:'onSelectMenu',
	      value:newOnSelectMenu
	    }
	  });
	  return;
	}
	motion(0,1);
      break;
      case 'a':
	const selectedItem = state?.menu?.onSelectSubMenu == -1 ? MenuItems[state?.menu?.onSelectMenu] : MenuItems[state?.menu?.onSelectMenu].subMenu[state?.menu?.onSelectSubMenu];  
	if(selectedItem.type === 'submenu'){
	  dispatch({
	    type:actions.OPEN_SUB_MENU,
	    payload:state?.menu?.onSelectMenu
	  });
	}
      break;
      case 'b':

      break;
    }
  }

  return(
      <div className={styles.btnGameContainer}>
        <div className={styles.btnCrossContainer}>
          <button name='ArrowUp' onClick={handleButton}></button>
          <div className={styles.btnCrossVertical}>
            <button name='ArrowLeft' onClick={handleButton}></button>
            <button name='ArrowRight' onClick={handleButton}></button>
          </div>
          <button name='ArrowDown' onClick={handleButton}></button>
        </div>
        <div className={styles.btnAbContainer}>
          <div className={styles.btnAbButton}>
            <button name='b' onClick={handleButton}></button>
            <button name='a' onClick={handleButton}></button>
          </div>
          <div className={styles.btnAbLabel}>
            <span><b>B</b></span>
            <span><b>A</b></span>
          </div>
        </div>
      </div>
  );
}
