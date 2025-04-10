import {useContext} from 'react';
import {GlobalStateContext} from '../components/state/State';
import { Pieces, actions, MenuItems } from '../constant/gameConstant';
import click from '../assets/click.mp3';
import {useSound} from 'use-sound';

export function useMotion(){
  const {state, dispatch} = useContext(GlobalStateContext);
  const {game:{rotation}} = state;
  const [play] = useSound(click);
   
  const executeKeyDown = ()=>{
    if(state?.menu?.isSelectedMenu == 0 && state?.menu?.onSelectSubMenu != -1){
      const isSubMenuLessThanMenuItems = state?.menu?.onSelectSubMenu < MenuItems[state?.menu?.onSelectMenu].subMenu.filter(item => item.type != 'skinP').length - 1;
      const newOnSelectMenu = ( isSubMenuLessThanMenuItems ? state?.menu?.onSelectSubMenu + 1 : -2) 
      const name = 'onSelectSubMenu';
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:name,
	  value:newOnSelectMenu
	}
      });
      if(newOnSelectMenu == -2){
	dispatch({
	  type:actions.OPEN_SUB_MENU,
	  payload:0
	});
      }
    }
  }
  
  const executeKeyLeft = ()=>{
      if(state?.menu?.onSelectSubMenu != -1){
	dispatch({
	  type:actions.OPEN_SUB_MENU,
	  payload:0
	});
      }
      const newOnSelectMenu = (state?.menu?.onSelectMenu == 3 ? 1 : (state?.menu?.onSelectMenu + 1));
      const name = 'onSelectMenu';
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:name,
	  value:newOnSelectMenu
	}
      }); 
  }

  const executeKeyRight = ()=>{
      if(state?.menu?.onSelectSubMenu != -1){
	dispatch({
	  type:actions.OPEN_SUB_MENU,
	  payload:0
	});
      }
      const newOnSelectMenu = (state?.menu?.onSelectMenu == 1 ? 3 : (state?.menu?.onSelectMenu - 1));
      const name = 'onSelectMenu';
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:name,
	  value:newOnSelectMenu
	}
      }); 
  }

  const moveShape = (addX, addY)=>{
    
    if(state?.menu?.isSelectedMenu == 0 && addX == 1){
      play();
      executeKeyRight();
      return;
    }
    if(state?.menu?.isSelectedMenu == 0 && addX == -1){
      play();
      executeKeyLeft();
      return;
    }
    if(state?.menu?.isSelectedMenu == 0 && state?.menu?.onSelectSubMenu != -1 && addY == 1){
      play();
      executeKeyDown();
      return;
    }
    const piece = Pieces[state.game.currentPiece];
    if(state.game.currentX == 0 && addX < 0){
      return;
    }
    const isTheEnd = state.game.currentX + ((rotation == 1 || rotation == 3)?piece.dimensions[0]:piece.dimensions[1]) == state.game.board[0].length;
    if(isTheEnd && addX > 0){
      return;
    }
    let shapeX = rotation === 2 ? piece.dimensions[1]-1:
                 rotation === 3 ? piece.dimensions[0]-1: 0;
    let shapeY = rotation === 2 ? piece.dimensions[0]-1: 
                 rotation === 3 ? piece.dimensions[1]-1: 0;
    let limitX = rotation === 0 ? piece.dimensions[1]:
                 rotation === 1 ? piece.dimensions[0]: 0;
    let limitY = rotation === 0 ? piece.dimensions[0]:
                 rotation === 1 ? piece.dimensions[1]: 0;
    let boardX = state.game.currentX + addX; 
    let boardY = state.game.currentY + addY;
    dispatch({type:actions.SET_POSITION, payload:{x:boardX, y:boardY}});
    let newBoard = state.game.board.map(d=>d.map(value => (value == 2 ? 0 : value))); 
    let value = 0;
    if(rotation >= 2){
      while(shapeY >= limitY){
	while(shapeX >= limitX){
	  value = piece.shape[rotation === 2 ? shapeY:shapeX][rotation === 2 ? shapeX:shapeY];
	  newBoard[boardY][boardX] =(newBoard[boardY][boardX] == 1 && value == 0)? 1: value;
	  shapeX--;
	  boardX++;
	}
	boardY++; 
	boardX = state.game.currentX + addX;
	shapeX = rotation === 2 ? piece.dimensions[1]-1:
                 rotation === 3 ? piece.dimensions[0]-1: 0;
	shapeY--;
      }
    }else{
      while(shapeY < limitY){
	while(shapeX < limitX){
	  value = piece.shape[rotation === 0 ? shapeY:shapeX][rotation === 0 ? shapeX:shapeY];
	  newBoard[boardY][boardX] = (newBoard[boardY][boardX] == 1 && value == 0)? 1: value;
	  shapeX++;
	  boardX++;
	}
	boardY++; 
	boardX = state.game.currentX + addX;
	shapeX = rotation === 2 ? piece.dimensions[1]:
                 rotation === 3 ? piece.dimensions[0]: 0;
	shapeY++;
      }
    }
    dispatch({type:actions.SET_BOARD, payload:newBoard});
  }

  return moveShape;

}

export function useRotation(){
  const [play] = useSound(click);
  const {state, dispatch} = useContext(GlobalStateContext);
  const {game:{rotation}} = state;

  const executeKeyUp = ()=>{
    
      const newOnSelectMenu = (state?.menu?.onSelectSubMenu != 0 ? state?.menu?.onSelectSubMenu - 1 : -2); 
      const name = 'onSelectSubMenu';
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:name,
	  value: newOnSelectMenu
	}
      });
      if(newOnSelectMenu == -2){
	dispatch({
	  type:actions.OPEN_SUB_MENU,
	  payload:0
	});
      }
    
  }

  const rotatePiece = ()=>{  
    
    if(state?.menu?.isSelectedMenu == 0 && state?.menu?.onSelectSubMenu != -1){
      play();
      executeKeyUp();
      return;
    }
    if(state?.menu?.isSelectedMenu == 0){
      return;
    }
    let newRotation = rotation === 3 ? 0 : rotation + 1; 
    const newShapeDimension = state.game.currentX + Pieces[state.game.currentPiece].dimensions[(newRotation == 1 || newRotation == 3)? 0:1]
    if(newShapeDimension > state.game.board[0].length){
      return;
    }
    dispatch({type:actions.SET_ROTATION, payload:newRotation});
  }

  return rotatePiece;
}

export function useKey(){
  const [play] = useSound(click);
  const {state, dispatch} = useContext(GlobalStateContext);

  const executeKey_a = ()=>{
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

  const executeKey_b = ()=>{
    if(state?.menu?.isSelectedMenu != 0){
      dispatch({
	type:actions.SET_MENU_OPTIONS,
	payload:{
	  name:'isSelectedMenu',
	  value:0
	}
      });
    }

  }
  const handleKey = (key)=>{
    play();
    console.log(key)
    switch(key){
      case 'a':
	executeKey_a();
      break;
      case 'b':
	executeKey_b();
      break;
    }
  }

  return handleKey;
}
