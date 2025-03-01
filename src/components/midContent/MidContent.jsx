import styles from './midContent.module.scss';
import {useMotion, useRotation} from '../../hooks/useMotion';
import {useContext} from 'react';
import {GlobalStateContext} from '../state/State';
import { actions, MenuItems } from '../../constant/gameConstant';



export default function MidContent(){
  const motion = useMotion();
  const rotation = useRotation();
  const {state, dispatch} = useContext(GlobalStateContext);

  const handleArrowUp = ()=>{
    if(state?.menu?.isSelectedMenu == 0){
      const newOnSelectMenu = state?.menu?.onSelectSubMenu != -1?
	(state?.menu?.onSelectSubMenu < MenuItems[state?.menu?.onSelectMenu].subMenu.length ? state?.menu?.onSelectSubMenu - 1 : -2)
	:(state?.menu?.onSelectMenu == 1 ? 3 : (state?.menu?.onSelectMenu - 1));
      const name = (state?.menu?.onSelectSubMenu != -1 && newOnSelectMenu != -1) ? 'onSelectSubMenu' : 'onSelectMenu';
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:name,
	  value:newOnSelectMenu == -1 ? state?.menu?.onSelectMenu: newOnSelectMenu
	}
      });
      if(newOnSelectMenu == -1){
	dispatch({
	  type:actions.OPEN_SUB_MENU,
	  payload:0
	});
      }
      return;
    }
    rotation();
  }

  const handleArrowDown = ()=>{
    if(state?.menu?.isSelectedMenu == 0){
      const isSubMenuLessThanMenuItems = state?.menu?.onSelectSubMenu < MenuItems[state?.menu?.onSelectMenu].subMenu.filter(item => item.type != 'skinP').length - 1;
      const newOnSelectMenu = state?.menu?.onSelectSubMenu != -1?
	( isSubMenuLessThanMenuItems ? state?.menu?.onSelectSubMenu + 1 : -2)
	:(state?.menu?.onSelectMenu == 3 ? 1 : (state?.menu?.onSelectMenu + 1));
      const name = (state?.menu?.onSelectSubMenu != -1 && isSubMenuLessThanMenuItems) ? 'onSelectSubMenu' : 'onSelectMenu';
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:name,
	  value:newOnSelectMenu == -2 ? (state?.menu?.onSelectMenu == 3 ? 1 : (state?.menu?.onSelectMenu + 1)) : newOnSelectMenu
	}
      });
      if(newOnSelectMenu == -2){
	dispatch({
	  type:actions.OPEN_SUB_MENU,
	  payload:0
	});
      }
      return;
    }
    motion(0,1);
  }

  const handleArrowLeft = ()=>{
    motion(-1,0);
  }

  const handleArrowRight = ()=>{
    motion(1,0);
  }

  const handleButtonA = ()=>{
    const selectedItem = state?.menu?.onSelectSubMenu == -1 ? MenuItems[state?.menu?.onSelectMenu] : MenuItems[state?.menu?.onSelectMenu].subMenu[state?.menu?.onSelectSubMenu];  
    if(selectedItem.type === 'submenu'){
      dispatch({
	type:actions.OPEN_SUB_MENU,
	payload:state?.menu?.onSelectMenu 
      });
    }
    if(selectedItem.type === 'skin'){
      dispatch({
	type:actions.SET_SKIN,
	payload:state?.menu?.onSelectSubMenu
      });
    }
    if(selectedItem.type === 'screen'){
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:'isSelectedMenu',
	  value:state?.menu?.onSelectMenu
	}
      });
    }
  }

  const handleButtonB = ()=>{

  }
 
  return(
      <div className={styles.btnGameContainer}>
        <div className={styles.btnCrossContainer}>
          <button name='ArrowUp' onClick={handleArrowUp}></button>
          <div className={styles.btnCrossVertical}>
            <button name='ArrowLeft' onClick={handleArrowLeft}></button>
            <button name='ArrowRight' onClick={handleArrowRight}></button>
          </div>
          <button name='ArrowDown' onClick={handleArrowDown}></button>
        </div>
        <div className={styles.btnAbContainer}>
          <div className={styles.btnAbButton}>
            <button name='b' onClick={handleButtonB}></button>
            <button name='a' onClick={handleButtonA}></button>
          </div>
          <div className={styles.btnAbLabel}>
            <span><b>B</b></span>
            <span><b>A</b></span>
          </div>
        </div>
      </div>
  );
}
